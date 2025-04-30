import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#caf0f8",
        color: "black",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Side - Page Title */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          HELIX
        </Typography>

        {/* Center - Search Button */}
        <Box sx={{ display: "flex", alignItems: "center", background: "#f1f3f5", borderRadius: 1, paddingX: 1 }}>
          <InputBase placeholder="Search…" sx={{ ml: 1, flex: 1 }} />
          <IconButton>
            <Search />
          </IconButton>
        </Box>

        {/* Right Side - Employee & User Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">Guest User</Typography>
          <Avatar alt="User" src="/static/images/avatar/1.jpg" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
