import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { trim } from "../../helpers";
import { Grid, Backdrop, Box, Fade } from "@material-ui/core";
import TabPanel from "../../components/TabPanel";
import BondHeader from "./BondHeader";
import BondRedeem from "./BondRedeem";
import BondPurchase from "./BondPurchase";
import "./bond.scss";
import { useReferral, useWeb3Context } from "../../hooks";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { IAllBondData } from "../../hooks/bonds";
import classnames from "classnames";
import qs from "qs";
import { useLocation } from "react-router-dom";

interface IBondProps {
    bond: IAllBondData;
}

function Bond({ bond, ...props }: IBondProps) {
    const { address } = useWeb3Context();
    const location = useLocation();

    const [slippage, setSlippage] = useState(0.5);

    const [view, setView] = useState(0);

    const isBondLoading = useSelector<IReduxState, boolean>(state => state.bonding.loading ?? true);

    const refAddress = useReferral();

    const onSlippageChange = (value: any) => {
        return setSlippage(value);
    };

    const changeView = (newView: number) => () => {
        setView(newView);
    };

    return (
        <Fade in={true} mountOnEnter unmountOnExit>
            <Grid className="bond-view">
                <Backdrop open={true}>
                    <Fade in={true}>
                        <div className="bond-card">
                            <BondHeader bond={bond} slippage={slippage} onSlippageChange={onSlippageChange} />
                            {/* @ts-ignore */}
                            <Box direction="row" className="bond-price-data-row">
                                <div className="bond-price-data">
                                    <p className="bond-price-data-title">Sale Price</p>
                                    <p className="bond-price-data-value">
                                        {isBondLoading ? <Skeleton /> : bond.isLP || bond.name === "one" ? `$${trim(bond.bondPrice, 4)} ONE` : `${trim(bond.bondPrice, 4)} BUSD`}
                                    </p>
                                </div>
                                <div className="bond-price-data">
                                    <p className="bond-price-data-title">OPEN Price</p>
                                    <p className="bond-price-data-value">{isBondLoading ? <Skeleton /> : `$${trim(bond.marketPrice, 4)}`}</p>
                                </div>
                            </Box>

                            <div className="bond-one-table">
                                <div className={classnames("bond-one-table-btn", { active: !view })} onClick={changeView(0)}>
                                    <p>Buy</p>
                                </div>
                                <div className={classnames("bond-one-table-btn", { active: view })} onClick={changeView(1)}>
                                    <p>Redeem</p>
                                </div>
                            </div>

                            <TabPanel value={view} index={0}>
                                <BondPurchase bond={bond} slippage={slippage} refAddress={refAddress} />
                            </TabPanel>

                            <TabPanel value={view} index={1}>
                                <BondRedeem bond={bond} />
                            </TabPanel>
                        </div>
                    </Fade>
                </Backdrop>
            </Grid>
        </Fade>
    );
}

export default Bond;
