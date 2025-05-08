

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { AssignmentTurnedIn } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enpoints, postFetcher } from "../../utils/axios";

// ✅ Sample list of users for dropdown
const users = [
  { id: 'user1', name: 'Alice Johnson' },
  { id: 'user2', name: 'Bob Smith' },
  { id: 'user3', name: 'Charlie Brown' },
];

// ✅ Yup validation schema — includes assignedUser
const schema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  description: yup.string().required("Task description is required"),
  dueDate: yup.date().required("Due date is required"),
  priority: yup
    .number()
    .typeError("Priority must be selected")
    .oneOf([1, 2, 3], "Select a valid priority")
    .required("Priority is required"),
  assignedUser: yup.string().required("Assigned user is required"),
});

export default function TaskCreate() {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignedUser: "",
    },
  });

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      adminId: "Fire123456",
      progress: 0,
      userId: data.assignedUser, // Optional: map assignedUser into userId here
      supervisorId: "",
    };

    try {
      await postFetcher(enpoints.task.create, taskData);
      reset();
      setSnackbar({
        open: true,
        message: "Task created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("API Error:", error);
      setSnackbar({
        open: true,
        message: "Failed to create task. Please try again.",
        severity: "error",
      });
      setError("apiError", { message: "Failed to create task" });
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: "12px",
          border: "2px solid #2196f3",
          background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
          transition: "0.3s",
          "&:hover": { boxShadow: 8 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <AssignmentTurnedIn color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={600} color="primary.dark">
            Create New Task
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Task Title"
                fullWidth
                required
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                multiline
                rows={4}
                fullWidth
                required
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Due Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                {...register("dueDate")}
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.priority}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  label="Priority"
                  defaultValue=""
                  {...register("priority")}
                >
                  <MenuItem value={1}>🔥 Critical</MenuItem>
                  <MenuItem value={2}>⚠️ High</MenuItem>
                  <MenuItem value={3}>✅ Standard</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.priority?.message}
                </Typography>
              </FormControl>
            </Grid>

            {/* ✅ Assigned User Dropdown Field */}
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.assignedUser}>
                <InputLabel id="assigned-user-label">Assigned User</InputLabel>
                <Select
                  labelId="assigned-user-label"
                  label="Assigned User"
                  defaultValue=""
                  {...register("assignedUser")}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="caption" color="error">
                  {errors.assignedUser?.message}
                </Typography>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              background: "linear-gradient(45deg, #42a5f5, #1e88e5)",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}