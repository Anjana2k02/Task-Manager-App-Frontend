import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

const RequestDelete = () => {
  // State for managing the delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // Function to open the delete confirmation dialog
  const handleDeleteClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  // Function to close the delete confirmation dialog
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };

  // Function to handle task deletion
  const handleDeleteConfirm = () => {
    // Logic to delete task goes here
    console.log('Task deleted');
    setOpenDeleteDialog(false);  // Close dialog after deletion
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Reassign Task</Typography>

      {/* Your other task reassign form fields here */}
      
      {/* Button to trigger delete confirmation dialog */}
      <Button 
        variant="contained" 
        color="error" 
        onClick={handleDeleteClickOpen}>
        Delete Task
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"  // Small rectangle shape
        fullWidth={false}  // Prevents stretching to full width
        PaperProps={{
          style: {
            width: '300px', // Small width
            height: '200px', // Small height
            margin: 'auto',  // Center the dialog
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" align="center">Delete Request</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <Typography variant="body1">
            Are you sure you want to delete this task reassign form request? You can't undo this action.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RequestDelete;