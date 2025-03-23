import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebarmain from "./pages/dashboard/sidebar";
import Header from "./pages/dashboard/header";
import Paths from "./routes/path";


function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}>
        {/* Sidebar */}
        <Sidebarmain />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Header at the Top */}
          <Header />

          {/* Main Routes (Dynamic Page Changes) */}
          {/* <Box sx={{ p: 3 }}> */}
            <Paths />
          {/* </Box> */}
        </Box>
      </Box>
    </Router>
  );
}

export default App;
