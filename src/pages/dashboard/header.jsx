import React, { useEffect, useState } from "react";
import axios from "axios";
import { patchExpressionStatusFetcher } from "../../utils/axios"; // Adjust path if needed

import {
  AppBar, Toolbar, Typography, Box, IconButton, InputBase, Avatar, Divider, Paper
} from "@mui/material";
import {
  Search as SearchIcon,
  GridView as GridViewIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import LogoutService from "../auth/logout";

const Header = () => {
  const [status, setStatus] = useState("");


  useEffect(() => {
    const source = new EventSource("http://localhost:8000/stream_status");

    source.onmessage = (event) => {
      const newStatus = event.data;
      console.log("🔥 New Emotion Status:", newStatus);
      setStatus(newStatus);
    };

    source.onerror = (err) => {
      console.error("❌ SSE connection error:", err);
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  useEffect(() => {
    const id = "67dbdf661d92b513cab38bfb";
    
    if (status && status.trim() !== "") {
      const updateStatus = async () => {
        try {
          await patchExpressionStatusFetcher(id, status);
          console.log("✅ Expression status sent to backend:", { id, status });
        } catch (error) {
          console.error("❌ Failed to update expression status:", error);
        }
      };
  
      updateStatus();
    }
  }, [status]);

  const userInfo = {
    name: "Guest User",
    role: "Worker",
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#3498db",
        color: "#ffffff",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
      }}
    >
      <Toolbar sx={{ height: "72px", px: 2 }}>
        {/* Left Side */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="medium" edge="start" sx={{ mr: 2, color: "#ffffff" }}>
            <GridViewIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "700", color: "#ffffff", letterSpacing: "0.5px" }}>
            HELIX
          </Typography>
        </Box>

        {/* Center - Search */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              maxWidth: "500px",
              height: "38px",
              px: 2,
              borderRadius: "4px",
              backgroundColor: alpha("#ffffff", 0.15),
              "&:hover": { backgroundColor: alpha("#ffffff", 0.25) },
            }}
          >
            <SearchIcon sx={{ color: "#ffffff", mr: 1, fontSize: "1.2rem" }} />
            <InputBase
              placeholder="Search..."
              sx={{
                flex: 1,
                fontSize: "0.875rem",
                color: "#ffffff",
                "& .MuiInputBase-input": {
                  padding: "2px 0",
                  "&::placeholder": {
                    color: alpha("#ffffff", 0.7),
                    opacity: 1,
                  },
                },
              }}
            />
          </Paper>
        </Box>

        {/* Right Side - User Info */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <Box sx={{ mr: 2, textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: "500", color: "#ffffff", lineHeight: 1.2 }}>
                {userInfo.name}
              </Typography>
              <Typography variant="caption" sx={{ color: alpha("#ffffff", 0.7), lineHeight: 1.2 }}>
                {userInfo.role}
              </Typography>
            </Box>

            <Avatar sx={{ width: 36, height: 36, bgcolor: alpha("#ffffff", 0.2) }}>
              <AccountIcon fontSize="small" />
            </Avatar>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1.5, height: "24px", my: "auto", backgroundColor: alpha("#ffffff", 0.3) }}
            />

            <LogoutService />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
