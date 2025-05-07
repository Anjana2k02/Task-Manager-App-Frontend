import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, Box, Stack, Typography, TextField, Button
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

const WorkerTable = () => {
  const [workers, setWorkers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getFetcher(enpoints.worker.viewAll);
        setWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, []);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const downloadPDF = async () => {
    try {
      const response = await getFetcherPramspdf(enpoints.worker.report);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Worker_Report.pdf');
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
            🛠️ Worker Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            View and manage worker records efficiently.
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
                  {['ID', 'First Name', 'Last Name', 'Email', 'Country', 'Status', 'Expression'].map((header) => (
                    <TableCell key={header}><strong>{header}</strong></TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {workers
                  .filter((w) =>
                    `${w.firstName} ${w.lastName} ${w.email}`.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((w) => (
                    <TableRow
                      key={w.id}
                      hover
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#caf0f8',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <TableCell>{w.id}</TableCell>
                      <TableCell>{w.firstName}</TableCell>
                      <TableCell>{w.lastName}</TableCell>
                      <TableCell>{w.email}</TableCell>
                      <TableCell>{w.country}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 0.5,
                            backgroundColor: w.status === 'Active' ? '#90be6d' : '#f94144',
                            color: '#fff',
                            borderRadius: '12px',
                            display: 'inline-block',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >
                          {w.status}
                        </Box>
                      </TableCell>
                      <TableCell>{w.expression}</TableCell>
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
            sx={{ mt: 2 }}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default WorkerTable;
