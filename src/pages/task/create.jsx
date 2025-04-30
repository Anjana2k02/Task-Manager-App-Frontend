import { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, Grid } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";

export default function TaskCreate() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    teamLeader: "",
    document: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Task description is required";
    }

    if (!formData.startDate.trim()) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate.trim()) {
      newErrors.endDate = "End date is required";
    }

    if (!formData.priority.trim()) {
      newErrors.priority = "Priority is required";
    }

    if (!formData.teamLeader.trim()) {
      newErrors.teamLeader = "Team leader is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await postFetcher(enpoints.task.create, formDataToSend); // API endpoint for task creation
      console.log("Task created successfully:", response);

      // Show success message
      setSuccessMessage("Task created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        dueDate: "",
        priority: "",
        teamLeader: "",
        document: null,
      });
    } catch (error) {
      console.error("Error creating task:", error);
      setErrors({ apiError: "Failed to create task. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd color="primary" />
          <Typography variant="h5" component="h1">
            Create Task
          </Typography>
        </Box>

        {successMessage && (
          <Typography color="success.main" sx={{ mb: 2 }}>
            {successMessage}
          </Typography>
        )}

        {errors.apiError && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {errors.apiError}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Task Title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                fullWidth
                required
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Task Description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                fullWidth
                required
                margin="normal"
                size="medium"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="startDate"
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                error={!!errors.startDate}
                helperText={errors.startDate}
                fullWidth
                required
                margin="normal"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="endDate"
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                error={!!errors.endDate}
                helperText={errors.endDate}
                fullWidth
                required
                margin="normal"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="dueDate"
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                error={!!errors.dueDate}
                helperText={errors.dueDate}
                fullWidth
                required
                margin="normal"
                size="medium"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="priority"
                label="Priority"
                value={formData.priority}
                onChange={handleChange}
                error={!!errors.priority}
                helperText={errors.priority}
                fullWidth
                required
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="teamLeader"
                label="Team Leader"
                value={formData.teamLeader}
                onChange={handleChange}
                error={!!errors.teamLeader}
                helperText={errors.teamLeader}
                fullWidth
                required
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Document
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </Box>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Please ensure all fields are filled out correctly before submitting the form.
        </Typography>
      </Paper>
    </Container>
  );
}
