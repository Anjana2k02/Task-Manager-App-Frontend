import { useEffect, useState } from "react";
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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";

export default function WorkerCreate() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    devType: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [countries, setCountries] = useState([]);

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
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.devType) newErrors.devType = "Developer type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await postFetcher(enpoints.worker.create, formData);
      console.log("Worker created:", response);
      setSuccessMessage("Worker created successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        devType: "",
        country: "",
      });
    } catch (err) {
      console.error("Error creating worker:", err);
      setErrors({ apiError: "Failed to create worker. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd color="primary" />
          <Typography variant="h5">Create Worker Account</Typography>
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
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                required
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
                required
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.name}
                value={countries.find((c) => c.name === formData.country) || null}
                onChange={(e, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: value ? value.name : "",
                  }))
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <img
                      src={option.flag}
                      alt=""
                      width="20"
                      style={{ marginRight: 10 }}
                    />
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country}
                    required
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                required
                margin="normal"
                size="medium"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                required
                margin="normal"
                size="medium"
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
              <Autocomplete
                options={[
                  { label: "Software Developing", value: 1 },
                  { label: "Data Analytics", value: 2 },
                  { label: "Testing", value: 3 },
                  { label: "DevOps", value: 4 },
                ]}
                getOptionLabel={(option) => option.label}
                value={
                  [
                    { label: "Software Developing", value: 1 },
                    { label: "Data Analytics", value: 2 },
                    { label: "Testing", value: 3 },
                    { label: "DevOps", value: 4 },
                  ].find((opt) => opt.value === formData.devType) || null
                }
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    devType: newValue ? newValue.value : "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Developer Type"
                    error={!!errors.devType}
                    helperText={errors.devType}
                    required
                    margin="normal"
                    fullWidth
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
            {isSubmitting ? "Creating..." : "Create Worker"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
