import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  ListItemText,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function TaskCreate() {
  const [formData, setFormData] = useState({
    taskTitle: "",
    taskDescription: "",
    dueDate: null,
    priority: "",
    assignedUser: "",
    workingStatus: "pending",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(enpoints.user.list);
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.taskTitle.trim()) newErrors.taskTitle = "Title is required";
    if (!formData.taskDescription.trim())
      newErrors.taskDescription = "Description is required";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required";
    if (!formData.priority) newErrors.priority = "Priority is required";
    if (!formData.assignedUser)
      newErrors.assignedUser = "Assigned user is required";

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
        dueDate: formData.dueDate.toISOString(),
      };

      const response = await postFetcher(enpoints.task.create, payload);
      console.log("Task created:", response);
      setSuccessMessage("Task created successfully!");

      setFormData({
        taskTitle: "",
        taskDescription: "",
        dueDate: null,
        priority: "",
        assignedUser: "",
        workingStatus: "pending",
      });
    } catch (err) {
      console.error("Error creating task:", err);
      setErrors({ apiError: "Failed to create task. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd color="primary" />
          <Typography variant="h5">Create New Task</Typography>
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
            {/* Task Title */}
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
                size="medium"
              />
            </Grid>

            {/* Task Description */}
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
                size="medium"
                multiline
                rows={4}
              />
            </Grid>

            {/* Due Date */}
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={(newValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      dueDate: newValue,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                      error={!!errors.dueDate}
                      helperText={errors.dueDate}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* Priority */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={formData.priority}
                  label="Priority"
                  onChange={handleChange}
                  error={!!errors.priority}
                >
                  <MenuItem value="critical">Critical</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="standard">Standard</MenuItem>
                </Select>
                {errors.priority && (
                  <Typography color="error" variant="caption">
                    {errors.priority}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Assigned User */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Assigned User</InputLabel>
                <Select
                  name="assignedUser"
                  value={formData.assignedUser}
                  label="Assigned User"
                  onChange={handleChange}
                  error={!!errors.assignedUser}
                  renderValue={(selected) => {
                    const user = users.find(u => u.id === selected);
                    return user ? `${user.firstName} ${user.secondName}` : '';
                  }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                          {user.firstName.charAt(0)}{user.secondName.charAt(0)}
                        </Avatar>
                        <ListItemText 
                          primary={`${user.firstName} ${user.secondName}`}
                          secondary={user.email}
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.assignedUser && (
                  <Typography color="error" variant="caption">
                    {errors.assignedUser}
                  </Typography>
                )}
              </FormControl>
            </Grid>

           

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 2, py: 1.5 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}