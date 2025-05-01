// import React, { useState, useEffect } from 'react';
// import { Container, Grid, Paper, Typography } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import axios from 'axios';

// const theme = createTheme({
//   palette: {
//     mode: 'light',
//   },
// });

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersResponse = await axios.get('/api/users');
//         const tasksResponse = await axios.get('/api/tasks');
//         setUsers(usersResponse.data);
//         setTasks(tasksResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//             }
//     };
//     fetchData();
//   }, []);

//   const employeeAvailabilityData = [
//     { name: 'Available', value: users.filter(user => user.status === 'Available').length },
//     { name: 'Unavailable', value: users.filter(user => user.status === 'Unavailable').length }
//   ];

//   const COLORS = ['#0088FE', '#00C49F'];

//   if (loading) {
//     return (
//       <ThemeProvider theme={theme}>
//         <Container>
//           <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>Loading...</Typography>
//         </Container>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <Typography variant="h4" sx={{ mb: 2 }}>Admin Dashboard</Typography>
//         <Grid container spacing={3}>
//           {/* Task Cards */}
//           <Grid item xs={12} md={8}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="h6">New Tasks</Typography>
//                   <Typography variant="h4">{tasks.filter(task => task.status === 'New').length}</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="h6">In Progress Tasks</Typography>
//                   <Typography variant="h4">{tasks.filter(task => task.status === 'In Progress').length}</Typography>
//                 </Paper>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <Paper sx={{ p: 2 }}>
//                   <Typography variant="h6">Completed Tasks</Typography>
//                   <Typography variant="h4">{tasks.filter(task => task.status === 'Completed').length}</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//             <Paper sx={{ p: 2, mt: 3 }}>
//               <Typography variant="h6">Employee List</Typography>
//               <ul>
//                 {users.map(user => (
//                   <li key={user.id}>{user.name}</li>
//                 ))}
//               </ul>
//             </Paper>
//           </Grid>

//           {/* Employee Availability Pie Chart on Left */}
//           <Grid item xs={12} md={4}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6">Employee Availability</Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie data={employeeAvailabilityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
//                     {employeeAvailabilityData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default AdminDashboard;
