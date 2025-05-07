import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, IconButton, TextField, Grid, Paper, Popover
} from '@mui/material';
import {
  Menu as MenuIcon, Search as SearchIcon, Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,
  Add as AddIcon, Pause as PauseIcon, Close as CloseIcon
} from '@mui/icons-material';

const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const weekDates = [3, 4, 5, 6, 7, 8, 9];
const timeSlots = Array.from({ length: 9 }, (_, i) => i + 8); // 8 AM to 4 PM

const events = [
  { id: 1, title: 'Team Meeting', startTime: '09:00', endTime: '10:00', color: '#3b82f6', day: 1, description: 'Weekly team sync-up', location: 'Conference Room A', attendees: ['John Doe', 'Jane Smith', 'Bob Johnson'], organizer: 'Alice Brown' },
  { id: 2, title: 'Lunch with Sarah', startTime: '12:30', endTime: '13:30', color: '#22c55e', day: 1, description: 'Discuss project timeline', location: 'Cafe Nero', attendees: ['Sarah Lee'], organizer: 'You' },
  { id: 3, title: 'Project Review', startTime: '14:00', endTime: '15:30', color: '#8b5cf6', day: 3, description: 'Q2 project progress review', location: 'Meeting Room 3', attendees: ['Team Alpha', 'Stakeholders'], organizer: 'Project Manager' },
  { id: 4, title: 'Client Call', startTime: '10:00', endTime: '11:00', color: '#eab308', day: 2, description: 'Quarterly review with major client', location: 'Zoom Meeting', attendees: ['Client Team', 'Sales Team'], organizer: 'Account Manager' },
  { id: 5, title: 'Team Brainstorm', startTime: '13:00', endTime: '14:30', color: '#6366f1', day: 4, description: 'Ideation session for new product features', location: 'Creative Space', attendees: ['Product Team', 'Design Team'], organizer: 'Product Owner' },
  { id: 6, title: 'Product Demo', startTime: '11:00', endTime: '12:00', color: '#ec4899', day: 5, description: 'Showcase new features to stakeholders', location: 'Demo Room', attendees: ['Stakeholders', 'Dev Team'], organizer: 'Tech Lead' },
  { id: 7, title: 'Marketing Meeting', startTime: '13:00', endTime: '14:00', color: '#14b8a6', day: 6, description: 'Discuss Q3 marketing strategy', location: 'Marketing Office', attendees: ['Marketing Team'], organizer: 'Marketing Director' },
  { id: 8, title: 'Code Review', startTime: '15:00', endTime: '16:00', color: '#06b6d4', day: 7, description: 'Review pull requests for new feature', location: 'Dev Area', attendees: ['Dev Team'], organizer: 'Senior Developer' },
  { id: 9, title: 'Morning Standup', startTime: '08:30', endTime: '09:30', color: '#60a5fa', day: 2, description: 'Daily team standup', location: 'Slack Huddle', attendees: ['Development Team'], organizer: 'Scrum Master' },
  { id: 10, title: 'Design Review', startTime: '14:30', endTime: '15:45', color: '#a78bfa', day: 5, description: 'Review new UI designs', location: 'Design Lab', attendees: ['UX Team', 'Product Manager'], organizer: 'Lead Designer' },
  { id: 11, title: 'Investor Meeting', startTime: '10:30', endTime: '12:00', color: '#f87171', day: 7, description: 'Quarterly investor update', location: 'Board Room', attendees: ['Executive Team', 'Investors'], organizer: 'CEO' },
  { id: 12, title: 'Team Training', startTime: '09:30', endTime: '11:30', color: '#4ade80', day: 4, description: 'New tool onboarding session', location: 'Training Room', attendees: ['All Departments'], organizer: 'HR' },
  { id: 13, title: 'Budget Review', startTime: '13:30', endTime: '15:00', color: '#fde68a', day: 3, description: 'Quarterly budget analysis', location: 'Finance Office', attendees: ['Finance Team', 'Department Heads'], organizer: 'CFO' },
  { id: 14, title: 'Client Presentation', startTime: '11:00', endTime: '12:30', color: '#fb923c', day: 6, description: 'Present new project proposal', location: 'Client Office', attendees: ['Sales Team', 'Client Representatives'], organizer: 'Account Executive' },
  { id: 15, title: 'Product Planning', startTime: '14:00', endTime: '15:30', color: '#f472b6', day: 1, description: 'Roadmap discussion for Q3', location: 'Strategy Room', attendees: ['Product Team', 'Engineering Leads'], organizer: 'Product Manager' },
];

