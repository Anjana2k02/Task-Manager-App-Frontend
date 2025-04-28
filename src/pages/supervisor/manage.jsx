import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints, getFetcherPramspdf } from '../../utils/axios'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Stack, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const SupervisorTable = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = createTheme({
    palette: {
      mode: 'light', 
    },
  });

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const data = await getFetcher(enpoints.supervisor.viewAll);
        setSupervisors(data);
        console.log('Supervisors:', data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      }
    };
    fetchSupervisors();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // implement download button
  const downloadPDF = async () => {
    try {
      const response = await getFetcherPramspdf(enpoints.supervisor.report);
      console.log("PDF Response:", response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Supervisor Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, mt: 1 }}>
        <Stack spacing={1} mb={2} sx={{ borderBottom: '1px solid #ccc', pb: 1, mt: 2, mb: 4 }}>
          <Typography variant="h5" component="div">
            Supervisor Management
          </Typography>
          <Typography variant="subtitle1" component="div">
            Manage and view supervisors' data efficiently.
          </Typography>
        </Stack>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              sx={{ width: '170px' }} 
              onChange={(newDate) => setStartDate(newDate)}
              slotProps={{ textField: { size: 'small' } }}
            />

            <DatePicker
              label="End Date"
              value={endDate}
              sx={{ width: '170px' }} 
              onChange={(newDate) => setEndDate(newDate)}
              slotProps={{ textField: { size: 'small' } }}
            />

            <TextField
              label="Search"
              variant="outlined"
              size="small"
              sx={{ width: '55%' }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              onClick={downloadPDF}
            >
              Download
            </Button>
          </Stack>
        </LocalizationProvider>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="supervisor table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                {/* <TableCell>Password</TableCell> */}
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
                  {/* <TableCell>{supervisor.password}</TableCell> */}
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
      </Box>
    </ThemeProvider>
  );
};

export default SupervisorTable;
