import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register"; // Import the Register component
import { SignInFrame } from "./pages/SignIn"; // Import the SignInFrame component
import Completed from "./pages/completed";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the SignInFrame */}
          <Route path="/" element={<SignInFrame />} />

          {/* Route for the Register page */}
          <Route path="/register" element={<Register />} />

          <Route path="/completed" element={<Completed />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
