import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Assignment } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { postFetcher, enpoints } from "../../utils/axios";

export default function TaskCreate() {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    assignedUser: "",
    priority: "",
    dueDate: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users for assignment dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

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

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dueDate: date,
    }));

    if (errors.dueDate) {
      setErrors((prev) => ({
        ...prev,
        dueDate: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskTitle.trim()) newErrors.taskTitle = "Task title is required";
    if (!formData.taskDescription.trim()) newErrors.taskDescription = "Description is required";
    if (!formData.assignedUser) newErrors.assignedUser = "Please assign a user";
    if (!formData.priority) newErrors.priority = "Please select priority";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    else if (dayjs(formData.dueDate).isBefore(dayjs(), 'day')) {
      newErrors.dueDate = "Due date cannot be in the past";
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
      const payload = {
        ...formData,
        dueDate: dayjs(formData.dueDate).toISOString(),
      };

      const response = await postFetcher(enpoints.task.create, payload);
      console.log("Task created:", response);
      setSuccessMessage("Task created successfully!");

      // Reset form
      setFormData({
        taskTitle: "",
        taskDescription: "",
        assignedUser: "",
        priority: "",
        dueDate: null,
      });
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors({ apiError: "Failed to create task. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <Assignment color="primary" />
            <Typography variant="h5">Create New Task  - T01 </Typography>
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
                  name="taskTitle"
                  label="Task Title"
                  value={formData.taskTitle}
                  onChange={handleChange}
                  error={!!errors.taskTitle}
                  helperText={errors.taskTitle}
                  fullWidth
                  required
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="taskDescription"
                  label="Task Description"
                  value={formData.taskDescription}
                  onChange={handleChange}
                  error={!!errors.taskDescription}
                  helperText={errors.taskDescription}
                  fullWidth
                  required
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  options={users}
                  getOptionLabel={(user) => user.name || user.email}
                  value={users.find(user => user.id === formData.assignedUser) || null}
                  onChange={(e, newValue) => {
                    setFormData(prev => ({
                      ...prev,
                      assignedUser: newValue ? newValue.id : ""
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assign To"
                      error={!!errors.assignedUser}
                      helperText={errors.assignedUser}
                      required
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  name="priority"
                  label="Priority"
                  value={formData.priority}
                  onChange={handleChange}
                  error={!!errors.priority}
                  helperText={errors.priority}
                  fullWidth
                  required
                  margin="normal"
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={handleDateChange}
                  minDate={dayjs()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      required
                      error={!!errors.dueDate}
                      helperText={errors.dueDate}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}