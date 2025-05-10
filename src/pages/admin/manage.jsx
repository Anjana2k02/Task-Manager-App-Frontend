import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getFetcher, postFetcher, deleteFetcher, enpoints, getFetcherPramspdf } from "../../utils/axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#e3f2fd",
    },
  },
});

const AdminTaskManage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editDialog, setEditDialog] = useState({ open: false, task: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, taskId: null });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetcher(enpoints.task.viewAll);
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(0);

    if (newValue === 0) {
      setFilteredTasks(tasks);
    } else if (newValue === 1) {
      setFilteredTasks(tasks.filter((task) => task.status === "Completed"));
    } else if (newValue === 2) {
      setFilteredTasks(tasks.filter((task) => task.status === "In Progress"));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredTasks(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadPDF = async () => {
    try {
      setSnackbar({
        open: true,
        message: "Generating report...",
        severity: "info",
      });

      const response = await getFetcherPramspdf(enpoints.task.report);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Task_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSnackbar({
        open: true,
        message: "Report downloaded successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Download error:", error);
      setSnackbar({
        open: true,
        message: "Failed to download report. Please try again.",
        severity: "error",
      });
    }
  };

  const handleEditTask = (task) => {
    setEditDialog({ open: true, task });
  };

  const handleDeleteTask = (taskId) => {
    setDeleteDialog({ open: true, taskId });
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = editDialog.task;
      await postFetcher(`${enpoints.task.update}/${updatedTask.id}`, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setFilteredTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setSnackbar({
        open: true,
        message: "Task updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating task:", error);
      setSnackbar({
        open: true,
        message: "Failed to update task. Please try again.",
        severity: "error",
      });
    } finally {
      setEditDialog({ open: false, task: null });
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFetcher(`${enpoints.task.delete}/${deleteDialog.taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== deleteDialog.taskId));
      setFilteredTasks((prev) =>
        prev.filter((task) => task.id !== deleteDialog.taskId)
      );
      setSnackbar({
        open: true,
        message: "Task deleted successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete task. Please try again.",
        severity: "error",
      });
    } finally {
      setDeleteDialog({ open: false, taskId: null });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "24px" }}>
        {/* Task Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 2, borderRadius: 2, height: "100%" }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <AssignmentIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    All Tasks
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                    {tasks.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 2, borderRadius: 2, height: "100%" }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ fontSize: 40, color: "#2e7d32", mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    Completed Tasks
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                    {tasks.filter((task) => task.status === "Completed").length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ boxShadow: 2, borderRadius: 2, height: "100%" }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <HourglassEmptyIcon sx={{ fontSize: 40, color: "#f57f17", mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">
                    In Progress Tasks
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#f57f17" }}>
                    {tasks.filter((task) => task.status === "In Progress").length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs for Task Categories */}
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="All Tasks" />
          <Tab label="Completed Tasks" />
          <Tab label="In Progress Tasks" />
        </Tabs>

        {/* Search and Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 300, backgroundColor: "white", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPDF}>
              Download
            </Button>
            <Button variant="outlined" startIcon={<FilterListIcon />}>
              Filter
            </Button>
            <IconButton color="primary">
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Task Table */}
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2, boxShadow: 3 }}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="task table">
              <TableHead>
                <TableRow>
                  {["Title", "Start Date", "Due Date", "Priority", "Actions"].map((head, index) => (
                    <TableCell key={index} align="center" sx={{ fontWeight: "bold" }}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, idx) => (
                  <TableRow key={task.id || idx}>
                    <TableCell align="center">{task.title}</TableCell>
                    <TableCell align="center">{task.startDate}</TableCell>
                    <TableCell align="center">{task.dueDate}</TableCell>
                    <TableCell align="center">{task.priority}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEditTask(task)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDeleteTask(task.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* Edit Task Dialog */}
        <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, task: null })}>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="dense"
              value={editDialog.task?.title || ""}
              onChange={(e) =>
                setEditDialog((prev) => ({
                  ...prev,
                  task: { ...prev.task, title: e.target.value },
                }))
              }
            />
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={editDialog.task?.startDate || ""}
              onChange={(e) =>
                setEditDialog((prev) => ({
                  ...prev,
                  task: { ...prev.task, startDate: e.target.value },
                }))
              }
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              value={editDialog.task?.dueDate || ""}
              onChange={(e) =>
                setEditDialog((prev) => ({
                  ...prev,
                  task: { ...prev.task, dueDate: e.target.value },
                }))
              }
            />
            <TextField
              label="Priority"
              fullWidth
              margin="dense"
              value={editDialog.task?.priority || ""}
              onChange={(e) =>
                setEditDialog((prev) => ({
                  ...prev,
                  task: { ...prev.task, priority: e.target.value },
                }))
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ open: false, task: null })} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateTask} color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Task Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, taskId: null })}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog({ open: false, taskId: null })} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Notifications */}
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default AdminTaskManage;
