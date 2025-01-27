import React, { useEffect, useState } from "react";
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
    const [tableData, setTableData] = useState([]);

    const navigate = useNavigate();

    const handleSignOutClick = () => {
        navigate("/"); // Navigate to home page
    };

    const handleRegisterClick = () => {
        navigate("/register"); // Navigate to register page
    };

    const toggleMusicMute = () => setIsMusicMuted(!isMusicMuted);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/Sheet1?key=YOUR_API_KEY"
                );
                const data = await response.json();
                const rows = data.values.slice(1).map(row => ({
                    index: row[0],
                    name: row[1],
                    email: row[2],
                    combination: row[3],
                }));
                setTableData(rows);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="completed-frame">
            {/* Background Video */}
            <video className="background-video" autoPlay loop muted>
                <source src={videoBackground} type="video/mp4" />
            </video>

            {/* Background Music */}
            <ReactHowler src={backgroundMusic} playing={!isMusicMuted} loop={true} volume={0.5} />

            <img src={logo} alt="Logo" className="logo" />

            {/* Header */}
            <header>
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
                        <span className="header-text" onClick={handleSignOutClick} data-text="Sign Out">
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

            {/* Completed Table */}
            <div className="table-container">
                <table className="completed-table">
                    <thead>
                        <tr>
                            <th>Index Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Combination</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td className="index-column">{row.index}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.combination}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mute/Unmute Button */}
            <div className="mute-button" onClick={toggleMusicMute}>
                {isMusicMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </div>
        </div>
    );
};

export default CompletedFrame;
