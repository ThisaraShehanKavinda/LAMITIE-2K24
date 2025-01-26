
import { useNavigate } from "react-router-dom";

import videoBackground1 from "../Images/background2.mp4";
import lamitie2K24Logo from "../Images/Lamitie_2k24_Logo.png";
import "./SignIn.css";

export const SignInFrame = () => {
  
  
   

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
  <source src={videoBackground1} type="video/mp4" />
</video>



           

        {/* Logo */}
        <img
          className="lamitie-logo"
          alt="Lamitie logo"
          src={lamitie2K24Logo}
        />

        

        {/* Sign In Button */}
        <button className="Signin-Button" onClick={handleSignInClick}>
                    <span className="signin-text">Sign In</span>
                </button>

        
      </div>
    </div>
  );
};
