import { useState } from "react";
import { Box, TextField, Button, Typography, Container, Paper, InputAdornment, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import { enpoints, postFetcher } from "../../utils/axios";

export default function WorkerCreate() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    status: "",
    expression: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = "ID is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
    }

    if (!formData.expression.trim()) {
      newErrors.expression = "Expression is required";
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
      const response = await postFetcher(enpoints.worker.create, formData);
      console.log("Worker created successfully:", response);
      setSuccessMessage("Worker created successfully!");

      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        country: "",
        status: "",
        expression: "",
      });
    } catch (error) {
      console.error("Error creating worker:", error);
      setErrors({ apiError: "Failed to create worker. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <PersonAdd color="primary" />
          <Typography variant="h5" component="h1">
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
          <Grid container spacing={2}>
            {Object.keys(formData).map((field) => (
              <Grid item xs={12} sm={field === "id" || field === "password" ? 12 : 6} key={field}>
                <TextField
                  name={field}
                  label={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  type={field === "password" && !showPassword ? "password" : "text"}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                  helperText={errors[field]}
                  fullWidth
                  required
                  margin="normal"
                  size="medium"
                  InputProps={
                    field === "password"
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={togglePasswordVisibility} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }
                      : {}
                  }
                />
              </Grid>
            ))}
          </Grid>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Worker"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
