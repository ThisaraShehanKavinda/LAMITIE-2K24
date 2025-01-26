import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import lamitie2K24Logo from "../Images/Lamitie_2k24_Logo.png";
import "./style.css";

export const SideBar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef(null);


  const navigate = useNavigate();
      const handleSignOutClick = () => {
          navigate("/"); 
        };

        const handleCompletedClick = () => {
          navigate("/completed"); // navigate to register page
        };

        const handleRegisterClick = () => {
          navigate("/register"); // navigate to register page
        };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Collapse the sidebar when clicking outside
      }
    };

    // Adding event listener only when the sidebar is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar} // Clicking the overlay closes the sidebar
      ></div>

      {/* Sidebar */}
      <div
        className={`sidebar-container ${isOpen ? "open" : ""}`}
        ref={sidebarRef}
      >
        <div className="sidebar-content">
          <img
            className="sidebar-logo"
            alt="Lamitie logo"
            src={lamitie2K24Logo}
          />
          <div className="sidebar-menu">


          <div className="menu-item">
    <span className="menu-text"   onClick={handleRegisterClick} data-text="Register">Register</span>
  </div>


  <div className="menu-item">
    <span className="menu-text" onClick={handleCompletedClick}  data-text="Completed">Completed</span>
  </div>
  
  <div className="menu-item">
    <span className="menu-text" onClick={handleSignOutClick} data-text="Sign Out">Sign Out</span>
  </div>
</div>

        </div>
      </div>
    </>
  );
};
