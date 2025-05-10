import React, { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import { AssignmentTurnedIn } from "@mui/icons-material";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enpoints, getFetcher, postFetcher } from "../../utils/axios";

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
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      assignedUser: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = methods;

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [workers, setWorkers] = useState([]); // State to hold the list of users
  const [task, settask] = useState([]); // State to hold the list of tasks

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      adminId: "Fire123456",
      progress: 0,
      userId: data.assignedUser,
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getFetcher(enpoints.worker.viewAll);
        setWorkers(data);
        console.log('worker list', data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getFetcher(enpoints.task.viewAll);
        const filteredData = data.filter(task => task.supervisorId === "");
        settask(filteredData)
       // settask(data);
        console.log('task list', data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskSelect = (e, selectedTask) => {
    if (selectedTask) {
      // Set the values for description, dueDate, and other fields based on the selected task
      setValue("description", selectedTask.description);
      setValue("dueDate", selectedTask.dueDate); // Populate dueDate field
    }
  };

  return (
    <FormProvider {...methods}>
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
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      fullWidth
                      options={task}
                      getOptionLabel={(option) =>
                        option.t_no && option.task ? `${option.t_no} - ${option.task}` : ""
                      }
                      onChange={(e, value) => {
                        field.onChange(value?.task || "");
                        setValue("description", value?.description || "");
                        setValue("dueDate", value?.dueDate || ""); // Populate dueDate when task is selected
                      }}
                      renderOption={(props, option) => (
                        <li {...props}>
                          <Box>
                            <Typography fontWeight={600}>
                              {option.t_no} - {option.task}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {option.description}
                            </Typography>
                          </Box>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Task Title"
                          error={!!errors.title}
                          helperText={errors.title?.message}
                        />
                      )}
                    />
                  )}
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

              <Grid item xs={12}>
                <Controller
                  name="assignedUser"
                  control={control}
                  rules={{ required: "User is required" }}
                  render={({ field }) => (
                    <Autocomplete
                      fullWidth
                      options={workers}
                      getOptionLabel={(option) =>
                        `${option.firstName} ${option.lastName}`
                      }
                      onChange={(e, value) => field.onChange(value?.id || "")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assigned User"
                          error={!!errors.assignedUser}
                          helperText={errors.assignedUser?.message}
                        />
                      )}
                    />
                  )}
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
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </FormProvider>
  );
}
