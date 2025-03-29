import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints } from '../../utils/axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SupervisorTable = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Light theme configuration for MUI
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  // Fetching data from the API using the getFetcher function
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const data = await getFetcher(enpoints.supervisor.viewAll);
        setSupervisors(data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };

    fetchSupervisors();
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
        <Table sx={{ minWidth: 650 }} aria-label="supervisor table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supervisors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supervisor) => (
              <TableRow key={supervisor.id}>
                <TableCell>{supervisor.id}</TableCell>
                <TableCell>{supervisor.firstName}</TableCell>
                <TableCell>{supervisor.lastName}</TableCell>
                <TableCell>{supervisor.email}</TableCell>
                <TableCell>{supervisor.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={supervisors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
};

export default SupervisorTable;
