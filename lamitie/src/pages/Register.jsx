import React, { useState } from "react";
import ReactHowler from "react-howler";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import videoBackground from "../Images/background-loop.mp4";
import backgroundMusic from "../Images/background-music.mp3";
import logo from "../Images/Lamitie_2k24_Logo.png";
import controller from "../Images/Side Bar Controller.svg";
import "./register.css";

export const RegisterFrame = () => {
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    index: "",
    contact: "",
    email: "",
    combination: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "", // success or error
    show: false,
  });

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    navigate("/");
  };

  const handleCompletedClick = () => {
    navigate("/completed");
  };

  const toggleMusicMute = () => setIsMusicMuted(!isMusicMuted);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const closeNotification = () => {
    setNotification({ ...notification, show: false });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({
          message: "Registration successful!",
          type: "success",
          show: true,
        });
        setFormData({
          title: "",
          name: "",
          index: "",
          contact: "",
          email: "",
          combination: "",
        });
      } else {
        setNotification({
          message: "Failed to register. Please try again.",
          type: "error",
          show: true,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setNotification({
        message: "An error occurred. Please try again later.",
        type: "error",
        show: true,
      });
    }
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
      <header>
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

      {/* Registration Form */}
      <form className="registration-form" onSubmit={handleFormSubmit}>
        <h2 className="form-title">Register Now</h2>

        {/* Form Fields */}
        <div className="form-row">
          <div className="form-group">
            <div className="select-wrapper">
              <select id="title" className="form-control" value={formData.title} onChange={handleInputChange}>
                <option value="">Select your title</option>
                <option value="Mr">Mr</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
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
              value={formData.index}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              id="contact"
              type="text"
              className="form-control"
              placeholder="Enter your contact"
              value={formData.contact}
              onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <div className="select-wrapper">
              <select
                id="combination"
                className="form-control"
                value={formData.combination}
                onChange={handleInputChange}
              >
                <option value="">Select your combination</option>
                <option value="CS/STAT/MATHS">CS/STAT/MATHS</option>
                <option value="CS/PHY/MAT">CS/PHY/MAT</option>
                <option value="CS/AMT/MAT">CS/AMT/MAT</option>
              </select>
            </div>
          </div>
        </div>

        {/* Register Button */}
        <button type="submit" className="register-button">
          <span className="register-text">REGISTER</span>
        </button>
      </form>

      {/* Notification Popup */}
      {notification.show && (
        <div
          className={`notification-card ${
            notification.type === "success" ? "success" : "error"
          }`}
        >
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

export default RegisterFrame;
