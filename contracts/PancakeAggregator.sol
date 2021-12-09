// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.7.5;

import "./interfaces/IPancakeRouter02.sol";

contract PancakeAggregator {
    IPancakeRouter02 public pancakeRouter;
    address public token;
    address public BUSDAddress;

    constructor(
        address _router,
        address _token,
        address _busdAddress
    ) {
        require(_router != address(0));
        pancakeRouter = IPancakeRouter02(_router);
        require(_token != address(0));
        token = _token;
        require(_busdAddress != address(0));
        BUSDAddress = _busdAddress;
    }

    function latestRoundData() external view returns (int256) {
        // generate the pancake pair path of xblade -> weth -> usd
        address[] memory path = new address[](3);
        path[0] = token;
        path[1] = pancakeRouter.WETH();
        path[2] = BUSDAddress;

        return int256(pancakeRouter.getAmountsOut(1e18, path)[2]);
    }
}
