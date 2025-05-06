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
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";

export default function UserCreate() {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
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
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.secondName.trim())
      newErrors.secondName = "Second name is required";
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
      const payload = {
        ...formData,
        userType: "worker",
      };

      const response = await postFetcher(enpoints.user.create, payload);
      console.log("User created:", response);
      setSuccessMessage("User created successfully!");

      setFormData({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        devType: "",
        country: "",
      });
    } catch (err) {
      console.error("Error creating user:", err);
      setErrors({ apiError: "Failed to create user. Try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
            <PersonAdd color="primary" />
            <Typography variant="h4" fontWeight="bold">
              Create Worker Account
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="secondName"
                  label="Second Name"
                  value={formData.secondName}
                  onChange={handleChange}
                  error={!!errors.secondName}
                  helperText={errors.secondName}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  options={countries}
                  getOptionLabel={(option) => option.name}
                  value={
                    countries.find((c) => c.name === formData.country) || null
                  }
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
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
              sx={{
                mt: 4,
                py: 1.5,
                background: "linear-gradient(to right, #2193b0, #6dd5ed)",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
