import React, { useState } from "react";
import ReactHowler from "react-howler";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import videoBackground from "../Images/background-loop.mp4";
import backgroundMusic from "../Images/background-music.mp3";
import lamitie2K24Logo from "../Images/Lamitie_2k24_Logo.png";
import "./SignIn.css";

export const SignInFrame = () => {
  
  
    const [isMusicMuted, setIsMusicMuted] = useState(false);
        
    
        const toggleMusicMute = () => setIsMusicMuted(!isMusicMuted);

  const navigate = useNavigate();

  

  const handleSignInClick = () => {
    navigate("/register"); // navigate to register page
  };

  return (
    <div className="sign-in-frame">
      <div className="overlap-wrapper">
        {/* Background Video */}
        <video
  className="background-video-signin"
  autoPlay
  muted
  ref={(video) => {
    if (video) {
      video.onended = () => {
        video.play(); // Replay the video manually when it ends
      };
    }
  }}
>
  <source src={videoBackground} type="video/mp4" />
</video>



            {/* Background Music */}
            <ReactHowler src={backgroundMusic} playing={!isMusicMuted} loop={true} volume={0.5} />

        {/* Logo */}
        <img
          className="lamitie-logo"
          alt="Lamitie logo"
          src={lamitie2K24Logo}
        />

         {/* Mute/Unmute Button */}
                    <div className="mute-button" onClick={toggleMusicMute}>
                        {isMusicMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </div>

        {/* Sign In Button */}
        <button className="Signin-Button" onClick={handleSignInClick}>
                    <span className="signin-text">Sign In</span>
                </button>

        
      </div>
    </div>
  );
};
