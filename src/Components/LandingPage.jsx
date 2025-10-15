import React from "react";
import "../App.css";
import PAEngineConfiguration from "./PAEngineConfiguration";

const LandingPage = () => {
    return (
        <>
            <div className="container-fluid">
                {/* Header */}
                <div className="landing-header">
                    <div className="landing-logo">
                        <img
                            src={`${process.env.PUBLIC_URL}/Images/TXSeal.png`}
                            alt="State Logo"
                            className="state-logo"
                        />
                    </div>
                    <div className="landing-title">
                        <img
                            src={`${process.env.PUBLIC_URL}/Images/Vue360Rx.png`}
                            alt="VUE 360 Rx"
                            className="vue-logo"
                        />
                    </div>
                    <div className="landing-caption">
                        <span className="page-caption">&nbsp;</span>
                    </div>
                    <div className="landing-systemtime">
                        <span className="system-time">10/10/2025 (25283)</span>
                    </div>
                </div>
                {/* Navbar */}
                <nav
                    className="navbar navbar-inverse"
                    aria-label="Navigation Menu"
                >
                    <span
                        id="ctl00_lblWelcome"
                        className="welcome-text"
                    >
                        John is logged on to: R26 STG8 Pharmacy Test
                    </span>
                </nav>
                {/* Main Content: Search Bar and Grid */}
                <div className="main-content">
                    <PAEngineConfiguration />
                </div>
                {/* Footer */}
                <div id="footer" className="TP_Footer ms-dialogHidden">
                    <div id="TP_FooterBG_VUE360">
                        <div className="TP_FooterLinksContainer_VUE360">
                            <div className="footer-gainwell-logo-cell">
                                <img
                                    src={`${process.env.PUBLIC_URL}/Images/gainwell-logo.jpg`}
                                    alt="Gainwell"
                                    className="footer-gainwell-logo"
                                />
                            </div>
                            <div className="TP_FooterLinks">
                                <a href="http://www.cms.gov/" target="_blank" rel="noopener noreferrer">cms.gov</a>
                                <span className="TP_Separator">|</span>
                                <a href="https://gainwelltechnologies.com/copyright/" target="_blank" rel="noopener noreferrer">Copyright Notice</a>
                                <span className="TP_Separator">|</span>
                                <a href="https://gainwelltechnologies.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Statement</a>
                                <span className="TP_Separator">|</span>
                                <a href="https://gainwelltechnologies.com/site-terms/" target="_blank" rel="noopener noreferrer">Site Policies</a>
                            </div>
                            <div className="footer-empty-cell" />
                        </div>
                        <img
                            src={`${process.env.PUBLIC_URL}/Images/Footer-gainwell.png`}
                            className="VUE360FooterBar"
                            alt="VUE360 Footer Bar"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LandingPage;
