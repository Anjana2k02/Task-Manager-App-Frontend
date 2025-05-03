import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

// Lazy-loaded pages
const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));

const WorkerList = lazy(() => import("../pages/worker/list"));
const WorkerCreate = lazy(() => import("../pages/worker/create"));
const WorkerManage = lazy(() => import("../pages/worker/manage"));

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

const TaskdiList = lazy(() => import("../pages/taskdividing/list"));
const TaskdiCreate = lazy(() => import("../pages/taskdividing/create"));
const TaskdiManage = lazy(() => import("../pages/taskdividing/manage"));

// Loading fallback component
const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <h1>Something went wrong.</h1>
          <p>Please try refreshing the page or come back later.</p>
        </Box>
      );
    }

    return this.props.children;
  }
}

// Main routing component
export default function Paths() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/requestlist" element={<TaskReassignList />} />
          <Route path="/admin/requestcreate" element={<RequestForm />} />
          <Route path="/admin/requestupdate" element={<RequestUpdate />} />
          <Route path="/admin/requestdelete" element={<RequestDelete />} />

          {/* User Routes */}
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/manage" element={<UserManage />} />

          {/* Supervisor Routes */}
          <Route path="/supervisor/list" element={<SupervisorList />} />
          <Route path="/supervisor/create" element={<SupervisorCreate />} />
          <Route path="/supervisor/manage" element={<SupervisorManage />} />

          {/* Worker Routes */}
          <Route path="/worker/list" element={<WorkerList />} />
          <Route path="/worker/create" element={<WorkerCreate />} />
          <Route path="/worker/manage" element={<WorkerManage />} />

          {/* Task Routes */}
          <Route path="/task/list" element={<TaskList />} />
          <Route path="/task/create" element={<TaskCreate />} />
          <Route path="/task/manage" element={<TaskManage />} />

          {/* Task Dividing Routes */}
          <Route path="/taskdi/list" element={<TaskdiList />} />
          <Route path="/taskdi/create" element={<TaskdiCreate />} />
          <Route path="/taskdi/manage" element={<TaskdiManage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}


//ramneee
