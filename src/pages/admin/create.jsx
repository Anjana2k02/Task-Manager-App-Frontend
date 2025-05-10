import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Autocomplete,
  useTheme,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AssignmentTurnedIn } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";

export default function TaskCreate() {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    taskTitle: "",
    description: "",
    startDate: "",
    dueDate: "",
    priority: "",
    attachment: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskTitle.trim())
      newErrors.taskTitle = "Task title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    if (!formData.priority) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const payload = new FormData();
      payload.append("taskTitle", formData.taskTitle);
      payload.append("description", formData.description);
      payload.append("startDate", formData.startDate);
      payload.append("dueDate", formData.dueDate);
      payload.append("priority", formData.priority);
      if (formData.attachment) {
        payload.append("attachment", formData.attachment);
      }

      const response = await postFetcher(enpoints.task.create, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Task created:", response);
      setSuccessMessage("Task created successfully!");

      setFormData({
        taskTitle: "",
        description: "",
        startDate: "",
        dueDate: "",
        priority: "",
        attachment: null,
      });
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors({ apiError: "Failed to create task. Try again." });
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
      <Container maxWidth="md">
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

              <Grid item xs={12} sm={6}>
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
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="priority"
                  label="Priority"
                  select
                  value={formData.priority}
                  onChange={handleChange}
                  error={!!errors.priority}
                  helperText={errors.priority}
                  fullWidth
                  required
                >
                  <MenuItem value="1">High</MenuItem>
                  <MenuItem value="2">Medium</MenuItem>
                  <MenuItem value="3">Low</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Attachment
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {formData.attachment && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected File: {formData.attachment.name}
                  </Typography>
                )}
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
