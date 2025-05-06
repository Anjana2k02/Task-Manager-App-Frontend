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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
      link.setAttribute('download', 'Worker-List-Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
        <Paper elevation={4} sx={{ p: 4 }}>
          <Stack spacing={1} mb={3}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              Worker Management
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage and view workers' data efficiently.
            </Typography>
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={3}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newDate) => setStartDate(newDate)}
                slotProps={{ textField: { size: 'small' } }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newDate) => setEndDate(newDate)}
                slotProps={{ textField: { size: 'small' } }}
              />
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1, minWidth: 200 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="contained" size="medium" onClick={downloadPDF}>
                Download PDF
              </Button>
            </Stack>
          </LocalizationProvider>

          <TableContainer component={Paper} elevation={2}>
            <Table sx={{ border: '1px solid #ccc' }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                  {['ID', 'First Name', 'Last Name', 'Email', 'Password', 'Country', 'Status', 'Expression'].map(header => (
                    <TableCell
                      key={header}
                      sx={{ fontWeight: 'bold', borderRight: '1px solid #ddd' }}
                      align="center"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {workers
                  .filter((worker) =>
                    `${worker.firstName} ${worker.lastName} ${worker.email}`.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((worker, index) => (
                    <TableRow
                      key={worker.id}
                      hover
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                        '&:last-child td, &:last-child th': { borderBottom: 0 },
                      }}
                    >
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.id}</TableCell>
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.firstName}</TableCell>
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.lastName}</TableCell>
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.email}</TableCell>
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.password}</TableCell>
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.country}</TableCell>
                      <TableCell align="center" sx={{ borderRight: '1px solid #eee' }}>{worker.status}</TableCell>
                      <TableCell align="center">{worker.expression}</TableCell>
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
