import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, OutlinedInput, InputAdornment, Slide, FormControl, Modal } from "@material-ui/core";
import { shorten, trim, prettifySeconds } from "../../helpers";
import { changeApproval, bondAsset, calcBondDetails } from "../../store/slices/bond-slice";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAllBondData } from "../../hooks/bonds";
import useDebounce from "../../hooks/debounce";
import { messages } from "../../constants/messages";
import { warning } from "../../store/slices/messages-slice";
import Zapin from "./Zapin";
import { DEFAULT_NETWORK } from "src/constants";

interface IBondPurchaseProps {
    bond: IAllBondData;
    slippage: number;
    refAddress: string;
}

function BondPurchase({ bond, slippage, refAddress }: IBondPurchaseProps) {
    const dispatch = useDispatch();
    const { provider, address, chainID, checkWrongNetwork, connected, connect, providerChainID } = useWeb3Context();

    const [quantity, setQuantity] = useState("");
    const [useAvax, setUseAvax] = useState(true);

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);
    const [zapinOpen, setZapinOpen] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [proceed, setProceed] = useState(false);

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const vestingPeriod = () => {
        return prettifySeconds(bond.vestingTerm, "day");
    };
    const clearInput = () => {
        setQuantity("");
    };

    async function onBond() {
        if (await checkWrongNetwork()) return;
        if (quantity === "") {
            dispatch(warning({ text: messages.before_minting }));
            //@ts-ignore
        } else if (isNaN(quantity)) {
            dispatch(warning({ text: messages.before_minting }));
        } else if (bond.interestDue > 0 || bond.pendingPayout > 0) {
            setShowWarningModal(true);
        } else {
            const trimBalance = trim(Number(quantity), 10);
            await dispatch(
                //@ts-ignore
                bondAsset({
                    value: trimBalance,
                    slippage,
                    bond,
                    networkID: chainID,
                    provider,
                    address,
                    useAvax,
                    refAddress,
                }),
            );
            clearInput();
        }
    }

    const dispatchBond = (trimBalance: any) => {
        dispatch(
            bondAsset({
                value: trimBalance,
                slippage,
                bond,
                networkID: chainID,
                provider,
                address,
                useAvax,
                refAddress,
            }),
        );
    };

    const hasAllowance = useCallback(() => {
        return bond.allowance > 0;
    }, [bond.allowance]);

    const setMax = () => {
        let amount: any = Math.min(bond.maxBondPriceToken * 0.9999, useAvax ? bond.avaxBalance * 0.99 : bond.balance);

        if (amount) {
            amount = trim(amount);
        }

        setQuantity((amount || "").toString());
    };

    const bondDetailsDebounce = useDebounce(quantity, 1000);

    useEffect(() => {
        dispatch(calcBondDetails({ bond, value: quantity, provider, networkID: chainID }));
    }, [bondDetailsDebounce]);

    const onSeekApproval = async () => {
        if (await checkWrongNetwork()) return;

        dispatch(changeApproval({ address, bond, provider, networkID: chainID }));
    };

    const handleZapinOpen = () => {
        dispatch(calcBondDetails({ bond, value: "0", provider, networkID: chainID }));
        setZapinOpen(true);
    };

    const handleZapinClose = () => {
        dispatch(calcBondDetails({ bond, value: quantity, provider, networkID: chainID }));
        setZapinOpen(false);
    };

    const closeModal = () => {
        setShowWarningModal(false);
    };

    const setProceedStatus = useCallback(() => {
        setShowWarningModal(false);
        const trimBalance = trim(Number(quantity), 10);
        dispatchBond(trimBalance);
    }, [quantity, dispatchBond, setShowWarningModal]);

    const displayUnits = useAvax ? "ONE" : bond.displayUnits;

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-around" flexWrap="wrap">
                {bond.name === "wavax" && (
                    <FormControl className="ohm-input" variant="outlined" color="primary" fullWidth>
                        <div className="avax-checkbox">
                            <input type="checkbox" checked={useAvax} onClick={() => setUseAvax(!useAvax)} />
                            <p>Use BNB</p>
                        </div>
                    </FormControl>
                )}
                <FormControl className="bond-input-wrap" variant="outlined" color="primary" fullWidth>
                    <OutlinedInput
                        placeholder="ONE Amount"
                        type="number"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        labelWidth={0}
                        className="bond-input"
                        endAdornment={
                            <InputAdornment position="end">
                                <div className="stake-input-btn" onClick={setMax}>
                                    <p>Max</p>
                                </div>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {hasAllowance() || useAvax ? (
                    <div
                        className="transaction-button bond-approve-btn"
                        onClick={async () => {
                            if (isPendingTxn(pendingTransactions, "bond_" + bond.name)) return;
                            await onBond();
                        }}
                    >
                        {connected && providerChainID === DEFAULT_NETWORK ? (
                            <p>{txnButtonText(pendingTransactions, "bond_" + bond.name, "Buy")}</p>
                        ) : (
                            <div className="bond-table-btn" onClick={connect}>
                                <p>{connected ? "Wrong Network" : "Connect Wallet"}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        className="transaction-button bond-approve-btn"
                        onClick={async () => {
                            if (isPendingTxn(pendingTransactions, "approve_" + bond.name)) return;
                            await onSeekApproval();
                        }}
                    >
                        {connected && providerChainID === DEFAULT_NETWORK ? (
                            <p>{txnButtonText(pendingTransactions, "approve_" + bond.name, "Approve")}</p>
                        ) : (
                            <div className="bond-table-btn" onClick={connect}>
                                <p>{connected ? "Wrong Network" : "Connect Wallet"}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* <div className="transaction-button bond-approve-btn" onClick={handleZapinOpen}>
                    <p>Zap</p>
                </div> */}

                {!hasAllowance() && !useAvax && (
                    <div className="help-text">
                        <p className="help-text-desc">
                            Note: The "Approve" transaction is only needed when minting for the first time; subsequent minting only requires you to perform the "Mint" transaction.
                        </p>
                    </div>
                )}
            </Box>

            <Slide direction="left" in={true} mountOnEnter unmountOnExit {...{ timeout: 533 }}>
                <Box className="bond-data">
                    <div className="data-row">
                        <p className="bond-balance-title">Your Balance</p>
                        <p className="bond-balance-title">
                            {isBondLoading ? (
                                <Skeleton width="100px" />
                            ) : (
                                <>
                                    {trim(useAvax ? bond.avaxBalance : bond.balance, 4)} {displayUnits}
                                </>
                            )}
                        </p>
                    </div>

                    <div className="data-row">
                        <p className="bond-balance-title">You Will Get</p>
                        <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondQuote, 4)} OPEN`}</p>
                    </div>

                    <div className={`data-row`}>
                        <p className="bond-balance-title">Max You Can Buy</p>
                        <p className="price-data bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.maxBondPrice, 4)} OPEN`}</p>
                    </div>

                    <div className="data-row">
                        <p className="bond-balance-title">ROI</p>
                        <p className="bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
                    </div>

                    <div className="data-row">
                        <p className="bond-balance-title">Vesting Term</p>
                        <p className="bond-balance-title">{isBondLoading ? <Skeleton width="100px" /> : vestingPeriod()}</p>
                    </div>

                    {Boolean(refAddress) && (
                        <div className="data-row">
                            <p className="bond-balance-title">Referral By</p>
                            <p className="bond-balance-title">{refAddress}</p>
                        </div>
                    )}
                </Box>
            </Slide>
            <Modal open={showWarningModal} className={"bond-modal"} onClose={closeModal}>
                <div>
                    <div className="content-modal">
                        {messages.existing_mint}
                        <div className="row-exist">
                            <div className="exist-button" onClick={closeModal}>
                                <p>Cancel</p>
                            </div>
                            <div className="exist-button-margin" onClick={setProceedStatus}>
                                <p>Proceed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Zapin open={zapinOpen} handleClose={handleZapinClose} bond={bond} />
        </Box>
    );
}

export default BondPurchase;
