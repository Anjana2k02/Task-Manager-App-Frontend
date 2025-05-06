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
