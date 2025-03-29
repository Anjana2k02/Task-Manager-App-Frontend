import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";


// Lazy load components

const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));
const AdminDashboard = lazy(() => import("../pages/admin/admindashboard"));
const TaskReassignList = lazy(() => import("../pages/admin/requestlist"));
const RequestForm = lazy(() => import("../pages/admin/requestcreate"));
const RequestUpdate = lazy(() => import("../pages/admin/requestupdate"));
const RequestDelete = lazy(() => import("../pages/admin/requestdelete"));


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
        <Route path="/users" element={< UserList/>} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/manage" element={<UserManage />} />


        {/* admin */}
        <Route path="/admin/admindaashboard" element={<AdminDashboard />} /> 
        <Route path="/admin/requestlist" element={<TaskReassignList />} /> 
        <Route path="/admin/requestcreate" element={<RequestForm />} />
        <Route path="/admin/requestupdate" element={<RequestUpdate />} />
        <Route path="/admin/requestdelete" element={<RequestDelete />} />

        {/* superviso */}


        {/* worker */}


        {/* tesing */}

      </Routes>
    </Suspense>
  );
}
