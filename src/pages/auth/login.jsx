"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  Alert,
  Snackbar,
  CssBaseline,
} from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff, Google, GitHub } from "@mui/icons-material"

const UserLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      setShowError(true)
      return
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password })
      const { id, type } = res.data

      localStorage.setItem("userId", id)
      localStorage.setItem("userType", type)

      if (onLogin) onLogin() // 🔥 Tell App to update auth state
      navigate("/supervisor/list")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
      setShowError(true)
    }
  }

  const handleCloseError = () => {
    setShowError(false)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(-45deg, #EEF2F3, #E6F4F1, #DAE9F6, #E8EAF6)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        "@keyframes gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              width: "100%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            }}
          >
            <Typography component="h1" variant="h5" fontWeight="bold" mb={3} color="primary">
              Welcome Back
            </Typography>

            <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  background: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(90deg, #4776E6 0%, #8E54E9 100%)",
                    transform: "translateY(-3px)",
                    boxShadow: "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                Sign In
              </Button>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link href="#" variant="body2" sx={{ fontWeight: "medium" }}>
                    Sign Up
                  </Link>
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  Google
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHub />}
                  sx={{
                    py: 1.2,
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  GitHub
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Snackbar open={showError} autoHideDuration={6000} onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default UserLogin
