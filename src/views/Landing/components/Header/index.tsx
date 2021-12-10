import React, { useState } from "react";
import "./header.scss";
import WonderlandIcon from "../../../../assets/icons/xBlade-icon.png";
import { SvgIcon, Link, Box, Popper, Fade } from "@material-ui/core";
import { ReactComponent as GitHub } from "../../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../../assets/icons/discord.svg";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="landing-header">
            <img src={WonderlandIcon} alt="fireSpot" />
            {/* <SvgIcon color="primary" component={WonderlandIcon} viewBox="0 0 174 40" style={{ minWidth: 174, minHeight: 40 }} /> */}
            <div className="landing-header-nav-wrap">
                <Box component="div" onMouseEnter={e => handleClick(e)} onMouseLeave={e => handleClick(e)}>
                    <p className="landing-header-nav-text">Social</p>
                    <Popper className="landing-header-poper" open={open} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={200}>
                                <div className="tooltip">
                                    <Link className="tooltip-item" href="https://github.com/CryptoWar-Network" target="_blank">
                                        <SvgIcon color="primary" component={GitHub} />
                                        <p>GitHub</p>
                                    </Link>
                                    <Link className="tooltip-item" href="https://twitter.com/xbladecryptowar" target="_blank">
                                        <SvgIcon color="primary" component={Twitter} />
                                        <p>Twitter</p>
                                    </Link>
                                    <Link className="tooltip-item" href="https://t.me/elasticbitcoinxbt" target="_blank">
                                        <SvgIcon viewBox="0 0 32 32" color="primary" component={Telegram} />
                                        <p>Telegram</p>
                                    </Link>
                                    <Link className="tooltip-item" href="https://discord.gg/zS2khZ4F7K" target="_blank">
                                        <SvgIcon color="primary" component={Discord} />
                                        <p>Discord</p>
                                    </Link>
                                </div>
                            </Fade>
                        )}
                    </Popper>
                </Box>
            </div>
        </div>
    );
}

export default Header;
