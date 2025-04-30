import React from "react";
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
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enpoints, postFetcher } from "../../utils/axios";

// ✅ Yup validation schema
const schema = yup.object().shape({
  title: yup.string().required("Task title is required"),
  description: yup.string().required("Task description is required"),
  dueDate: yup.date().required("Due date is required"),
  priority: yup
    .number()
    .typeError("Priority must be selected")
    .oneOf([1, 2, 3], "Select a valid priority")
    .required("Priority is required"),
});

export default function TaskCreate() {
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
    },
  });

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      adminId: "Fire123456", // ✅ Hardcoded
      progress: 0,
      userId: "",
      supervisorId: "",
    };

    try {
      const response = await postFetcher(enpoints.task.create, taskData);
      console.log("Task created:", response);
      reset(); // Clear form
      alert("Task created successfully!");
    } catch (error) {
      console.error("API Error:", error);
      setError("apiError", { message: "Failed to create task. Please try again." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd color="primary" />
          <Typography variant="h5">Create Task</Typography>
        </Box>

        {errors.apiError && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {errors.apiError.message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Task Title"
                fullWidth
                required
                margin="normal"
                size="medium"
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
                margin="normal"
                size="medium"
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
                margin="normal"
                size="medium"
                InputLabelProps={{ shrink: true }}
                {...register("dueDate")}
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required margin="normal" error={!!errors.priority}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  label="Priority"
                  defaultValue=""
                  {...register("priority")}
                >
                  <MenuItem value={1}>Critical</MenuItem>
                  <MenuItem value={2}>High</MenuItem>
                  <MenuItem value={3}>Standard</MenuItem>
                </Select>
                <Typography variant="caption" color="error">
                  {errors.priority?.message}
                </Typography>
              </FormControl>
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
  );
}
