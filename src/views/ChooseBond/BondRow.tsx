import { priceUnits, trim } from "../../helpers";
import BondLogo from "../../components/BondLogo";
import { Paper, TableRow, TableCell, Slide, Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { IAllBondData } from "../../hooks/bonds";
import { useReferral, useWeb3Context } from "src/hooks";
import { DEFAULT_NETWORK } from "src/constants";
import getUrl from "src/helpers/get-url";

interface IBondProps {
    bond: IAllBondData;
}

export function BondDataCard({ bond }: IBondProps) {
    const isBondLoading = !bond.bondPrice ?? true;
    const { connected, connect } = useWeb3Context();
    const refAddress = useReferral();

    return (
        <Slide direction="up" in={true}>
            <Paper className="bond-data-card">
                <div className="bond-pair">
                    <BondLogo bond={bond} />
                    <div className="bond-name">
                        <p className="bond-name-title">{bond.displayName}</p>
                        {bond.isLP && (
                            <div>
                                <Link href={bond.lpUrl} target="_blank">
                                    <p className="bond-name-title">View Contract</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">Price</p>
                    <p className="bond-price bond-name-title">
                        <>
                            {priceUnits(bond)} {isBondLoading ? <Skeleton width="50px" /> : trim(bond.bondPrice, 4)}
                        </>
                    </p>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">ROI</p>
                    <p className="bond-name-title">{isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">Purchased</p>
                    <p className="bond-name-title">
                        {isBondLoading ? (
                            <Skeleton width="80px" />
                        ) : (
                            new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                                maximumFractionDigits: 0,
                                minimumFractionDigits: 0,
                            }).format(bond.purchased)
                        )}
                    </p>
                </div>

                <div className="data-row">
                    <p className="bond-name-title">Available</p>
                    <p className="bond-name-title">
                        {isBondLoading ? (
                            <Skeleton width="80px" />
                        ) : (
                            new Intl.NumberFormat("en-US", {
                                maximumFractionDigits: 0,
                                minimumFractionDigits: 0,
                            }).format(bond.available)
                        )}
                    </p>
                </div>

                {connected ? (
                    <Link component={NavLink} to={getUrl(`/mints/${bond.name}`, refAddress)}>
                        <div className="bond-table-btn">
                            <p>Buy</p>
                        </div>
                    </Link>
                ) : (
                    <div className="bond-table-btn" onClick={connect}>
                        <p>Connect Wallet</p>
                    </div>
                )}
            </Paper>
        </Slide>
    );
}

export function BondTableData({ bond }: IBondProps) {
    const { connected, connect, providerChainID } = useWeb3Context();
    const isBondLoading = !bond.bondPrice ?? true;
    const refAddress = useReferral();

    return (
        <TableRow>
            <TableCell align="left">
                <BondLogo bond={bond} />
                <div className="bond-name">
                    <p className="bond-name-title">{bond.displayName}</p>
                    {bond.isLP && (
                        <Link color="primary" href={bond.lpUrl} target="_blank">
                            <p className="bond-name-title">View Contract</p>
                        </Link>
                    )}
                </div>
            </TableCell>
            <TableCell align="center">
                <p className="bond-name-title">
                    <>
                        <span className="currency-icon">{priceUnits(bond)}</span> {isBondLoading ? <Skeleton width="50px" /> : trim(bond.bondPrice, 4)}
                    </>
                </p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">{isBondLoading ? <Skeleton width="50px" /> : `${trim(bond.bondDiscount * 100, 2)}%`}</p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">
                    {isBondLoading ? (
                        <Skeleton width="50px" />
                    ) : (
                        new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                        }).format(bond.purchased)
                    )}
                </p>
            </TableCell>
            <TableCell align="right">
                <p className="bond-name-title">
                    {isBondLoading ? (
                        <Skeleton width="50px" />
                    ) : (
                        new Intl.NumberFormat("en-US", {
                            maximumFractionDigits: 0,
                            minimumFractionDigits: 0,
                        }).format(bond.available)
                    )}
                </p>
            </TableCell>
            <TableCell>
                {connected && providerChainID === DEFAULT_NETWORK ? (
                    <Link component={NavLink} to={getUrl(`/mints/${bond.name}`, refAddress)}>
                        <div className="bond-table-btn">
                            <p>Buy</p>
                        </div>
                    </Link>
                ) : (
                    <div className="bond-table-btn" onClick={connect}>
                        <p>{connected ? "Wrong Network" : "Connect Wallet"}</p>
                    </div>
                )}
            </TableCell>
        </TableRow>
    );
}
