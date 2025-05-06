import React from 'react';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import {
  Search,
  Notifications,
  KeyboardArrowDown
} from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';


const workerprofile = () => {
  const theme = useTheme();
  const currentDate = "Tue, 07 June 2022";

  // Pie chart data
  const pieData = [
    { id: 0, value: 25, label: 'Pending', color: '#b8daff' },
    { id: 1, value: 15, label: 'Completed', color: '#ffb8c2' },
    { id: 2, value: 18, label: 'To Do', color: '#b8ffd8' },
   
  ];

  // Task lists
  const pendingTasks = [
    "Task item 1...........................",
    "Task item 2...........................",
    "Task item 3...........................",
    "Task item 4...........................",
    "Task item 5...........................",
  ];

  const completedTasks = [
    "Task item 1...........................",
    "Task item 2...........................",
    "Task item 3...........................",
    "Task item 4...........................",
    "Task item 5...........................",
  ];

  return (
    <Box sx={{ bgcolor: '#ffffff', minHeight: '100vh', p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        width: '100%'
      }}>
        <Box sx={{ border: '1px solid #1976d2', p: 1, borderRadius: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Jo4NRrKSfjJ1fSXo2qBmVivT57iLNF.png" 
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
          background: 'linear-gradient(90deg, rgba(173,216,230,1) 0%, rgba(255,228,196,1) 100%)',
          borderRadius: 1
        }}
      />

      {/* Profile Info */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Alexa Rawles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software Engineer
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Happy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your Status
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Chart.js Pie Chart
          </Typography>
        </Grid>
      </Grid>

      {/* Task Cards and Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              bgcolor: '#b0c4de',
              height: 100,
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
              height: 100,
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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid container spacing={1}>
              {pieData.map((item) => (
                <Grid item xs={6} key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        width: 16, 
                        height: 16, 
                        bgcolor: item.color,
                        borderRadius: 0.5
                      }} 
                    />
                    <Typography variant="caption">{item.label}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ height: 200, mt: 2 }}>
              <PieChart
                series={[
                  {
                    data: pieData,
                    innerRadius: 60,
                    outerRadius: 80,
                    paddingAngle: 2,
                    cornerRadius: 4,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 100,
                    cy: 100,
                  },
                ]}
                width={200}
                height={200}
                slotProps={{
                  legend: { hidden: true }
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Task Lists */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Task Pending
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #757575',
                }
              }}
            >
              <List disablePadding>
                {pendingTasks.map((task, index) => (
                  <ListItem 
                    key={index} 
                    disablePadding 
                    disableGutters
                    sx={{ 
                      py: 0.5, 
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}
                  >
                    {index + 1}. {task}
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Task Completed
            </Typography>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '6px solid #757575',
                }
              }}
            >
              <List disablePadding>
                {completedTasks.map((task, index) => (
                  <ListItem 
                    key={index} 
                    disablePadding 
                    disableGutters
                    sx={{ 
                      py: 0.5, 
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}
                  >
                    {index + 1}. {task}
                  </ListItem>
                ))}
              </List>
            </Paper>
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

export default workerprofile;