import React, { useEffect, useState } from "react";
import ReactHowler from "react-howler";
import { FaSearch, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import videoBackground from "../Images/background-loop.mp4";
import backgroundMusic from "../Images/background-music.mp3";
import logo from "../Images/Lamitie_2k24_Logo.png";
import controller from "../Images/Side Bar Controller.svg";
import "./completed.css";

export const CompletedFrame = () => {
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    show: false,
  });

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

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  // Fetch data from backend (which interacts with Google Sheets API)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getCompletedData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTableData(data); // Assuming the backend returns an array of rows
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotification({
          message: "Failed to fetch completed data.",
          type: "error",
          show: true,
        });
      }
    };

    fetchData();
  }, []);

  const filteredData = tableData.filter((row) =>
    row.index?.toString().includes(searchQuery.trim())
  );

  return (
    <div className="completed-frame">
      {/* Background Video */}
      <video className="background-video" autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
      </video>

      {/* Background Music */}
      <ReactHowler src={backgroundMusic} playing={!isMusicMuted} loop={true} volume={0.5} />

      <img src={logo} alt="Logo" className="logo" />

      {/* Search Bar */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search by Index"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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
      
        <h2 className="table-title">Completed Registrations</h2>
        <div className="table-container">
        <table className="completed-table">
          <thead>
            <tr>
              <th>Index</th>
              <th>Title</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Combination</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="index-column">{row.index}</td>
                  <td>{row.title}</td>
                  <td>{row.name}</td>
                  <td>{row.contact}</td>
                  <td>{row.email}</td>
                  <td>{row.combination}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data-row">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Notification Popup */}
      {notification.show && (
        <div className={`notification-card ${notification.type === "success" ? "success" : "error"}`}>
          <p>{notification.message}</p>
          <button onClick={closeNotification} className="close-button">Ok</button>
        </div>
      )}

      {/* Mute/Unmute Button */}
      <div className="mute-button" onClick={toggleMusicMute}>
        {isMusicMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </div>
    </div>
  );
};

export default CompletedFrame;
