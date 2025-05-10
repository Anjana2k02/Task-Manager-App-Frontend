import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Snackbar,
  Alert,
  Slide,
  Autocomplete,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { enpoints, postFetcher } from "../../utils/axios";

// ✅ Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  secondName: yup.string().required("Second name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  country: yup.string().required("Country is required"),
  devType: yup
    .number()
    .typeError("Developer type is required")
    .oneOf([1, 2, 3, 4], "Select a valid developer type")
    .required("Developer type is required"),
});

export default function UserCreate() {
  const [showPassword, setShowPassword] = useState(false);
  const [countries, setCountries] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const devTypes = [
    { label: "Software Developing", value: 1 },
    { label: "Data Analytics", value: 2 },
    { label: "Testing", value: 3 },
    { label: "DevOps", value: 4 },
  ];

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
      secondName: "",
      email: "",
      password: "",
      country: "",
      devType: "",
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const parsed = data
          .map((c) => ({
            name: c.name.common,
            flag: c.flags?.png || "",
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(parsed);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      userType: "worker",
    };

    try {
      await postFetcher(enpoints.user.create, payload);
      reset();
      setSnackbar({
        open: true,
        message: "User created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("API Error:", error);
      setSnackbar({
        open: true,
        message: "Failed to create user. Please try again.",
        severity: "error",
      });
      setError("apiError", { message: "Failed to create user" });
    }
  };

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
          <PersonAdd color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" fontWeight={600} color="primary.dark">
            Create Worker Account
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                required
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Second Name"
                fullWidth
                required
                {...register("secondName")}
                error={!!errors.secondName}
                helperText={errors.secondName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email Address"
                fullWidth
                required
                type="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                required
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    value={countries.find((c) => c.name === field.value) || null}
                    onChange={(_, value) => field.onChange(value ? value.name : "")}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        <img src={option.flag} alt="" width="20" style={{ marginRight: 10 }} />
                        {option.name}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        required
                        error={!!errors.country}
                        helperText={errors.country?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="devType"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={devTypes}
                    getOptionLabel={(option) => option.label}
                    value={devTypes.find((d) => d.value === field.value) || null}
                    onChange={(_, value) => field.onChange(value ? value.value : "")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Developer Type"
                        required
                        error={!!errors.devType}
                        helperText={errors.devType?.message}
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
            {isSubmitting ? "Creating..." : "Create Account"}
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

