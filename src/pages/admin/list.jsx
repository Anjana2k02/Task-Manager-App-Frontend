import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Button, Snackbar, Alert, Slide, Box, Typography,
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { getFetcher, deleteFetcher, enpoints } from '../../utils/axios';

const AdminTable = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, taskId: null });

  // Progress options with colors
  const progressOptions = {
    0: { label: "Pending", color: "#90A4AE", textColor: "#000000", lightBg: "#E3F2FD" },
    1: { label: "Developing", color: "#1976D2", textColor: "#FFFFFF", lightBg: "#90CAF9" },
    2: { label: "Testing", color: "#FB8C00", textColor: "#FFFFFF", lightBg: "#FFB74D" },
    3: { label: "Q/A Complete", color: "#8E24AA", textColor: "#FFFFFF", lightBg: "#E1A7D3" },
    4: { label: "Completed", color: "#388E3C", textColor: "#FFFFFF", lightBg: "#A5D6A7" },
  };

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getFetcher(enpoints.task.viewAll);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const confirmDelete = (taskId) => {
    setDeleteDialog({ open: true, taskId });
  };

  const handleDeleteConfirmed = async () => {
    const taskId = deleteDialog.taskId;
    try {
      await deleteFetcher(enpoints.task.delete.replace('{id}', taskId));
      await fetchTasks(); // Refresh the task list after deletion
      setSnackbar({ open: true, message: 'Task deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error deleting task:', error);
      setSnackbar({ open: true, message: 'Failed to delete task.', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, taskId: null });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Task List</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>T no</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.t_no}</TableCell>
                <TableCell>{task.task}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  {progressOptions[task.progress] ? (
                    <Box
                      sx={{
                        backgroundColor: progressOptions[task.progress].lightBg,
                        color: progressOptions[task.progress].textColor,
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontWeight: 500,
                        textAlign: "center",
                        display: "inline-block",
                        minWidth: "90px",
                      }}
                    >
                      {progressOptions[task.progress].label}
                    </Box>
                  ) : (
                    "Unknown"
                  )}
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => confirmDelete(task.id)}>
                    <Delete />
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
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, taskId: null })}
      >
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
    </Box>
  );
};

export default AdminTable;
