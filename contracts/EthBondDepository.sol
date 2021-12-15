pragma solidity 0.7.5;

// import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./libraries/FixedPoint.sol";
import "./interfaces/IPancakeRouter02.sol";
import "./libraries/SafeMath32.sol";

interface AggregatorV3Interface {
    function latestRoundData() external view returns (uint256 answer);
}

interface ITreasury {
    function deposit(
        uint256 _amount,
        address _token,
        uint256 _profit
    ) external returns (bool);

    function valueOf(address _token, uint256 _amount) external view returns (uint256 value_);

    function mintRewards(address _recipient, uint256 _amount) external;
}

interface IStaking {
    function stake(uint256 _amount, address _recipient) external returns (bool);
}

interface IStakingHelper {
    function stake(uint256 _amount, address _recipient) external;
}

interface IWETH9 is IERC20 {
    /// @notice Deposit ether to get wrapped ether
    function deposit() external payable;
}

contract TimeBondDepository is Initializable, OwnableUpgradeable {
    using FixedPoint for *;
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    using SafeMath32 for uint32;

    /* ======== EVENTS ======== */

    event BondCreated(uint256 deposit, uint256 indexed payout, uint256 indexed expires, uint256 indexed priceInUSD);
    event BondRedeemed(address indexed recipient, uint256 payout, uint256 remaining);
    event BondPriceChanged(uint256 indexed priceInUSD, uint256 indexed internalPrice, uint256 indexed debtRatio);

    /* ======== STATE VARIABLES ======== */
    address public xBlade; // token given as payment for bond
    address public principle; // token used to create bond
    address public treasury; // mints xBlade when receives principle
    address public DAO; // receives profit share from bond

    AggregatorV3Interface internal priceFeed;

    Terms public terms; // stores terms for new bonds

    mapping(address => Bond) public bondInfo; // stores bond information for depositors

    uint256 public totalDebt; // total value of outstanding bonds; used for pricing
    uint32 public lastDecay; // reference block for debt decay

    IPancakeRouter02 public pancakeRouter;

    uint256 public lastBuyBack;
    /* ======== STRUCTS ======== */

    // Info for creating new bonds
    struct Terms {
        uint256 minimumPrice; // vs principle value. 4 decimals (1500 = 0.15)
        uint256 maxPayout; // in thousandths of a %. i.e. 500 = 0.5%
        uint256 maxDebt; // 9 decimal debt ratio, max % total supply created as debt
        uint32 vestingTerm; // in seconds
        uint256 discountRate; // in percent
    }

    // Info for bond holder
    struct Bond {
        uint256 payout; // xBlade remaining to be paid
        uint256 pricePaid; // In DAI, for front end viewing
        uint32 vesting; // Seconds left to vest
        uint32 lastTime; // Last interaction
    }

    /* ======== INITIALIZATION ======== */

    function initialize(
        address _xBlade,
        address _principle,
        // address _treasury,
        address _DAO,
        address _feed,
        address _router
    ) public initializer {
        OwnableUpgradeable.__Ownable_init();
        require(_xBlade != address(0));
        xBlade = _xBlade;
        require(_principle != address(0));
        principle = _principle;
        // require(_treasury != address(0));
        // treasury = _treasury;
        require(_DAO != address(0));
        DAO = _DAO;
        require(_feed != address(0));
        priceFeed = AggregatorV3Interface(_feed);
        pancakeRouter = IPancakeRouter02(_router);
    }

    /**
     *  @notice initializes bond parameters
     *  @param _vestingTerm uint
     *  @param _minimumPrice uint
     *  @param _maxPayout uint
     *  @param _maxDebt uint
     *  @param _initialDebt uint
     *  @param _discountRate uint
     */
    function initializeBondTerms(
        uint256 _minimumPrice,
        uint256 _maxPayout,
        uint256 _maxDebt,
        uint256 _initialDebt,
        uint32 _vestingTerm,
        uint256 _discountRate
    ) external onlyOwner {
        require(currentDebt() == 0, "Debt must be 0 for initialization");
        terms = Terms({ vestingTerm: _vestingTerm, minimumPrice: _minimumPrice, maxPayout: _maxPayout, maxDebt: _maxDebt, discountRate: _discountRate });
        totalDebt = _initialDebt;
        lastDecay = uint32(block.timestamp);
    }

    /* ======== POLICY FUNCTIONS ======== */

    enum PARAMETER {
        VESTING,
        PAYOUT,
        DEBT,
        MINPRICE,
        DISCOUNT
    }

    /**
     *  @notice set parameters for new bonds
     *  @param _parameter PARAMETER
     *  @param _input uint
     */
    function setBondTerms(PARAMETER _parameter, uint256 _input) external onlyOwner {
        if (_parameter == PARAMETER.VESTING) {
            // 0
            require(_input >= 129600, "Vesting must be longer than 36 hours");
            terms.vestingTerm = uint32(_input);
        } else if (_parameter == PARAMETER.PAYOUT) {
            // 1
            require(_input <= 1000, "Payout cannot be above 1 percent");
            terms.maxPayout = _input;
        } else if (_parameter == PARAMETER.DEBT) {
            // 2
            terms.maxDebt = _input;
        } else if (_parameter == PARAMETER.MINPRICE) {
            // 3
            terms.minimumPrice = _input;
        } else if (_parameter == PARAMETER.DISCOUNT) {
            // 4
            require(_input < 300, "Discount sale cannot greater than 30%");
            terms.discountRate = _input;
        }
    }

    /* ======== USER FUNCTIONS ======== */

    /**
     *  @notice deposit bond
     *  @param _amount uint
     *  @param _maxPrice uint
     *  @param _depositor address
     *  @return uint
     */
    function deposit(
        uint256 _amount,
        uint256 _maxPrice,
        address _depositor
    ) external returns (uint256) {
        require(_depositor != address(0), "Invalid address");

        decayDebt();
        require(totalDebt <= terms.maxDebt, "Max capacity reached");

        uint256 priceInUSD = bondPriceInUSD(); // Stored in bond info
        uint256 nativePrice = _bondPrice();

        require(_maxPrice >= nativePrice, "Slippage limit: more than max price"); // slippage protection

        uint256 value = _amount;
        uint256 payout = payoutFor(value); // payout to bonder is computed

        require(payout >= 10000000, "Bond too small"); // must be > 0.01 xBlade ( underflow protection )
        require(payout <= maxPayout(), "Bond too large"); // size protection because there is no slippage
        /**
            asset carries risk and is not minted against
            asset transfered to treasury and rewards minted as payout
         */
        // if (address(this).balance >= _amount) {
        //     // pay with WETH9
        //     IWETH9(principle).deposit{value: _amount}(); // wrap only what is needed to pay
        //     IWETH9(principle).transfer(treasury, _amount);
        // } else {
        IERC20(principle).safeTransferFrom(msg.sender, address(this), _amount);
        liquidify(_amount.div(2));
        buyBack(_amount.div(2));
        // }

        /** FIXME: Due to customize this contract to sell xBlade,
            so comment out this line to prevent minting token
            In future, this line will be removed after successfully testing

            ITreasury(treasury).mintRewards(address(this), payout);
        */

        // total debt is increased
        totalDebt = totalDebt.add(value);

        // depositor info is stored
        bondInfo[_depositor] = Bond({ payout: bondInfo[_depositor].payout.add(payout), vesting: terms.vestingTerm, lastTime: uint32(block.timestamp), pricePaid: priceInUSD });

        // indexed events are emitted
        emit BondCreated(_amount, payout, block.timestamp.add(terms.vestingTerm), priceInUSD);
        emit BondPriceChanged(bondPriceInUSD(), _bondPrice(), debtRatio());
        refundETH(); //refund user if needed
        return payout;
    }

    /**
     *  @notice redeem bond for user
     *  @param _recipient address
     *  @param _stake bool
     *  @return uint
     */
    function redeem(address _recipient, bool _stake) external returns (uint256) {
        Bond memory info = bondInfo[_recipient];
        uint256 percentVested = percentVestedFor(_recipient); // (blocks since last interaction / vesting term remaining)

        if (percentVested >= 10000) {
            // if fully vested
            delete bondInfo[_recipient]; // delete user info
            emit BondRedeemed(_recipient, info.payout, 0); // emit bond data
            return stakeOrSend(_recipient, info.payout); // pay user everything due
        } else {
            // if unfinished
            // calculate payout vested
            uint256 payout = info.payout.mul(percentVested).div(10000);

            // store updated deposit info
            bondInfo[_recipient] = Bond({
                payout: info.payout.sub(payout),
                vesting: info.vesting.sub32(uint32(block.timestamp).sub32(info.lastTime)),
                lastTime: uint32(block.timestamp),
                pricePaid: info.pricePaid
            });

            emit BondRedeemed(_recipient, payout, bondInfo[_recipient].payout);
            return stakeOrSend(_recipient, payout);
        }
    }

    /* ======== INTERNAL HELPER FUNCTIONS ======== */

    /**
     *  @notice allow user to stake payout automatically
     *  @param _amount uint
     *  @return uint
     */
    function stakeOrSend(address _recipient, uint256 _amount) internal returns (uint256) {
        IERC20(xBlade).transfer(_recipient, _amount); // send payout
        return _amount;
    }

    /**
     *  @notice reduce total debt
     */
    function decayDebt() internal {
        totalDebt = totalDebt.sub(debtDecay());
        lastDecay = uint32(block.timestamp);
    }

    function swap(uint256 _value, address to) internal {
        // generate the pancake pair path of principle -> xblade
        address[] memory path = new address[](2);
        path[0] = principle;
        path[1] = xBlade;
        pancakeRouter.swapExactTokensForTokensSupportingFeeOnTransferTokens(_value, 0, path, to, block.timestamp + 360);
    }

    /**
     * @notice increase liquidity
     */
    function liquidify(uint256 _value) internal {
        if (_value > 0) {
            if (IERC20(xBlade).allowance(address(this), address(pancakeRouter)) == 0) {
                IERC20(xBlade).approve(address(pancakeRouter), ~uint256(0));
            }

            if (IERC20(principle).allowance(address(this), address(pancakeRouter)) == 0) {
                IERC20(principle).approve(address(pancakeRouter), ~uint256(0));
            }

            uint256 oldBalance = IERC20(xBlade).balanceOf(address(this));
            swap(_value.div(2), address(this));
            uint256 newBalance = IERC20(xBlade).balanceOf(address(this));

            pancakeRouter.addLiquidity(xBlade, principle, newBalance.sub(oldBalance), _value.div(2), 0, 0, treasury, block.timestamp + 360);
        }
    }

    /**
     * @notice buy back to treasury
     */
    function buyBack(uint256 _value) internal {
        // buy back every 8 hours
        if (block.timestamp.sub(lastBuyBack) > 28800) {
            lastBuyBack = block.timestamp;
            swap(_value, treasury);
        }
    }

    function setTreasury(address _treasury) public onlyOwner {
        treasury = _treasury;
    }

    /* ======== VIEW FUNCTIONS ======== */

    /**
     *  @notice determine maximum bond size
     *  @return uint
     */
    function maxPayout() public view returns (uint256) {
        return IERC20(xBlade).totalSupply().mul(terms.maxPayout).div(100000);
    }

    /**
     *  @notice calculate interest due for new bond
     *  @param _value uint
     *  @return uint
     */
    function payoutFor(uint256 _value) public view returns (uint256) {
        return FixedPoint.fraction(_value, bondPrice()).decode112with18();
    }

    /**
     *  @notice calculate current bond premium
     *  @return price_ uint
     */
    function bondPrice() public view returns (uint256 price_) {
        price_ = assetPrice().sub(assetPrice().mul(terms.discountRate).div(1000));
        if (price_ < terms.minimumPrice) {
            price_ = terms.minimumPrice;
        }
    }

    /**
     *  @notice calculate current bond price and remove floor if above
     *  @return price_ uint
     */
    function _bondPrice() internal view returns (uint256 price_) {
        price_ = bondPrice();
    }

    /**
     *  @notice get asset price from chainlink
     */
    function assetPrice() public view returns (uint256) {
        uint256 price = priceFeed.latestRoundData();
        return price;
    }

    /**
     *  @notice converts bond price to DAI value
     *  @return price_ uint
     */
    function bondPriceInUSD() public view returns (uint256 price_) {
        price_ = bondPrice();
    }

    /**
     *  @notice calculate current ratio of debt to xBlade supply
     *  @return debtRatio_ uint
     */
    function debtRatio() public view returns (uint256 debtRatio_) {
        uint256 supply = IERC20(xBlade).totalSupply();
        debtRatio_ = FixedPoint.fraction(currentDebt().mul(1e9), supply).decode112with18().div(1e18);
    }

    /**
     *  @notice calculate debt factoring in decay
     *  @return uint
     */
    function currentDebt() public view returns (uint256) {
        return totalDebt.sub(debtDecay());
    }

    /**
     *  @notice amount to decay total debt by
     *  @return decay_ uint
     */
    function debtDecay() public view returns (uint256 decay_) {
        uint32 timeSinceLast = uint32(block.timestamp).sub32(lastDecay);
        decay_ = totalDebt.mul(timeSinceLast).div(terms.vestingTerm);
        if (decay_ > totalDebt) {
            decay_ = totalDebt;
        }
    }

    /**
     *  @notice calculate how far into vesting a depositor is
     *  @param _depositor address
     *  @return percentVested_ uint
     */
    function percentVestedFor(address _depositor) public view returns (uint256 percentVested_) {
        Bond memory bond = bondInfo[_depositor];
        uint256 secondsSinceLast = uint32(block.timestamp).sub32(bond.lastTime);
        uint256 vesting = bond.vesting;

        if (vesting > 0) {
            percentVested_ = secondsSinceLast.mul(10000).div(vesting);
        } else {
            percentVested_ = 0;
        }
    }

    /**
     *  @notice calculate amount of xBlade available for claim by depositor
     *  @param _depositor address
     *  @return pendingPayout_ uint
     */
    function pendingPayoutFor(address _depositor) external view returns (uint256 pendingPayout_) {
        uint256 percentVested = percentVestedFor(_depositor);
        uint256 payout = bondInfo[_depositor].payout;

        if (percentVested >= 10000) {
            pendingPayout_ = payout;
        } else {
            pendingPayout_ = payout.mul(percentVested).div(10000);
        }
    }

    /* ======= AUXILLIARY ======= */

    /**
     *  @notice allow anyone to send lost tokens (excluding principle or xBlade) to the DAO
     *  @return bool
     */
    function recoverLostToken(address _token) external returns (bool) {
        require(_token != xBlade);
        require(_token != principle);
        IERC20(_token).safeTransfer(DAO, IERC20(_token).balanceOf(address(this)));
        return true;
    }

    function refundETH() internal {
        if (address(this).balance > 0) safeTransferETH(DAO, address(this).balance);
    }

    /// @notice Transfers ETH to the recipient address
    /// @dev Fails with `STE`
    /// @param to The destination of the transfer
    /// @param value The value to be transferred
    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{ value: value }(new bytes(0));
        require(success, "STE");
    }
}
