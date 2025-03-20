import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  ThemeProvider,
} from "@mui/material";

import {
  Dashboard,
  ShoppingBag,
  ExpandLess,
  ExpandMore,
  Receipt,
  List as ListIcon,
  AddCircleOutline,
  History,
} from "@mui/icons-material";

import customTheme from "../../theme/theme";

const Sidebar = () => {
  // State for managing dropdowns
  const [openUser, setOpenUser] = useState(false);
  const [openStockIssuing, setOpenStockIssuing] = useState(false);
  const [openReceivable, setOpenReceivable] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          boxSizing: "border-box",
          backgroundColor: "#f8f9fa",
          padding: "10px",
        },
      }}
    >
      <ThemeProvider theme={customTheme}>
      <List>
        {/* Home Section */}
        <Typography variant="body2" sx={{ padding: "10px", color: "#675675", fontWeight: "bold" }}>
          Home
        </Typography>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />

        {/* User Section */}
        <Typography variant="body2" sx={{ padding: "10px", color: "#6c757d", fontWeight: "bold" }}>
          User
        </Typography>
        <ListItem button>
          <ListItemIcon>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="POS" />
        </ListItem>

        {/* User */}
        <ListItem button onClick={() => setOpenUser(!openUser)}>
          <ListItemIcon>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="Manage User" />
          {openUser ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ paddingLeft: "20px" }}>
            <ListItem button>
              <ListItemIcon>
                <AddCircleOutline />
              </ListItemIcon>
              <ListItemText primary="User Settings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AddCircleOutline />
              </ListItemIcon>
              <ListItemText primary="Update User" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText primary="Delete User" />
            </ListItem>
          </List>
        </Collapse>

        {/*  (Dropdown) */}
        <ListItem button onClick={() => setOpenStockIssuing(!openStockIssuing)}>
          <ListItemIcon>
            <ShoppingBag />
          </ListItemIcon>
          <ListItemText primary="User Report" />
          {openStockIssuing ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Divider />

        {/* POS REPORT Section */}
        <Typography variant="body2" sx={{ padding: "10px", color: "#6c757d", fontWeight: "bold" }}>
          POS REPORT
        </Typography>

        {/* Receivable (Dropdown) */}
        <ListItem button onClick={() => setOpenReceivable(!openReceivable)}>
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary="Receivable" />
          {openReceivable ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        {/* Sales History */}
        <ListItem button>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Sales History" />
        </ListItem>
      </List>
      </ThemeProvider>
    </Drawer>
  );
};

export default Sidebar;
