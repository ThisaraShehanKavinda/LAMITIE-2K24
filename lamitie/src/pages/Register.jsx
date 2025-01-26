import React, { useState } from "react";
import ReactHowler from "react-howler";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import videoBackground from "../Images/background-loop.mp4";
import backgroundMusic from "../Images/background-music.mp3";
import logo from '../Images/Lamitie_2k24_Logo.png';
import controller from '../Images/Side Bar Controller.svg';
import "./register.css";

export const RegisterFrame = () => {
    const [isMusicMuted, setIsMusicMuted] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);


    const navigate = useNavigate();
    const handleSignOutClick = () => {
        navigate("/"); // navigate to register page
      };
      const handleCompletedClick = () => {
        navigate("/completed"); // navigate to register page
      };

    const toggleMusicMute = () => setIsMusicMuted(!isMusicMuted);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="register-frame">
            {/* Background Video */}
            <video className="background-video" autoPlay loop muted>
                <source src={videoBackground} type="video/mp4" />
            </video>

            {/* Background Music */}
            <ReactHowler src={backgroundMusic} playing={!isMusicMuted} loop={true} volume={0.5} />

            <img src={logo} alt="Logo" className="logo" />

            {/* Header */}
            <header >
                <div className="header-options">
                    <div className="header-title">
                        <span className="header-text" data-text="Register">
                            Register
                        </span>
                    </div>
                    <div className="header-title">
                        <span className="header-text" onClick={handleCompletedClick} data-text="Completed">
                            Completed
                        </span>
                    </div>
                    <div className="header-title">
                        <span className="header-text" onClick ={handleSignOutClick} data-text="Sign Out">
                            Sign Out
                        </span>
                    </div>
                    <img
                        src={controller}
                        alt="controller"
                        className="controller-icon"
                        onClick={toggleSidebar}
                    />
                </div>
            </header>

            {/* Sidebar */}
            <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Registration Form */}
            <div className="registration-form">
                <h2 className="form-title">Register Now</h2>

                {/* Form Fields */}
                <div className="form-row">
                    <div className="form-group">
                        <div className="select-wrapper">
                            <select id="title" className="form-control">
                                <option>Select your title</option>
                                <option>Mr</option>
                                <option>Ms</option>
                                <option>Miss</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input
                            id="index"
                            type="text"
                            className="form-control"
                            placeholder="Enter your index"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            id="contact"
                            type="text"
                            className="form-control"
                            placeholder="Enter your contact"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <div className="select-wrapper">
                            <select id="combination" className="form-control">
                                <option>Select your combination</option>
                                <option>CS/STAT/MATHS</option>
                                <option>CS/PHY/MAT</option>
                                <option>CS/AMT/MAT</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Register Button */}
                <button className="register-button">
                    <span className="register-text">REGISTER</span>
                </button>
            </div>

            {/* Mute/Unmute Button */}
            <div className="mute-button" onClick={toggleMusicMute}>
                {isMusicMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
        </div>
    );
};

export default RegisterFrame;
