import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";


import User from "../pages/user/user";
import Supervisor from "../pages/supervisor/supervisor";
import Worker from "../pages/worker/worker";


// Lazy load components

const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));


const WorkerList = lazy(() => import("../pages/worker/worker"));
const WorkerCreate = lazy(() => import("../pages/worker/create"));
const WorkerManage = lazy(() => import("../pages/worker/manage"));


const AdminDashboard2 = lazy(() => import("../pages/adminDashboard/admin-view"));
const AdminDashboard = lazy(() => import("../pages/admin/admindashboard"));
const TaskReassignList = lazy(() => import("../pages/admin/requestlist"));
const RequestForm = lazy(() => import("../pages/admin/requestcreate"));
const RequestUpdate = lazy(() => import("../pages/admin/requestupdate"));
const RequestDelete = lazy(() => import("../pages/admin/requestdelete"));



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

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* user  */}
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/manage" element={<UserManage />} />


        {/* admin */}
        <Route path="/admin/admindaashboard" element={<AdminDashboard2 />} /> 
        <Route path="/admin/requestlist" element={<TaskReassignList />} /> 
        <Route path="/admin/requestcreate" element={<RequestForm />} />
        <Route path="/admin/requestupdate" element={<RequestUpdate />} />
        <Route path="/admin/requestdelete" element={<RequestDelete />} />

        {/* supervisor */}
        <Route path="/supervisor/list" element={< SupervisorList/>} />
        <Route path="/supervisor/create" element={<SupervisorCreate />} />
        <Route path="/supervisor/manage" element={<SupervisorManage />} />



        {/* worker */}
        <Route path="/worker/list" element={<WorkerList />} />
        <Route path="/worker/create" element={<WorkerCreate />} />
        <Route path="/worker/manage" element={<WorkerManage />} />


        {/* tesing */}

      </Routes>
    </Suspense>
  );
}
