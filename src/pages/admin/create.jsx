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

// ✅ Yup validation schema
const schema = yup.object().shape({
  projectTitle: yup.string().required("Project title is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start date is required"),
  dueDate: yup
    .date()
    .min(yup.ref("startDate"), "Due date must be after start date")
    .required("Due date is required"),
  priority: yup
    .number()
    .typeError("Priority must be selected")
    .oneOf([1, 2, 3], "Select a valid priority")
    .required("Priority is required"),
  attachment: yup
    .mixed()
    .test("fileSize", "File size is too large", (value) => {
      return !value || (value && value.size <= 5 * 1024 * 1024); // 5MB limit
    })
    .test("fileType", "Unsupported file format", (value) => {
      return (
        !value ||
        (value &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value.type))
      );
    }),
});

export default function ProjectCreate() {
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
      projectTitle: "",
      description: "",
      startDate: "",
      dueDate: "",
      priority: "",
      attachment: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("projectTitle", data.projectTitle);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("dueDate", data.dueDate);
    formData.append("priority", data.priority);
    if (data.attachment) {
      formData.append("attachment", data.attachment[0]);
    }

    try {
      await postFetcher(enpoints.project.create, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      reset();
      setSnackbar({
        open: true,
        message: "Project created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("API Error:", error);
      setSnackbar({
        open: true,
        message: "Failed to create project. Please try again.",
        severity: "error",
      });
      setError("apiError", { message: "Failed to create project" });
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
            Create New Project
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Project Title"
                fullWidth
                required
                {...register("projectTitle")}
                error={!!errors.projectTitle}
                helperText={errors.projectTitle?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
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
                label="Start Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                {...register("startDate")}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
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
                  {...register("attachment")}
                />
              </Button>
              <Typography variant="caption" color="error">
                {errors.attachment?.message}
              </Typography>
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
            {isSubmitting ? "Creating..." : "Create Project"}
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