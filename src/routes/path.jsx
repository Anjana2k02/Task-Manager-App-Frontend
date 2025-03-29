import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import User from "../pages/user/user";
import Worker from "../pages/worker/worker";

// Lazy load components

const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));
const AdminDashboard = lazy(() => import("../pages/adminDashboard/admin-view"));

const WorkerList = lazy(() => import("../pages/worker/worker"));
const WorkerCreate = lazy(() => import("../pages/worker/create"));
const WorkerManage = lazy(() => import("../pages/worker/manage"));



const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <CircularProgress />
  </Box>
);

export default function Paths() { // Make sure the function name matches the export
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* user  */}
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/manage" element={<UserManage />} />


        {/* admin */}


        {/* superviso */}


        {/* worker */}
        <Route path="/worker/list" element={<WorkerList />} />
        <Route path="/worker/create" element={<WorkerCreate />} />
        <Route path="/worker/manage" element={<WorkerManage />} />


        {/* tesing */}

      </Routes>
    </Suspense>
  );
}
