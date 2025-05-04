import React, { useState } from 'react';
import {
  AppBar, Avatar, Box, Button, Container, Grid, IconButton, InputAdornment,
  Paper, TextField, Toolbar, Typography
} from '@mui/material';
import { Search, Notifications } from '@mui/icons-material';

// Mocked User Data
const userData = {
  firstName: "Alexa",
  lastName: "Rawles",
  email: "alexa.rawles@example.com",
  country: "USA",
  status: "Happy",
  pendingTasks: ["Fix login bug"],
  completedTasks: ["Refactor dashboard"]
};

const WorkerHome = () => {
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...userData });

  const handleChange = (field) => (e) => {
    setFormValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setFormValues({ ...userData });
    setEditMode(false);
  };
  const handleSave = () => {
    // Here you would handle form submission
    console.log("Saved Data:", formValues);
    setEditMode(false);
  };

  const currentDate = "Tue, 07 June 2022";

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#ffffff',
          minHeight: '100vh',
        }}
      >
        {/* Top Navigation */}
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{
            borderBottom: '1px solid #eaeaea',
            backgroundColor: 'white'
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Welcome, {formValues.firstName}
              <Typography variant="body2" color="text.secondary">
                {currentDate}
              </Typography>
            </Typography>
            <TextField
              placeholder="Search"
              size="small"
              sx={{
                mr: 2,
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton sx={{ mr: 2 }}>
              <Notifications />
            </IconButton>
            <Avatar src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tC1iDkI9Z9qyWGGtoMpzZuIVRpgZ80.png" />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Banner */}
          <Paper
            sx={{
              p: 2,
              mb: 4,
              height: 80,
              background: 'linear-gradient(90deg, rgba(173,216,230,1) 0%, rgba(255,228,196,1) 100%)',
              borderRadius: 2
            }}
          />

          {/* Profile Info */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {formValues.firstName} {formValues.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Software Engineer
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {formValues.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your Status
                  </Typography>
                </Box>
                {!editMode ? (
                  <Button
                    variant="contained"
                    onClick={handleEdit}
                    sx={{
                      backgroundColor: '#3f80ea',
                      '&:hover': {
                        backgroundColor: '#2d6ad9',
                      }
                    }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box display="flex" gap={2}>
                    <Button variant="outlined" color="error" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                      Save
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Form Fields */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formValues.firstName}
                onChange={handleChange('firstName')}
                size="small"
                InputProps={{ readOnly: !editMode }}
                sx={{
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formValues.lastName}
                onChange={handleChange('lastName')}
                size="small"
                InputProps={{ readOnly: !editMode }}
                sx={{
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={formValues.email}
                onChange={handleChange('email')}
                size="small"
                InputProps={{ readOnly: !editMode }}
                sx={{
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Country"
                value={formValues.country}
                onChange={handleChange('country')}
                size="small"
                InputProps={{ readOnly: !editMode }}
                sx={{
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Task Pending
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ p: 1, bgcolor: '#f1f1f1', borderRadius: 1 }}>
                  {formValues.pendingTasks[0]}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Task Completed
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ p: 1, bgcolor: '#f1f1f1', borderRadius: 1 }}>
                  {formValues.completedTasks[0]}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Decorative Bottom Circle */}
          <Box
            sx={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              bgcolor: '#f0f8ff',
              mt: 4
            }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default WorkerHome;
