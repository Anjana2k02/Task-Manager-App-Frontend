import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import {
  Search,
  Notifications,
  KeyboardArrowDown
} from '@mui/icons-material';

const workerprofile = () => {
  const [status, setStatus] = useState('Happy');
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Welcome, Amanda
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
          <Avatar src="/placeholder-user.jpg" />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Banner */}
        <Paper
          sx={{
            p: 2,
            mb: 4,
            height: 100,
            background: 'linear-gradient(90deg, rgba(173,216,230,1) 0%, rgba(255,228,196,1) 100%)',
            borderRadius: 2
          }}
        />

        {/* Profile Info */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Alexa Rawles
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
                  {isEditing ? (
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value="Happy">Happy</MenuItem>
                      <MenuItem value="Busy">Busy</MenuItem>
                      <MenuItem value="Away">Away</MenuItem>
                    </Select>
                  ) : (
                    status
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your Status
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                onClick={toggleEdit}
                sx={{ 
                  backgroundColor: '#3f80ea',
                  '&:hover': {
                    backgroundColor: '#2d6ad9',
                  }
                }}
              >
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Form Fields */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Full Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Your First Name"
                size="small"
                sx={{ 
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Country
              </Typography>
              <TextField
                fullWidth
                placeholder="Your First Name"
                size="small"
                sx={{ 
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Your E-mail"
                size="small"
                sx={{ 
                  backgroundColor: '#f8f9fa',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Task Pending
              </Typography>
              <Select
                fullWidth
                displayEmpty
                size="small"
                renderValue={() => "Your First Name"}
                IconComponent={KeyboardArrowDown}
                sx={{ 
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="">Your First Name</MenuItem>
                <MenuItem value="task1">Task 1</MenuItem>
                <MenuItem value="task2">Task 2</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Task Completed
              </Typography>
              <Select
                fullWidth
                displayEmpty
                size="small"
                renderValue={() => "Your First Name"}
                IconComponent={KeyboardArrowDown}
                sx={{ 
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="">Your First Name</MenuItem>
                <MenuItem value="task1">Task 1</MenuItem>
                <MenuItem value="task2">Task 2</MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default workerprofile;