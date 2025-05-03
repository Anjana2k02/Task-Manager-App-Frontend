import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints } from '../../utils/axios'; // Update path if needed

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const supervisorTable = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  useEffect(() => {
    const fetchsupervisors = async () => {
      try {
        // console.log("Fetching from:", enpoints.supervisor.viewAll); // Debug line
        const data = await getFetcher(enpoints.supervisor.viewAll);
        setSupervisors(data);
        console.log('senuuuuuuuu', data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };

    fetchsupervisors();
  }, []);

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
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supervisors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supervisor) => (
              <TableRow key={supervisor.id}>
                <TableCell>{supervisor.supervisor || 'Untitled'}</TableCell>
                <TableCell>{supervisor.description || 'No Description'}</TableCell>
                <TableCell>
                  {supervisor.dueDate
                    ? new Date(supervisor.dueDate).toLocaleDateString()
                    : 'No Due Date'}
                </TableCell>
                <TableCell>{supervisor.priority ?? 'Unknown'}</TableCell>
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

export default supervisorTable;
// merggggggggggggggggg