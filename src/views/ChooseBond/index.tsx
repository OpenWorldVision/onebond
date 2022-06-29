import { useDispatch, useSelector } from "react-redux";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Zoom, IconButton, OutlinedInput, Typography, Container, Box } from "@material-ui/core";
import { BondTableData, BondDataCard } from "./BondRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useBonds from "../../hooks/bonds";
import "./choosebond.scss";
import { IReduxState } from "../../store/slices/state.interface";
import { FileCopyOutlined } from "@material-ui/icons";
import { useCallback } from "react";
import { useWeb3Context } from "src/hooks";
import { withStyles } from "@material-ui/styles";
import { success } from "src/store/slices/messages-slice";
import { Skeleton } from "@material-ui/lab";
import { trim } from "src/helpers";

const CssTextField = withStyles({
    root: {
        color: "#FFF",
        borderColor: "#FFF",

        "& .MuiOutlinedInput-root": {
            "&:disable": {
                borderColor: "#FFF",
            },
        },
    },
})(OutlinedInput);

function ChooseBond() {
    const { address } = useWeb3Context();
    const { bonds } = useBonds();
    const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query

    const dispatch = useDispatch();

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);
    const marketPrice = useSelector<IReduxState, number>(state => {
        return state.app.marketPrice;
    });

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(`https://bond.openworld.vision/#/mints/?r=${address}`);

        dispatch(success({ text: `Copied referral link: https://bond.openworld.vision/#/mints/?r=${address}` }));
    }, [address]);

    const totalPurchased = bonds.reduce((prev, cur) => {
        if (cur.name === "xblade-200") {
            return prev + cur.purchased * cur.marketPrice;
        }
        return prev + cur.purchased;
    }, 0);

    return (
        <div className="choose-bond-view">
            <Zoom in={true}>
                <div className="choose-bond-view-card">
                    <div className="choose-bond-view-card-header">
                        <p className="choose-bond-view-card-title"> Buy OPEN (⚔️, ⚔️)</p>
                    </div>

                    <Grid container item xs={12} spacing={2} className="choose-bond-view-card-metrics">
                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center">
                                <p className="choose-bond-view-card-metrics-title">Total Purchased</p>
                                <p className="choose-bond-view-card-metrics-value">
                                    {isAppLoading ? (
                                        <Skeleton width="180px" />
                                    ) : !totalPurchased ? (
                                        0
                                    ) : (
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                            maximumFractionDigits: 0,
                                            minimumFractionDigits: 0,
                                        }).format(totalPurchased)
                                    )}
                                </p>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Box textAlign="center">
                                <p className="choose-bond-view-card-metrics-title">OPEN Price</p>
                                <p className="choose-bond-view-card-metrics-value">{isAppLoading ? <Skeleton width="100px" /> : `$${trim(marketPrice, 4)}`}</p>
                            </Box>
                        </Grid>
                    </Grid>

                    {!isSmallScreen && (
                        <Grid container item>
                            <TableContainer className="choose-bond-view-card-table">
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">Bond</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">Price</p>
                                            </TableCell>
                                            <TableCell align="center">
                                                <p className="choose-bond-view-card-table-title">ROI</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">Purchased</p>
                                            </TableCell>
                                            <TableCell align="right">
                                                <p className="choose-bond-view-card-table-title">Available</p>
                                            </TableCell>
                                            <TableCell align="right"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonds.map(bond => (
                                            <BondTableData key={bond.name} bond={bond} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    )}
                </div>
            </Zoom>
            <div className="choose-bond-view-card referral-container">
                <div className="choose-bond-view-card-header">
                    <p className="choose-bond-view-card-title">Referral</p>
                </div>
                <div className="choose-bond-view-card-header">
                    <p className="choose-bond-view-card-subtitle"> 1% bonus to you when refer your friends</p>
                </div>

                <div className="referral-input">
                    <Container>
                        <Typography>{`https://bond.openworld.vision/#/mints/?r=${address}`}</Typography>
                        <IconButton onClick={handleCopy} className="copy-button">
                            <FileCopyOutlined />
                        </IconButton>
                    </Container>
                </div>
            </div>
            {isSmallScreen && (
                <div className="choose-bond-view-card-container">
                    <Grid container item spacing={2}>
                        {bonds.map(bond => (
                            <Grid item xs={12} key={bond.name}>
                                <BondDataCard key={bond.name} bond={bond} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default ChooseBond;
