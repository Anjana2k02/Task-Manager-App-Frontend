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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enpoints, postFetcher } from "../../utils/axios";

// ✅ Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  status: yup.boolean().required("Status is required"),
});

export default function SupervisorCreate() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      status: true, // Default to active
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await postFetcher(enpoints.supervisor.create, data);
      console.log("Supervisor created:", response);
      reset();
      alert("Supervisor created successfully!");
    } catch (error) {
      console.error("API Error:", error);
      setError("apiError", {
        message: error?.response?.data?.message || "Failed to create supervisor.",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd color="primary" />
          <Typography variant="h5">Create Supervisor</Typography>
        </Box>

        {errors.apiError && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            {errors.apiError.message}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                required
                margin="normal"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                required
                margin="normal"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                margin="normal"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required margin="normal" error={!!errors.status}>
                <InputLabel id="status-label">Status</InputLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="status-label"
                      label="Status"
                      defaultValue={true}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  )}
                />
                <Typography variant="caption" color="error">
                  {errors.status?.message}
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
            {isSubmitting ? "Creating..." : "Create Supervisor"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
