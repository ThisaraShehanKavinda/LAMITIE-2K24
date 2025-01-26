import React, { useState } from "react";
import ReactHowler from "react-howler";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import videoBackground from "../Images/background-loop.mp4";
import backgroundMusic from "../Images/background-music.mp3";
import logo from '../Images/Lamitie_2k24_Logo.png';
import controller from '../Images/Side Bar Controller.svg';
import "./completed.css";

export const CompletedFrame = () => {
    const [isMusicMuted, setIsMusicMuted] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);




    const navigate = useNavigate();
    const handleSignOutClick = () => {
        navigate("/"); // navigate to register page
      };

      const handleRegisterClick = () => {
        navigate("/register"); // navigate to register page
      };

    const toggleMusicMute = () => setIsMusicMuted(!isMusicMuted);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="completedr-frame">
            {/* Background Video */}
            <video className="background-video" autoPlay loop muted>
                <source src={videoBackground} type="video/mp4" />
            </video>

            {/* Background Music */}
            <ReactHowler src={backgroundMusic} playing={!isMusicMuted} loop={true} volume={0.5} />

            <img src={logo} alt="Logo" className="logo" />

            {/* Header */}
            <header >
                <div className="headers-options">
                    <div className="header-title">
                        <span className="header-text" onClick={handleRegisterClick} data-text="Register">
                            Register
                        </span>
                    </div>
                    <div className="header-title">
                        <span className="header-text" data-text="Completed">
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

            

            {/* Mute/Unmute Button */}
            <div className="mute-button" onClick={toggleMusicMute}>
                {isMusicMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
        </div>
    );
};

export default CompletedFrame;
