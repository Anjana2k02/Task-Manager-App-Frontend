import React, { useState, useEffect, useRef } from 'react';
import { Delete } from '@mui/icons-material';
import {
  AppBar, Avatar, Box, Button, Container, Grid, IconButton, InputAdornment,
  Paper, TextField, Toolbar, Typography, Autocomplete, CircularProgress, Divider
} from '@mui/material';
import {
  Search, Notifications, Edit, Save, Close, CheckCircle, Assignment,
  Person, Email, Public, Mood, Badge, Work, AccountCircle, PhotoCamera
} from '@mui/icons-material';

const userData = {
  firstName: "Alexa",
  lastName: "Rawles",
  email: "alexa.rawles@example.com",
  country: "United States",
  status: "Happy",
  position: "Software Engineer",
  department: "Engineering",
  pendingTasks: ["Fix login bug"],
  completedTasks: ["Refactor dashboard"],
  profilePicture: null
};

const WorkerHome = () => {
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({ ...userData });
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const theme = {
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#0ea5e9',
      light: '#38bdf8',
      dark: '#0284c7'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
      light: '#f1f5f9',
      gradient: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)'
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b'
    }
  };

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        return response.json();
      })
      .then((data) => {
        const countryList = data.map((country) => ({
          name: country.name?.common,
          code: country.cca2,
          flag: country.flags?.png || '',
        }))
        .filter((c) => c.name && c.flag)
        .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
        setLoadingCountries(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setLoadingCountries(false);
      });
  }, []);

  const handleChange = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEdit = () => {
    setEditMode(true);
    setPreviewImage(profileImage);
  };

  const handleCancel = () => {
    setFormValues({ ...userData });
    setEditMode(false);
    setPreviewImage(profileImage);
  };

  const handleDeleteCompletedTask = (index) => {
    setFormValues((prev) => ({
      ...prev,
      completedTasks: prev.completedTasks.filter((_, i) => i !== index),
    }));
  };

  const handleDeletePendingTask = (index) => {
    setFormValues((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", formValues);
    if (previewImage !== profileImage) {
      setProfileImage(previewImage);
    }
    setEditMode(false);
  };

  const handleCountryChange = (event, value) => {
    setFormValues((prev) => ({ ...prev, country: value?.name || "" }));
  };

  const handleProfilePictureClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentDate = "Tue, 07 June 2022";

  return (
    <Box sx={{ display: 'flex', bgcolor: theme.background.default, minHeight: '100vh' }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
        }}
      >
        <AppBar
          position="static"
          elevation={2}
          sx={{
            backgroundColor: theme.background.paper,
            borderBottom: `1px solid ${theme.background.light}`,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: '600',
                color: theme.text.primary
              }}
            >
              Welcome, {formValues.firstName}
              <Typography variant="body2" sx={{ color: theme.text.secondary, mt: 0.5 }}>
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
                  borderRadius: '12px',
                  backgroundColor: theme.background.light,
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: '#e2e8f0',
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.background.paper,
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: theme.text.secondary }} />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton
              sx={{
                mr: 2,
                backgroundColor: theme.background.light,
                '&:hover': {
                  backgroundColor: '#e2e8f0',
                }
              }}
            >
              <Notifications sx={{ color: theme.primary.main }} />
            </IconButton>
            <Avatar
              src={profileImage}
              sx={{
                width: 40,
                height: 40,
                border: `2px solid ${theme.primary.light}`,
                bgcolor: theme.primary.light,
                color: 'white'
              }}
            >
              {!profileImage && <AccountCircle />}
            </Avatar>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              mb: 4,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
              position: 'relative',
              height: 200,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to right, rgba(37, 99, 235, 0.85), rgba(59, 130, 246, 0.6))',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 3,
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, textAlign: 'center', mb: 1 }}>
                Worker Profile
              </Typography>
              <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center', maxWidth: 600 }}>
                Organize, prioritize, and complete your tasks efficiently
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assignment sx={{ color: 'white' }} />
                  <Typography sx={{ color: 'white' }}>
                    {formValues.pendingTasks.length} Pending
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ color: 'white' }} />
                  <Typography sx={{ color: 'white' }}>
                    {formValues.completedTasks.length} Completed
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              }}>
                <Box sx={{ 
                  background: theme.background.gradient,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <Box 
                    sx={{ 
                      position: 'relative',
                      mb: 2,
                      cursor: editMode ? 'pointer' : 'default',
                    }}
                    onClick={handleProfilePictureClick}
                  >
                    <Avatar 
                      src={editMode ? previewImage : profileImage}
                      sx={{ 
                        width: 100, 
                        height: 100,
                        border: `4px solid white`,
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        bgcolor: 'white',
                        color: theme.primary.main
                      }}
                    >
                      {!(editMode ? previewImage : profileImage) && <Person sx={{ fontSize: 60 }} />}
                    </Avatar>
                    {editMode && (
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        '&:hover': {
                          opacity: 1
                        }
                      }}>
                        <PhotoCamera sx={{ color: 'white', fontSize: 30 }} />
                      </Box>
                    )}
                  </Box>
                  <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>
                    {formValues.firstName} {formValues.lastName}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', textAlign: 'center', mt: 0.5 }}>
                    {userData.position}
                  </Typography>
                </Box>
                <Box sx={{ p: 3, bgcolor: 'white' }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: theme.background.light,
                  }}>
                    <Mood sx={{ color: theme.primary.main, mr: 1 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: theme.text.primary }}>
                      {formValues.status}
                    </Typography>
                  </Box>
                  {!editMode ? (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleEdit}
                      startIcon={<Edit />}
                      sx={{
                        backgroundColor: theme.primary.main,
                        '&:hover': {
                          backgroundColor: theme.primary.dark,
                        },
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                        py: 1.5
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <Box display="flex" gap={2}>
                      <Button 
                        fullWidth
                        variant="outlined" 
                        color="error" 
                        onClick={handleCancel}
                        startIcon={<Close />}
                        sx={{
                          borderRadius: '10px',
                          borderColor: '#ef4444',
                          color: '#ef4444',
                          '&:hover': {
                            borderColor: '#dc2626',
                            backgroundColor: 'rgba(239, 68, 68, 0.04)',
                          },
                          py: 1.5
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        fullWidth
                        variant="contained" 
                        onClick={handleSave}
                        startIcon={<Save />}
                        sx={{
                          backgroundColor: theme.primary.main,
                          '&:hover': {
                            backgroundColor: theme.primary.dark,
                          },
                          borderRadius: '10px',
                          boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
                          py: 1.5
                        }}
                      >
                        Save
                      </Button>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Paper sx={{ 
                p: 3, 
                borderRadius: 3,
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Badge sx={{ color: theme.primary.main, mr: 1.5, fontSize: 28 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: theme.text.primary }}>
                    Personal Information
                  </Typography>
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.background.light,
                      mb: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Person sx={{ color: theme.primary.main, mr: 2, fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                          First Name
                        </Typography>
                        {editMode ? (
                          <TextField
                            fullWidth
                            value={formValues.firstName}
                            onChange={handleChange('firstName')}
                            size="small"
                            variant="standard"
                            sx={{ mt: 0.5 }}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 500, color: theme.text.primary, mt: 0.5 }}>
                            {formValues.firstName}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.background.light,
                      mb: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Person sx={{ color: theme.primary.main, mr: 2, fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                          Last Name
                        </Typography>
                        {editMode ? (
                          <TextField
                            fullWidth
                            value={formValues.lastName}
                            onChange={handleChange('lastName')}
                            size="small"
                            variant="standard"
                            sx={{ mt: 0.5 }}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 500, color: theme.text.primary, mt: 0.5 }}>
                            {formValues.lastName}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.background.light,
                      mb: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Email sx={{ color: theme.primary.main, mr: 2, fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                          Email Address
                        </Typography>
                        {editMode ? (
                          <TextField
                            fullWidth
                            value={formValues.email}
                            onChange={handleChange('email')}
                            size="small"
                            variant="standard"
                            sx={{ mt: 0.5 }}
                          />
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 500, color: theme.text.primary, mt: 0.5 }}>
                            {formValues.email}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.background.light,
                      mb: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Public sx={{ color: theme.primary.main, mr: 2, fontSize: 28 }} />
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                          Country
                        </Typography>
                        {editMode ? (
                          loadingCountries ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <CircularProgress size={20} sx={{ mr: 2, color: theme.primary.main }} />
                              <Typography>Loading countries...</Typography>
                            </Box>
                          ) : (
                            <Autocomplete
                              options={countries}
                              getOptionLabel={(option) => option.name}
                              value={countries.find((c) => c.name === formValues.country) || null}
                              onChange={handleCountryChange}
                              size="small"
                              sx={{ mt: 0.5 }}
                              renderOption={(props, option) => (
                                <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center' }}>
                                  <img
                                    loading="lazy"
                                    width="20"
                                    src={option.flag || "/placeholder.svg"}
                                    alt=""
                                    style={{ marginRight: 10, borderRadius: '3px' }}
                                  />
                                  {option.name}
                                </Box>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                />
                              )}
                            />
                          )
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 500, color: theme.text.primary, mt: 0.5 }}>
                            {formValues.country}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.background.light,
                      mb: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Work sx={{ color: theme.primary.main, mr: 2, fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                          Position
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: theme.text.primary, mt: 0.5 }}>
                          {userData.position}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.background.light,
                      mb: 2,
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                      }
                    }}>
                      <Badge sx={{ color: theme.primary.main, mr: 2, fontSize: 28 }} />
                      <Box>
                        <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                          Department
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, color: theme.text.primary, mt: 0.5 }}>
                          {userData.department}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>

          <Paper sx={{ 
            p: 3, 
            mt: 3,
            borderRadius: 3,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: theme.text.primary }}>
              Tasks
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: theme.text.primary }}>
                    Tasks Pending
                  </Typography>
                  {formValues.pendingTasks.length === 0 ? (
                    <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                      No pending tasks
                    </Typography>
                  ) : (
                    formValues.pendingTasks.map((task, idx) => (
                      <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: theme.background.light,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: '#e2e8f0',
                          borderLeft: '4px solid #f97316',
                          mb: 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                            {task}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeletePendingTask(idx)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500, color: theme.text.primary }}>
                    Tasks Completed
                  </Typography>
                  {formValues.completedTasks.length === 0 ? (
                    <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                      No completed tasks
                    </Typography>
                  ) : (
                    formValues.completedTasks.map((task, idx) => (
                      <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: theme.background.light,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: '#e2e8f0',
                          borderLeft: '4px solid #10b981',
                          mb: 1
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                            {task}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteCompletedTask(idx)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 6,
              mb: 2
            }}
          >
            <Typography variant="body2" sx={{ color: theme.text.secondary }}>
              © 2025 Task Manager Dashboard. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default WorkerHome;