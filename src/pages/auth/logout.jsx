import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutService = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");

    // Optionally force app re-render if needed:
    window.dispatchEvent(new Event("storage")); // triggers useEffect in App.js

    navigate("/"); // go back to login
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutService;
