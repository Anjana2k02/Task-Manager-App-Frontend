import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const Calender = lazy(() => import("../pages/calender/calender"));

const AuthController = lazy(() => import("../components/privateRoute"));
const UserList = lazy(() => import("../pages/user/user"));
const UserCreate = lazy(() => import("../pages/user/create"));
const UserManage = lazy(() => import("../pages/user/manage"));

const WorkerList = lazy(() => import("../pages/worker/list"));
const WorkerCreate = lazy(() => import("../pages/worker/create"));
const WorkerManage = lazy(() => import("../pages/worker/manage"));
const WorkerProfile = lazy(() => import("../pages/worker/workerprofile"));
const WorkerHome = lazy(() => import("../pages/worker/workerhome"));
const WorkerTask = lazy(() => import("../pages/worker/tasklist"));

const MyTaskList = lazy(() => import("../pages/myTask/list"));
const MyTaskOverview = lazy(() => import("../pages/myTask/overview"));

const AdminList = lazy(() => import("../pages/admin/list"));
const AdminCreate = lazy(() => import("../pages/admin/create"));
const AdminManage = lazy(() => import("../pages/admin/manage"));
// const AdminuserManagement = lazy(() => import("../pages/admin/userManagement"));
const AdminHome = lazy(() => import("../pages/admin/adminHome"));


const SupervisorList = lazy(() => import("../pages/supervisor/list"));
const SupervisorCreate = lazy(() => import("../pages/supervisor/create"));
const SupervisorManage = lazy(() => import("../pages/supervisor/manage"));
const Supervisorworkerlist = lazy(() => import("../pages/supervisor/workerlist"));
const SupervisorHome = lazy(() => import("../pages/supervisor/supervisorhome"));

const TaskList = lazy(() => import("../pages/task/list"));
const TaskCreate = lazy(() => import("../pages/task/create"));
const TaskManage = lazy(() => import("../pages/task/manage"));

const TaskdiList = lazy(() => import("../pages/taskdividing/list"));
const TaskdiCreate = lazy(() => import("../pages/taskdividing/create"));
const TaskdiManage = lazy(() => import("../pages/taskdividing/manage"));

const CalenderView = lazy(() => import("../pages/calender/calender"));

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
          <Route path="/admin/list" element={<AdminList />} />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/manage" element={<AdminManage />} />
         {/*<Route path="/admin/userManagement" element={<AdminuserManagement />} />*/}
          <Route path="/admin/adminHome" element={<AdminHome />} />

          {/* User Routes */}
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/create" element={<UserCreate />} />
          <Route path="/user/manage" element={<UserManage />} />

          {/* Supervisor Routes */}
          <Route path="/supervisor/list" element={<SupervisorList />} />
          <Route path="/supervisor/create" element={<SupervisorCreate />} />
          <Route path="/supervisor/manage" element={<SupervisorManage />} />
          <Route path="/supervisor/workerlist"element={<Supervisorworkerlist/>} />
          <Route path="/supervisor/supervisorhome" element={<SupervisorHome />} />

          {/* Worker Routes */}
          <Route path="/worker/list" element={<WorkerList />} />
          <Route path="/worker/create" element={<WorkerCreate />} />
          <Route path="/worker/manage" element={<WorkerManage />} />
          <Route path="/worker/workerprofile" element={<WorkerProfile />} />
          <Route path="/worker/workerhome" element={<WorkerHome />} />
          <Route path="/worker/workertask" element={<WorkerTask />} />


          {/* Task Routes */}
          <Route path="/task/list" element={<TaskList />} />
          <Route path="/task/create" element={<TaskCreate />} />
          <Route path="/task/manage" element={<TaskManage />} />

          {/* my task */}
          <Route path="/task/my-task-list" element={<MyTaskList />} />
          <Route path="/task/my-task-overview" element={<MyTaskOverview />} />

          {/* Auth Controller */}

          {/* Task Dividing Routes */}
          <Route path="/taskdi/list" element={<TaskdiList />} />
          <Route path="/taskdi/create" element={<TaskdiCreate />} />
          <Route path="/taskdi/manage" element={<TaskdiManage />} />

          {/* Calendar Route */}
          <Route path="/calender/view" element={<CalenderView />} />

          {/* Auth Controller */}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}



