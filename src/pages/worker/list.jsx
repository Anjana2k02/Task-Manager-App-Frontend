import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints } from '../../utils/axios'; // Assuming axios functions are in a file named axios.js

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const WorkerTable = () => {
  const [workers, setWorkers] = useState([]);
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
    const fetchWorkers = async () => {
      try {
        const data = await getFetcher(enpoints.worker.viewAll); // Use API
        setWorkers(data); // Update state with fetched workers
        console.log('Workers data:', data); // Log actual data
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
  
    fetchWorkers();
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
        <Table sx={{ minWidth: 650 }} aria-label="worker table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Expression</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((worker) => (
              <TableRow key={worker.id}>
                <TableCell>{worker.id}</TableCell>
                <TableCell>{worker.firstName}</TableCell>
                <TableCell>{worker.lastName}</TableCell>
                <TableCell>{worker.email}</TableCell>
                <TableCell>{worker.password}</TableCell>
                <TableCell>{worker.country}</TableCell>
                <TableCell>{worker.status}</TableCell>
                <TableCell>{worker.expression}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={workers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};

export default WorkerTable;
