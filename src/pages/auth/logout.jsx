import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutService = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <Button
      variant="contained"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
      sx={{
        backgroundColor: "#ff6347", // tomato
        color: "#fff",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: 2,
        px: 3,
        py: 1,
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "#e5533f", // darker tomato
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutService;
