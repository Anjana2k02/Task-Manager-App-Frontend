import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AssignmentTurnedIn } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
taskTitle: Yup.string().required("Task title is required"),
description: Yup.string().required("Description is required"),
});

export default function TaskCreate() {
  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const payload = {
        adminId: "string",
        task: formData.taskTitle,
        description: formData.description,
        dueDate: "2025-05-10",
        priority: 0,
        supervisorId: "string",
        userId: "string",
        progress: 0,
      };

      const response = await postFetcher(enpoints.task.create, payload);
      console.log("Task created:", response);
      setSuccessMessage("Task created successfully!");

      setFormData({
        taskTitle: "",
        description: "",
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error creating task:", err);
        setErrors({ apiError: "Failed to create task. Try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #2193b0, #6dd5ed)",
        py: 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: "#ffffffdd",
            backdropFilter: "blur(8px)",
          }}
        >
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <AssignmentTurnedIn color="primary" />
            <Typography variant="h4" fontWeight="bold">
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="taskTitle"
                  label="Task Title"
                  value={formData.taskTitle}
                  onChange={handleChange}
                  error={!!errors.taskTitle}
                  helperText={errors.taskTitle}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                py: 1.5,
                background: "linear-gradient(to right, #2193b0, #6dd5ed)",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
