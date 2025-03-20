import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  typography: {
    fontFamily: `'Catamaran', sans-serif`,
    h1: { fontSize: "2.5rem", fontWeight: "bold", color: "#0D47A1" },
    h2: { fontSize: "2rem", fontWeight: "bold", color: "#1565C0" },
    h3: { fontSize: "1.75rem", fontWeight: "bold", color: "#1976D2" },
    h4: { fontSize: "1.5rem", fontWeight: "bold", color: "#1E88E5" },
    h5: { fontSize: "1.25rem", fontWeight: "bold", color: "#42A5F5" },
    h6: { fontSize: "1rem", fontWeight: "bold", color: "#64B5F6" },
    body1: { fontSize: "1rem", color: "#333", lineHeight: 1.6 },
    body2: { fontSize: "0.9rem", color: "#6c757d", lineHeight: 1.5 },
    button: { fontWeight: "bold", textTransform: "none", fontSize: "1rem" },
  },

  palette: {
    primary: {
      main: "#1976D2", // Main primary color
      light: "#63a4ff", // Lighter shade
      dark: "#004ba0", // Darker shade
    },
    secondary: {
      main: "#FF4081",
      light: "#ff79b0",
      dark: "#c60055",
    },
    background: {
      default: "#F4F4F4", // Light ash background
      paper: "#FFFFFF", // Paper background for components like cards
    },
    text: {
      primary: "#0D47A1", // Primary text color
      secondary: "#757575", // Secondary text color
      disabled: "#BDBDBD", // Disabled text color
    },
  },

  spacing: 8, // Defines default spacing unit (px)

  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: "8px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.14)",
          padding: "16px",
          marginBottom: "16px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          padding: "10px 24px",
          fontSize: "1rem",
          fontWeight: "bold",
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#E3F2FD",
            color: "#1976D2",
          },
          "&:hover": {
            backgroundColor: "#BBDEFB",
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "1rem",
          fontWeight: "500",
          color: "#0D47A1",
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "#1565C0",
          minWidth: '36px', // Reduce the default gap
          display: 'flex',
          alignItems: 'center', // Ensure vertical alignment
          justifyContent: 'center',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#BDBDBD",
          margin: "8px 0",
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        },
      },
    },

    // ✅ ICON CUSTOMIZATION: Reduce size & change color
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '20px', // Adjusted icon size
          color: '#6c757d', // Default icon color
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: "14px",
        },
      },
    },
  },
});

export default customTheme;
