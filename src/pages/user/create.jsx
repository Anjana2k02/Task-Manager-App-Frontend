import { useEffect, useState } from "react"
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
  Grid,
  Snackbar,
  Alert,
  Slide,
} from "@mui/material"
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material"
import { enpoints, postFetcher } from "../../utils/axios"

export default function UserCreate() {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    devType: "",
    country: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all")
        const data = await res.json()
        const parsed = data
          .map((c) => ({
            name: c.name.common,
            flag: c.flags?.png || "",
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
        setCountries(parsed)
      } catch (err) {
        console.error("Error fetching countries:", err)
      }
    }

    fetchCountries()
  }, [])

  const devTypes = [
    { label: "Software Developing", value: 1 },
    { label: "Data Analytics", value: 2 },
    { label: "Testing", value: 3 },
    { label: "DevOps", value: 4 },
  ]

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.secondName.trim()) newErrors.secondName = "Second name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters"
    if (!formData.country) newErrors.country = "Country is required"
    if (!formData.devType) newErrors.devType = "Developer type is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    setSnackbar({ open: false, message: "", severity: "success" })

    try {
      const payload = {
        ...formData,
        userType: "worker",
      }

      await postFetcher(enpoints.user.create, payload)

      setSnackbar({
        open: true,
        message: "User created successfully!",
        severity: "success",
      })

      setFormData({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        devType: "",
        country: "",
      })
    } catch (err) {
      console.error("Error creating user:", err)
      setSnackbar({
        open: true,
        message: "Failed to create user. Please try again.",
        severity: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSnackbar = (_, reason) => {
    if (reason === "clickaway") return
    setSnackbar({ ...snackbar, open: false })
  }

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
            Create User Account
          </Typography>
        </Box>

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
                value={countries.find((c) => c.name === formData.country) || null}
                onChange={(e, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    country: value ? value.name : "",
                  }))
                }
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
                options={devTypes}
                getOptionLabel={(option) => option.label}
                value={devTypes.find((opt) => opt.value === formData.devType) || null}
                onChange={(e, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    devType: newValue ? newValue.value : "",
                  }))
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
  )
}
