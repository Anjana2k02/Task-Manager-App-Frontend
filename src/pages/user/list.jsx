import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints } from '../../utils/axios'; // Assuming axios functions are in a file named axios.js

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Light theme configuration for MUI
  const theme = createTheme({
    palette: {
      mode: 'light', // Set light theme
    },
  });

  // Fetching data from the API using the getFetcher function
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getFetcher(enpoints.user.viewAll); // Use API
        setUsers(data); // Update state with fetched users
        console.log('gtr', data); // Log actual data, not setUsers function
        console.log('supra');
        
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Second Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.secondName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};

export default UserTable;
