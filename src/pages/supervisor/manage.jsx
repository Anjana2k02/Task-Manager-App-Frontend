import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Box, Stack, Typography, TextField, Button
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getFetcher, enpoints, getFetcherPramspdf } from '../../utils/axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077b6',
    },
    background: {
      default: '#f0f4f8',
    },
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

const SupervisorTable = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadPDF = async () => {
    try {
      const response = await getFetcherPramspdf(enpoints.supervisor.report);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Supervisor_Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h4" sx={{ color: '#0077b6', mb: 1, fontWeight: 600 }}>
            👷 Supervisor Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            View and manage supervisor records with style.
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" sx={{ mb: 4 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                slotProps={{ textField: { size: 'small', variant: 'outlined' } }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newDate) => setEndDate(newDate)}
                slotProps={{ textField: { size: 'small', variant: 'outlined' } }}
              />
              <TextField
                label="Search by name or email"
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={downloadPDF}
                sx={{ textTransform: 'none' }}
              >
                ⬇️ Download PDF
              </Button>
            </Stack>
          </LocalizationProvider>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#90e0ef' }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>First Name</strong></TableCell>
                  <TableCell><strong>Last Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {supervisors
                  .filter((s) =>
                    s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((s) => (
                    <TableRow
                      key={s.id}
                      hover
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#caf0f8',
                          cursor: 'pointer',
                        }
                      }}
                    >
                      <TableCell>{s.id}</TableCell>
                      <TableCell>{s.firstName}</TableCell>
                      <TableCell>{s.lastName}</TableCell>
                      <TableCell>{s.email}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            backgroundColor: s.status === 'Active' ? '#90be6d' : '#f94144',
                            color: '#fff',
                            borderRadius: '12px',
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >
                          {s.status}
                        </Box>
                      </TableCell>
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
            sx={{ mt: 2 }}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default SupervisorTable;
