import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import User from "../pages/user/user";
import Supervisor from "../pages/supervisor/supervisor";

// Lazy load components

const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));


const SupervisorList = lazy(() => import("../pages/supervisor/supervisor"));
const SupervisorCreate = lazy(() => import("../pages/supervisor/create"));
const SupervisorManage = lazy(() => import("../pages/supervisor/manage"));





const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <CircularProgress />
  </Box>
);

export default function Paths() { // Make sure the function name matches the export
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* user  */}
        <Route path="/user/list" element={< UserList/>} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/manage" element={<UserManage />} />


        {/* admin */}


        {/* supervisor */}
        <Route path="/supervisor/list" element={< SupervisorList/>} />
        <Route path="/supervisor/create" element={<SupervisorCreate />} />
        <Route path="/supervisor/manage" element={<SupervisorManage />} />



        {/* worker */}


        {/* tesing */}

      </Routes>
    </Suspense>
  );
}
