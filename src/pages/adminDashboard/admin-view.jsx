import React from 'react';
import { createRoot } from "react-dom/client"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import AdminViewDetails from './admin-view-details';


// Create a white theme
const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    primary: {
      main: "#1976d2",
    },
  },
})

export default function AdminView() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminViewDetails />
    </ThemeProvider>
  );
}
