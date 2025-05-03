import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Select,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';
import {
  Search,
  Notifications,
  KeyboardArrowDown
} from '@mui/icons-material';

const workerlanding = () => {
  const currentDate = "Tue, 07 June 2022";

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        width: '100%'
      }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Welcome, Amanda
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentDate}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            placeholder="Search"
            size="small"
            sx={{ 
              mr: 2,
              width: 250,
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
          <Avatar 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tDwWwSsbMKfpAZ8cot3aBSpb83bCGW.png" 
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      </Box>

      {/* Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          height: 80,
          width: '100%',
          bgcolor: '#b0c4de',
          borderRadius: 1,
          border: '1px solid #99b3d4'
        }}
      />

      {/* Profile Info */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Alexa Rawles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineer
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Happy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your Status
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Task Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              bgcolor: '#b0c4de',
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Completed Task : 10
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              bgcolor: '#b0c4de',
              height: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Pending Task : 3
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              height: 120,
              width: 120,
              borderRadius: '50%',
              bgcolor: '#e0e0e0',
              mx: 'auto'
            }}
          />
        </Grid>
      </Grid>

      {/* Task Dropdowns */}
      <Grid container spacing={4}>
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
              <MenuItem value="task3">Task 3</MenuItem>
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
              <MenuItem value="task3">Task 3</MenuItem>
            </Select>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Circle */}
      <Box 
        sx={{ 
          height: 50,
          width: 50,
          borderRadius: '50%',
          bgcolor: '#f0f8ff',
          mt: 4
        }}
      />
    </Box>
  );
};

export default workerlanding;