import React from "react";
import dropDownIcon from "../Images/drop down icon.svg";
import lamitie2K24Logo from "../Images/Lamitie_2k24_Logo.png";
import { default as image, default as muteIcon } from "../Images/mute icon.svg";
import sideBarController from "../Images/Side Bar Controller.svg";
import "./register.css";

export const RegisterFrame = () => {
    return (
        <div className="register-container">
            <div className="layout-wrapper">
                <div className="layout">
                    <div className="background-overlay" />

                    <img
                        className="logo"
                        alt="Lamitie logo"
                        src={lamitie2K24Logo}
                    />

                    <header className="navigation-header">
                        <div className="header-item">REGISTER</div>
                        <div className="header-item">COMPLETED</div>
                        <div className="header-item">SIGN OUT</div>
                        <img
                            className="menu-controller"
                            alt="Menu controller"
                            src={sideBarController}
                        />
                    </header>

                    <div className="audio-control">
                        <div className="audio-wrapper">
                            <img className="audio-icon" alt="Mute icon" src={muteIcon} />
                            <div className="audio-toggle" />
                        </div>
                    </div>

                    <div className="form-section">
                        <button className="submit-button">
                            <div className="submit-wrapper">
                                <div className="submit-button-bg" />
                                <div className="submit-text">REGISTER</div>
                            </div>
                        </button>

                        <div className="input-fields">
                            <div className="input-group">
                                <div className="input-label">Select&nbsp;&nbsp;your title</div>
                                <img
                                    className="dropdown-icon"
                                    alt="Drop down icon"
                                    src={dropDownIcon}
                                />
                            </div>
                            <div className="input-wrapper">
                                <div className="input-label">Name</div>
                            </div>
                            <div className="input-group">
                                <div className="input-label">Index</div>
                            </div>
                            <div className="input-wrapper">
                                <div className="input-label">Contact</div>
                            </div>
                            <div className="input-group">
                                <div className="input-label">Email</div>
                            </div>
                            <div className="input-group">
                                <div className="input-label">Combination</div>
                                <img className="dropdown-image" alt="Drop down icon" src={image} />
                            </div>
                        </div>

                        <div className="form-title">REGISTER NOW</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterFrame;
