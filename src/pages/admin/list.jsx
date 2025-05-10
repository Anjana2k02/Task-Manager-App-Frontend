import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Button, Snackbar, Alert, Slide, Box, Typography,
  IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getFetcher, deleteFetcher, putFetcher, enpoints } from '../../utils/axios';

const AdminTable = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, projectId: null });

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const data = await getFetcher(enpoints.project.viewAll);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const confirmDelete = (projectId) => {
    setDeleteDialog({ open: true, projectId });
  };

  const handleDeleteConfirmed = async () => {
    const projectId = deleteDialog.projectId;
    try {
      await deleteFetcher(`${enpoints.project.delete.replace('{id}', projectId)}`);
      await fetchProjects(); // Refresh list after delete
      setSnackbar({ open: true, message: 'Project deleted successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error deleting project:', error);
      setSnackbar({ open: true, message: 'Failed to delete project.', severity: 'error' });
    } finally {
      setDeleteDialog({ open: false, projectId: null });
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getFetcher(enpoints.task.viewAll);
      setTasks(data);
      console.log('Tasks:', data);
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.t_no}</TableCell>
                <TableCell>{project.task}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.progress}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => confirmDelete(project.id)}><Delete /></IconButton>
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
        onClose={() => setDeleteDialog({ open: false, projectId: null })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this project?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, projectId: null })} color="primary">
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
