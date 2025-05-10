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
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { getFetcher, postFetcher, deleteFetcher, getFetcherPramspdf, enpoints } from "../../utils/axios";

const AdminTable = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
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

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(0);

    const filtered = tasks.filter((task) =>
      task.t_no.toString().includes(value)
    );
    setFilteredTasks(filtered);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const confirmDelete = (taskId) => {
    setDeleteDialog({ open: true, taskId });
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteFetcher(enpoints.task.delete.replace("{id}", deleteDialog.taskId));
      setTasks((prev) => prev.filter((task) => task.id !== deleteDialog.taskId));
      setFilteredTasks((prev) => prev.filter((task) => task.id !== deleteDialog.taskId));
      setSnackbar({ open: true, message: "Task deleted successfully!", severity: "success" });
    } catch (error) {
      console.error("Error deleting task:", error);
      setSnackbar({ open: true, message: "Failed to delete task. Please try again.", severity: "error" });
    } finally {
      setDeleteDialog({ open: false, taskId: null });
    }
  };

  const downloadPDF = async () => {
    try {
      setSnackbar({ open: true, message: "Generating report...", severity: "info" });

      const response = await getFetcherPramspdf(enpoints.task.report);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Task_Report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSnackbar({ open: true, message: "Report downloaded successfully", severity: "success" });
    } catch (error) {
      console.error("Download error:", error);
      setSnackbar({ open: true, message: "Failed to download report. Please try again.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>

      {/* Search */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <TextField
          placeholder="Search by Task Number"
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
            Download Report
          </Button>
          <IconButton color="primary" onClick={() => setFilteredTasks(tasks)}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Task Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Task Number</TableCell>
              <TableCell align="center">Task</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Progress</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <TableRow key={task.id}>
                <TableCell align="center">{task.t_no}</TableCell>
                <TableCell align="center">{task.task}</TableCell>
                <TableCell align="center">{task.description}</TableCell>
                <TableCell align="center">{task.progress}</TableCell>
                <TableCell align="center">
                  <IconButton color="error" onClick={() => confirmDelete(task.id)}>
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, taskId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this task?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, taskId: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminTable;
