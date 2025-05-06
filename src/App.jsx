import React, { useState, useEffect } from "react";
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
          <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f4f4f4" }}>
            <Sidebarmain />
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Header />
              <Paths />
            </Box>
          </Box>
        </PrivateRoute>
      )}
    </Router>
  );
}

export default App;







// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/dashboard/sidebar";
// import Login from "./pages/auth/login";
// import PrivateRoute from "./components/privateRoute"

// const Paths = () => {
//   return (
//     <Routes>
//       {/* Public Route */}
//       <Route path="/login" element={<Login />} />

//       {/* Protected Route */}
//       <Route
//         path="/dashboard"
//         element={
//           <PrivateRoute>
//             {/* <DashboardLayout> */}
//               <Dashboard />
//             {/* </DashboardLayout> */}
//           </PrivateRoute>
//         }
//       />

//       {/* Fallback route */}
//       <Route path="*" element={<Login />} />
//     </Routes>
//   );
// };

// export default Paths;