function calculateEventStyle(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const start = startHour + startMinute / 60;
  const end = endHour + endMinute / 60;
  const top = (start - 8) * 80; // 80px per hour
  const height = (end - start) * 80;
  return { top, height };
}

export default function Calendar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState('week');
  const [currentMonth, setCurrentMonth] = useState('March 2025');
  const [currentDate, setCurrentDate] = useState('March 5');
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    const popupTimer = setTimeout(() => setShowAIPopup(true), 3000);
    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    if (showAIPopup) {
      const text = "LLooks like you don't have that many meetings today. Shall I play some Hans Zimmer essentials to help you get into your Flow State?";
      let i = 0;
      setTypedText('');
      const typingInterval = setInterval(() => {
        setTypedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) clearInterval(typingInterval);
      }, 50);
      return () => clearInterval(typingInterval);
    }
  }, [showAIPopup]);

  const handleEventClick = (event) => setSelectedEvent(event);
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', bgcolor: '#18181b' }}>
      {/* Navigation */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, py: 2, opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit"><MenuIcon /></IconButton>
          <Typography variant="h6" color="white" sx={{ textShadow: '0 0 4px rgba(0,0,0,0.7)' }}>Calendar</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <SearchIcon sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'white', opacity: 0.7, fontSize: 20 }} />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search"
              sx={{
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                input: { color: 'white', paddingLeft: '32px' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.4)' },
              }}
            />
          </Box>
          <IconButton color="inherit"><SettingsIcon /></IconButton>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>U</Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ display: 'flex', height: '100vh', pt: 8, px: 4 }}>
        {/* Sidebar */}
        <Box sx={{ width: 256, height: '100%', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', p: 2, borderRadius: '0 24px 0 0', boxShadow: '0 0 10px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
          <Box>
            <Button variant="contained" startIcon={<AddIcon />} fullWidth sx={{ mb: 2 }}>Create</Button>
            {/* Mini Calendar */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" color="white">{currentMonth}</Typography>
                <Box>
                  <IconButton size="small" sx={{ color: 'white' }}><ChevronLeftIcon fontSize="small" /></IconButton>
                  <IconButton size="small" sx={{ color: 'white' }}><ChevronRightIcon fontSize="small" /></IconButton>
                </Box>
              </Box>
              <Grid container spacing={0.5} sx={{ textAlign: 'center' }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <Grid item xs={1.71} key={i}>
                    <Typography variant="caption" color="rgba(255,255,255,0.7)">{day}</Typography>
                  </Grid>
                ))}
                {Array.from({ length: 31 + 5 }).map((_, i) => {
                  const day = i < 5 ? null : i - 5 + 1;
                  const isSelected = day === 5;
                  return (
                    <Grid item xs={1.71} key={i}>
                      <Box
                        sx={{
                          width: 28, height: 28, borderRadius: '50%',
                          backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                          color: isSelected ? 'white' : 'rgba(255,255,255,0.7)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: day ? 'pointer' : 'default',
                          '&:hover': { backgroundColor: isSelected ? '#3b82f6' : 'rgba(255,255,255,0.2)' },
                        }}
                      >{day || ''}</Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            {/* My Calendars */}
            <Box>
              <Typography variant="subtitle1" color="white" sx={{ mb: 1 }}>My calendars</Typography>
              {['My Calendar', 'Work', 'Personal', 'Family'].map((name, i) => {
                const colors = ['#3b82f6', '#22c55e', '#8b5cf6', '#fb923c'];
                return (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, backgroundColor: colors[i] }} />
                    <Typography variant="body2" color="white">{name}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Button variant="contained" sx={{ width: 56, height: 56, borderRadius: '50%', alignSelf: 'start' }}><AddIcon /></Button>
        </Box>

        {/* Calendar View */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
          {/* Calendar Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="contained" size="small" sx={{ backgroundColor: '#3b82f6' }}>Today</Button>
              <Box sx={{ display: 'flex' }}>
                <IconButton size="small" sx={{ color: 'white' }}><ChevronLeftIcon fontSize="small" /></IconButton>
                <IconButton size="small" sx={{ color: 'white' }}><ChevronRightIcon fontSize="small" /></IconButton>
              </Box>
              <Typography variant="h6" color="white">{currentDate}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, borderRadius: 1, p: 0.5 }}>
              {['day', 'week', 'month'].map((view) => (
                <Button
                  key={view}
                  variant={currentView === view ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setCurrentView(view)}
                  sx={{ color: 'white', backgroundColor: currentView === view ? 'rgba(255,255,255,0.2)' : 'transparent' }}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </Button>
              ))}
            </Box>
          </Box>
          {/* Week View */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            <Paper sx={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 3, border: '1px solid rgba(255,255,255,0.2)', height: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
              {/* Week Header */}
              <Grid container columns={8} sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <Grid item xs={1} sx={{ borderRight: '1px solid rgba(255,255,255,0.2)', p: 1 }}></Grid>
                {weekDays.map((day, i) => (
                  <Grid key={i} item xs={1} sx={{ borderLeft: '1px solid rgba(255,255,255,0.2)', p: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="rgba(255,255,255,0.7)">{day}</Typography>
                    <Box
                      sx={{
                        mt: 0.5, width: 32, height: 32, borderRadius: '50%',
                        backgroundColor: weekDates[i] === 5 ? '#3b82f6' : 'transparent',
                        color: weekDates[i] === 5 ? 'white' : 'rgba(255,255,255,0.7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto'
                      }}
                    >{weekDates[i]}</Box>
                  </Grid>
                ))}
              </Grid>
              {/* Time Grid */}
              <Grid container columns={8} sx={{ height: 'calc(100% - 48px)', position: 'relative' }}>
                {/* Time Labels */}
                <Grid item xs={1} sx={{ borderRight: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: 10, textAlign: 'right', pr: 1 }}>
                  {timeSlots.map((time, i) => (
                    <Box key={i} sx={{ height: 80, borderBottom: '1px solid rgba(255,255,255,0.1)', lineHeight: '80px' }}>
                      {time > 12 ? `${time - 12} PM` : `${time} AM`}
                    </Box>
                  ))}
                </Grid>
                {/* Days Columns */}
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <Grid key={dayIndex} item xs={1} sx={{ borderLeft: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                    {timeSlots.map((_, timeIndex) => (
                      <Box key={timeIndex} sx={{ height: 80, borderBottom: '1px solid rgba(255,255,255,0.1)' }}></Box>
                    ))}
                    {/* Events */}
                    {events
                      .filter((event) => event.day === dayIndex + 1)
                      .map((event) => {
                        const { top, height } = calculateEventStyle(event.startTime, event.endTime);
                        return (
                          <Box
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            sx={{
                              position: 'absolute', top, left: 4, right: 4, height,
                              backgroundColor: event.color, borderRadius: 1, p: 1, color: 'white',
                              fontSize: 10, fontWeight: 'medium', boxShadow: 3, cursor: 'pointer',
                              transition: 'all 0.2s',
                              '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                            }}
                          >
                            <Typography sx={{ fontWeight: 'bold' }}>{event.title}</Typography>
                            <Typography sx={{ opacity: 0.8, fontSize: 8, mt: 0.5 }}>{`${event.startTime} - ${event.endTime}`}</Typography>
                          </Box>
                        );
                      })}
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Box>

        {/* AI Popup */}
        {showAIPopup && (
          <Popover
            open={showAIPopup}
            anchorReference="anchorPosition"
            anchorPosition={{ top: window.innerHeight - 150, left: window.innerWidth - 500 }}
            onClose={() => setShowAIPopup(false)}
            PaperProps={{ sx: { p: 3, background: 'linear-gradient(135deg, #60a5fa30, #3b82f630)', backdropFilter: 'blur(10px)', borderRadius: 3, border: '1px solid #3b82f6' } }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'white' }}>
              <Typography variant="body1" sx={{ flex: 1, fontWeight: 'light' }}>{typedText}</Typography>
              <IconButton onClick={() => setShowAIPopup(false)} sx={{ color: 'white' }}><CloseIcon /></IconButton>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="outlined" color="primary" fullWidth onClick={togglePlay}>Yes</Button>
              <Button variant="outlined" color="primary" fullWidth onClick={() => setShowAIPopup(false)}>No</Button>
            </Box>
            {isPlaying && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button variant="contained" color="primary" startIcon={<PauseIcon />} onClick={togglePlay}>Pause Hans Zimmer</Button>
              </Box>
            )}
          </Popover>
        )}

        {/* Event Details Dialog */}
        {selectedEvent && (
          <Popover
            open={Boolean(selectedEvent)}
            anchorReference="anchorPosition"
            anchorPosition={{ top: window.innerHeight / 2 - 150, left: window.innerWidth / 2 - 200 }}
            onClose={() => setSelectedEvent(null)}
            PaperProps={{ sx: { p: 3, backgroundColor: selectedEvent.color, borderRadius: 3, boxShadow: 3, maxWidth: 400 } }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>{selectedEvent.title}</Typography>
            <Typography sx={{ color: 'white', mb: 1 }}>{`${selectedEvent.startTime} - ${selectedEvent.endTime}`}</Typography>
            <Typography sx={{ color: 'white', mb: 1 }}>Location: {selectedEvent.location}</Typography>
            <Typography sx={{ color: 'white', mb: 1 }}>Date: {weekDays[selectedEvent.day - 1]}, {weekDates[selectedEvent.day - 1]} {currentMonth}</Typography>
            <Typography sx={{ color: 'white', mb: 1 }}>Attendees: {selectedEvent.attendees.join(', ')}</Typography>
            <Typography sx={{ color: 'white', mb: 1 }}>Organizer: {selectedEvent.organizer}</Typography>
            <Typography sx={{ color: 'white' }}>Description: {selectedEvent.description}</Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => setSelectedEvent(null)}>Close</Button>
            </Box>
          </Popover>
        )}
      </Box>
    </Box>
  );
}



// "use client"

// import { useState } from "react"
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   ToggleButtonGroup,
//   ToggleButton,
//   IconButton,
//   Grid,
//   Divider,
//   Avatar,
//   Chip,
//   ThemeProvider,
//   createTheme,
// } from "@mui/material"
// import {
//   ChevronLeft,
//   ChevronRight,
//   CalendarViewMonth,
//   CalendarViewWeek,
//   CalendarViewDay,
//   Add,
//   MoreVert,
//   Search,
// } from "@mui/icons-material"
// import {
//   format,
//   addMonths,
//   subMonths,
//   startOfWeek,
//   endOfWeek,
//   eachDayOfInterval,
//   isSameDay,
//   isSameMonth,
//   startOfMonth,
//   endOfMonth,
//   getDay,
//   addDays,
//   isToday,
// } from "date-fns"

// // Create a custom theme with light blue and black
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#2196f3", // Light blue
//     },
//     secondary: {
//       main: "#000000", // Black
//     },
//     background: {
//       default: "#f8f9fa",
//       paper: "#ffffff",
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h4: {
//       fontWeight: 600,
//     },
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: 12,
//           boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
//         },
//       },
//     },
//     MuiToggleButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: 8,
//           "&.Mui-selected": {
//             backgroundColor: "#2196f3",
//             color: "#fff",
//             "&:hover": {
//               backgroundColor: "#1976d2",
//             },
//           },
//         },
//       },
//     },
//     MuiChip: {
//       styleOverrides: {
//         root: {
//           borderRadius: 6,
//         },
//       },
//     },
//   },
// })

// // Sample events data
// const events = [
//   { id: 1, title: "Team Meeting", date: new Date(2025, 4, 8, 10, 0), color: "#2196f3" },
//   { id: 2, title: "Product Launch", date: new Date(2025, 4, 15, 14, 0), color: "#4caf50" },
//   { id: 3, title: "Client Presentation", date: new Date(2025, 4, 10, 11, 0), color: "#ff9800" },
//   { id: 4, title: "Strategy Planning", date: new Date(2025, 4, 22, 9, 0), color: "#9c27b0" },
// ]

// // Custom monthly calendar component
// function MonthlyCalendar({ currentDate, events }) {
//   const monthStart = startOfMonth(currentDate)
//   const monthEnd = endOfMonth(monthStart)
//   const startDate = startOfWeek(monthStart)
//   const endDate = endOfWeek(monthEnd)

//   const dateFormat = "d"
//   const days = []
//   let day = startDate

//   // Create array of weeks and days
//   while (day <= endDate) {
//     const week = []
//     for (let i = 0; i < 7; i++) {
//       week.push(day)
//       day = addDays(day, 1)
//     }
//     days.push(week)
//   }

//   return (
//     <Box sx={{ height: "100%" }}>
//       <Grid container sx={{ textAlign: "center", mb: 1 }}>
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, idx) => (
//           <Grid item xs key={idx}>
//             <Typography variant="subtitle2" fontWeight="medium">
//               {dayName}
//             </Typography>
//           </Grid>
//         ))}
//       </Grid>

//       <Box sx={{ flexGrow: 1 }}>
//         {days.map((week, weekIdx) => (
//           <Grid container key={weekIdx} sx={{ height: "calc((100% - 40px) / 6)", mb: 0.5 }}>
//             {week.map((day, dayIdx) => {
//               const hasEvents = events.some((event) => isSameDay(day, event.date))
//               const isCurrentMonth = isSameMonth(day, monthStart)

//               return (
//                 <Grid item xs key={dayIdx}>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       height: "100%",
//                       p: 1,
//                       position: "relative",
//                       border: "1px solid",
//                       borderColor: "divider",
//                       bgcolor: isToday(day) ? "rgba(33, 150, 243, 0.1)" : "background.paper",
//                       opacity: isCurrentMonth ? 1 : 0.4,
//                       "&:hover": {
//                         bgcolor: isCurrentMonth ? "rgba(33, 150, 243, 0.05)" : "background.paper",
//                       },
//                     }}
//                   >
//                     <Box sx={{ display: "flex", justifyContent: "center" }}>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           fontWeight: isToday(day) ? "bold" : hasEvents ? "medium" : "regular",
//                           color: isToday(day) ? "primary.main" : hasEvents ? "primary.main" : "text.primary",
//                           display: "inline-block",
//                           width: 28,
//                           height: 28,
//                           lineHeight: "28px",
//                           textAlign: "center",
//                           borderRadius: "50%",
//                           bgcolor: isToday(day)
//                             ? "rgba(33, 150, 243, 0.2)"
//                             : hasEvents
//                               ? "rgba(33, 150, 243, 0.1)"
//                               : "transparent",
//                         }}
//                       >
//                         {format(day, dateFormat)}
//                       </Typography>
//                     </Box>
//                   </Paper>
//                 </Grid>
//               )
//             })}
//           </Grid>
//         ))}
//       </Box>
//     </Box>
//   )
// }

// // Weekly view component
// function WeeklyView({ currentDate, events }) {
//   const startDate = startOfWeek(currentDate)
//   const endDate = endOfWeek(currentDate)
//   const days = eachDayOfInterval({ start: startDate, end: endDate })

//   return (
//     <Paper sx={{ p: 3, height: "100%" }}>
//       <Grid container spacing={1}>
//         {days.map((day, index) => (
//           <Grid item xs={12} key={index}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 mb: 1,
//                 bgcolor: isToday(day) ? "rgba(33, 150, 243, 0.1)" : "background.paper",
//                 border: "1px solid",
//                 borderColor: "divider",
//               }}
//             >
//               <Typography variant="subtitle2" fontWeight="bold">
//                 {format(day, "EEEE, MMMM d")}
//               </Typography>

//               {events
//                 .filter((event) => isSameDay(day, event.date))
//                 .map((event) => (
//                   <Box
//                     key={event.id}
//                     sx={{
//                       p: 1.5,
//                       mt: 1,
//                       borderLeft: "4px solid",
//                       borderColor: event.color,
//                       borderRadius: 1,
//                       bgcolor: "rgba(0,0,0,0.02)",
//                     }}
//                   >
//                     <Typography variant="body2" fontWeight="medium">
//                       {format(event.date, "h:mm a")} - {event.title}
//                     </Typography>
//                   </Box>
//                 ))}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Paper>
//   )
// }

// // Yearly view component
// function YearlyView({ currentDate }) {
//   const year = currentDate.getFullYear()
//   const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1))

//   return (
//     <Paper sx={{ p: 3, height: "100%" }}>
//       <Grid container spacing={2}>
//         {months.map((month, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 bgcolor:
//                   month.getMonth() === new Date().getMonth() && month.getFullYear() === new Date().getFullYear()
//                     ? "rgba(33, 150, 243, 0.1)"
//                     : "background.paper",
//                 border: "1px solid",
//                 borderColor: "divider",
//               }}
//             >
//               <Typography variant="subtitle1" fontWeight="bold" align="center" mb={1}>
//                 {format(month, "MMMM")}
//               </Typography>
//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(7, 1fr)",
//                   gap: 0.5,
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
//                   <Box key={i} sx={{ textAlign: "center" }}>
//                     {day}
//                   </Box>
//                 ))}

//                 {/* Generate mini calendar for each month */}
//                 {(() => {
//                   const monthStart = startOfMonth(month)
//                   const monthEnd = endOfMonth(monthStart)
//                   const startDate = startOfWeek(monthStart)
//                   const endDate = endOfWeek(monthEnd)

//                   const days = []
//                   let day = startDate

//                   // Fill in empty cells for days before the month starts
//                   const firstDayOfMonth = getDay(monthStart)
//                   for (let i = 0; i < firstDayOfMonth; i++) {
//                     days.push(<Box key={`empty-${i}`} />)
//                   }

//                   // Fill in the days of the month
//                   while (day <= endDate) {
//                     if (isSameMonth(day, month)) {
//                       days.push(
//                         <Box
//                           key={day.toString()}
//                           sx={{
//                             textAlign: "center",
//                             p: 0.5,
//                             borderRadius: "50%",
//                             bgcolor: isToday(day) ? "primary.main" : "transparent",
//                             color: isToday(day) ? "white" : "inherit",
//                           }}
//                         >
//                           {format(day, "d")}
//                         </Box>,
//                       )
//                     } else {
//                       days.push(<Box key={day.toString()} />)
//                     }
//                     day = addDays(day, 1)
//                   }

//                   return days
//                 })()}
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Paper>
//   )
// }

// export default function Calendar() {
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [view, setView] = useState("month")

//   const handleViewChange = (event, newView) => {
//     if (newView !== null) {
//       setView(newView)
//     }
//   }

//   const handlePrevious = () => {
//     if (view === "month") {
//       setCurrentDate(subMonths(currentDate, 1))
//     } else if (view === "week") {
//       const newDate = new Date(currentDate)
//       newDate.setDate(currentDate.getDate() - 7)
//       setCurrentDate(newDate)
//     } else if (view === "year") {
//       const newDate = new Date(currentDate)
//       newDate.setFullYear(currentDate.getFullYear() - 1)
//       setCurrentDate(newDate)
//     }
//   }

//   const handleNext = () => {
//     if (view === "month") {
//       setCurrentDate(addMonths(currentDate, 1))
//     } else if (view === "week") {
//       const newDate = new Date(currentDate)
//       newDate.setDate(currentDate.getDate() + 7)
//       setCurrentDate(newDate)
//     } else if (view === "year") {
//       const newDate = new Date(currentDate)
//       newDate.setFullYear(currentDate.getFullYear() + 1)
//       setCurrentDate(newDate)
//     }
//   }

//   const renderDateDisplay = () => {
//     if (view === "month") {
//       return format(currentDate, "MMMM yyyy")
//     } else if (view === "week") {
//       const start = startOfWeek(currentDate)
//       const end = endOfWeek(currentDate)
//       return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`
//     } else if (view === "year") {
//       return format(currentDate, "yyyy")
//     }
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         <Paper sx={{ p: 3, mb: 3 }}>
//           <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h4" component="h1">
//               Calendar
//             </Typography>

//             <Box sx={{ display: "flex", gap: 1 }}>
//               <IconButton size="small" sx={{ bgcolor: "background.default" }}>
//                 <Search />
//               </IconButton>
//               <IconButton
//                 size="small"
//                 sx={{
//                   bgcolor: "primary.main",
//                   color: "white",
//                   "&:hover": {
//                     bgcolor: "primary.dark",
//                   },
//                 }}
//               >
//                 <Add />
//               </IconButton>
//               <IconButton size="small" sx={{ bgcolor: "background.default" }}>
//                 <MoreVert />
//               </IconButton>
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 2 }} />

//           <Box
//             sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <IconButton onClick={handlePrevious} size="small">
//                 <ChevronLeft />
//               </IconButton>

//               <Typography variant="h6" sx={{ minWidth: 200, fontWeight: "medium" }}>
//                 {renderDateDisplay()}
//               </Typography>

//               <IconButton onClick={handleNext} size="small">
//                 <ChevronRight />
//               </IconButton>

//               <Chip
//                 label="Today"
//                 onClick={() => setCurrentDate(new Date())}
//                 size="small"
//                 sx={{
//                   bgcolor: "primary.main",
//                   color: "white",
//                   "&:hover": {
//                     bgcolor: "primary.dark",
//                   },
//                 }}
//               />
//             </Box>

//             <ToggleButtonGroup
//               value={view}
//               exclusive
//               onChange={handleViewChange}
//               aria-label="calendar view"
//               size="small"
//             >
//               <ToggleButton value="month" aria-label="month view">
//                 <CalendarViewMonth fontSize="small" sx={{ mr: 0.5 }} />
//                 Month
//               </ToggleButton>
//               <ToggleButton value="week" aria-label="week view">
//                 <CalendarViewWeek fontSize="small" sx={{ mr: 0.5 }} />
//                 Week
//               </ToggleButton>
//               <ToggleButton value="year" aria-label="year view">
//                 <CalendarViewDay fontSize="small" sx={{ mr: 0.5 }} />
//                 Year
//               </ToggleButton>
//             </ToggleButtonGroup>
//           </Box>
//         </Paper>

//         <Box sx={{ height: "calc(100vh - 220px)", minHeight: 500 }}>
//           {view === "month" && (
//             <Paper sx={{ p: 3, height: "100%" }}>
//               <MonthlyCalendar currentDate={currentDate} events={events} />

//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                   Upcoming Events
//                 </Typography>
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
//                   {events
//                     .filter((event) => event.date >= new Date())
//                     .slice(0, 3)
//                     .map((event) => (
//                       <Paper
//                         key={event.id}
//                         variant="outlined"
//                         sx={{
//                           p: 2,
//                           display: "flex",
//                           alignItems: "center",
//                           borderLeft: "4px solid",
//                           borderColor: event.color,
//                           "&:hover": {
//                             bgcolor: "rgba(0,0,0,0.01)",
//                           },
//                         }}
//                       >
//                         <Box sx={{ flexGrow: 1 }}>
//                           <Typography variant="body1" fontWeight="medium">
//                             {event.title}
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {format(event.date, "EEEE, MMMM d • h:mm a")}
//                           </Typography>
//                         </Box>
//                         <Avatar sx={{ bgcolor: event.color, width: 36, height: 36 }}>{event.title.charAt(0)}</Avatar>
//                       </Paper>
//                     ))}
//                 </Box>
//                </Box>
//               </Paper>
//           )}

//           {view === "week" && <WeeklyView currentDate={currentDate} events={events} />}

//           {view === "year" && <YearlyView currentDate={currentDate} />}
//         </Box>
//       </Container>
//     </ThemeProvider>
//   )
// }




