import React from "react";
import { Box, Card, CardContent, Typography, createTheme } from "@mui/material";
import Sidebar from "./pages/dashboard/sidebar";
import Header from "./pages/dashboard/header";
import User from "./pages/user/user";
import customTheme from "./theme/theme";

function App() {
  return (
    
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}>
      {/* Sidebar (20% width) */}
      <Sidebar />

      {/* Main Content (80% width) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Header at the Top */}
        <Header />

        {/* Main Body Content */}
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Main Header</Typography>
          <Typography variant="body1">Main Content Appear here</Typography>

          {/* Card Wrapper for User Component */}
          <Card sx={customTheme.components.MuiCard.styleOverrides.root}
            // sx={{
            //   marginTop: 3,
            //   padding: 2,
            //   borderRadius: 2, // Rounded corners
            //   backgroundColor: "white",
            //   boxShadow: 1, // Slight shadow for depth
            // }}
          >
            <CardContent>
              <User />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  
  );
}

export default App;
