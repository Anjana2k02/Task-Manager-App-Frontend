"use client";

import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebarmain from "./pages/dashboard/sidebar";
import Header from "./pages/dashboard/header";
import Paths from "./routes/path";
import PrivateRoute from "./components/privateRoute";
import UserLogin from "./pages/auth/login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("userId"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("userId"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {!isAuthenticated ? (
        <UserLogin onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <PrivateRoute>
          {/* Full page layout */}
          <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f8f9fa" }}>
            {/* Header - top bar */}
            <Box sx={{ flexShrink: 0 }}>
              <Header />
            </Box>

            {/* Main content below header */}
            <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>
              {/* Sidebar - fixed 20% width */}
              <Box sx={{ width: "20%", flexShrink: 0 }}>
                <Sidebarmain />
              </Box>

              {/* Main content area */}
              <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                <Paths />
              </Box>
            </Box>
          </Box>
        </PrivateRoute>
      )}
    </Router>
  );
}

export default App;
