import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Button, Snackbar, Alert, Slide, Box, Typography,
  IconButton, TextField, FormControl, InputLabel, Select, MenuItem, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { getFetcher, postFetcher, putFetcher, deleteFetcher, enpoints } from '../../utils/axios';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, taskId: null });

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

  const handleEdit = (task) => setTaskToEdit(task);

  const confirmDelete = (taskId) => {
    setDeleteDialog({ open: true, taskId });
  };

  const handleDeleteConfirmed = async () => {
    const taskId = deleteDialog.taskId;
    try {
      await deleteFetcher(`${enpoints.task.delete.replace('{id}', taskId)}`);
      await fetchTasks(); // Refresh list after delete
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
      <Typography variant="h5" gutterBottom>Task Overview</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(task)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => confirmDelete(task.id)}><Delete /></IconButton>
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

      {taskToEdit && (
        <TaskForm
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          fetchTasks={fetchTasks} // Pass fetchTasks directly to refresh list after save
          setSnackbar={setSnackbar}
        />
      )}
    </Box>
  );
};

const TaskForm = ({ taskToEdit, setTaskToEdit, fetchTasks, setSnackbar }) => {
  const [formData, setFormData] = useState(taskToEdit || {
    title: '',
    description: '',
    dueDate: '',
    priority: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        // Update existing task
        await putFetcher(`${enpoints.task.update.replace('{id}', taskToEdit.id)}`, formData);
        setSnackbar({ open: true, message: 'Task updated successfully!', severity: 'success' });
      } else {
        // Create a new task
        await postFetcher(enpoints.task.create, formData);
        setSnackbar({ open: true, message: 'Task created successfully!', severity: 'success' });
      }
      await fetchTasks(); // Refresh list after create/update
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error saving task:', error);
      setSnackbar({ open: true, message: 'Failed to save task.', severity: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">{taskToEdit ? 'Edit Task' : 'Create Task'}</Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth required sx={{ mb: 2 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          label="Priority"
        >
          <MenuItem value={1}>High</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Low</MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : (taskToEdit ? 'Update Task' : 'Create Task')}
      </Button>
    </Box>
  );
};

export default TaskTable;
