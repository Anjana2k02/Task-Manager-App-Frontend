import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

// Lazy load components
const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));

const WorkerList = lazy(() => import("../pages/worker/list"));
const WorkerCreate = lazy(() => import("../pages/worker/create"));
const WorkerManage = lazy(() => import("../pages/worker/manage"));
const WorkerTable = lazy(() => import("../pages/worker/workertable"));
const WorkerProfile = lazy(() => import("../pages/worker/workerprofile"));
const WorkerLanding = lazy(() => import("../pages/worker/workerlanding"));

const AdminDashboard = lazy(() => import("../pages/admin/admindashboard"));
const TaskReassignList = lazy(() => import("../pages/admin/requestlist"));
const RequestForm = lazy(() => import("../pages/admin/requestcreate"));
const RequestUpdate = lazy(() => import("../pages/admin/requestupdate"));
const RequestDelete = lazy(() => import("../pages/admin/requestdelete"));

const SupervisorList = lazy(() => import("../pages/supervisor/list"));
const SupervisorCreate = lazy(() => import("../pages/supervisor/create"));
const SupervisorManage = lazy(() => import("../pages/supervisor/manage"));

const TaskList = lazy(() => import("../pages/task/list"));
const TaskCreate = lazy(() => import("../pages/task/create")); 
const TaskManage = lazy(() => import("../pages/task/manage"));

const Loading = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <CircularProgress />
  </Box>
);

export default function Paths() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/requestlist" element={<TaskReassignList />} />
        <Route path="/admin/requestcreate" element={<RequestForm />} />
        <Route path="/admin/requestupdate" element={<RequestUpdate />} />
        <Route path="/admin/requestdelete" element={<RequestDelete />} />

        {/* User */}
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/manage" element={<UserManage />} />

        {/* Supervisor */}
        <Route path="/supervisor/list" element={<SupervisorList />} />
        <Route path="/supervisor/create" element={<SupervisorCreate />} />
        <Route path="/supervisor/manage" element={<SupervisorManage />} />

        {/* Worker */}
        <Route path="/worker/list" element={<WorkerList />} />
        <Route path="/worker/create" element={<WorkerCreate />} />
        <Route path="/worker/manage" element={<WorkerManage />} />
        <Route path="/worker/workertable" element={<WorkerTable />} />
        <Route path="/worker/workerprofile" element={<WorkerProfile />} />
        <Route path="/worker/workerlanding" element={<WorkerLanding />} />


        {/* Task */}
        <Route path="/task/list" element={<TaskList />} /> 
        <Route path="/task/create" element={<TaskCreate />} /> 
        <Route path="/task/manage" element={<TaskManage />} /> 

      </Routes>
    </Suspense>
  );
}
