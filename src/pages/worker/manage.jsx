import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints, getFetcherPramspdf } from '../../utils/axios';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
  Box, Stack, Typography, TextField, Button, Select, MenuItem
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const WorkerTable = () => {
  const [workers, setWorkers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const theme = createTheme({ palette: { mode: 'light' } });

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getFetcher(enpoints.worker.viewAll);
        setWorkers(data);
        console.log('Workers:', data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };
    fetchWorkers();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setWorkers(prev =>
      prev.map(worker => worker.id === id ? { ...worker, status: newStatus } : worker)
    );
  };

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
      link.setAttribute('download', 'Worker-List-Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  // Style helper
  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return '#FFF176'; // yellow
      case 'In Progress':
        return '#81D4FA'; // light blue
      case 'Complete':
        return '#AED581'; // light green
      default:
        return 'white';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2, mt: 1 }}>
        <Stack spacing={1} mb={2} sx={{ borderBottom: '1px solid #ccc', pb: 1, mt: 2, mb: 4 }}>
          <Typography variant="h5">Worker Management</Typography>
          <Typography variant="subtitle1">Manage and view workers' data efficiently.</Typography>
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

            <Button variant="contained" color="primary" size="small" onClick={downloadPDF}>
              Download
            </Button>
          </Stack>
        </LocalizationProvider>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="worker table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Expression</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workers
                .filter(worker =>
                  worker.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  worker.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  worker.email?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell>{worker.id}</TableCell>
                    <TableCell>{worker.firstName}</TableCell>
                    <TableCell>{worker.lastName}</TableCell>
                    <TableCell>{worker.email}</TableCell>
                    <TableCell>{worker.country}</TableCell>
                    <TableCell>
                      <Select
                        value={worker.status || ''}
                        size="small"
                        onChange={(e) => handleStatusChange(worker.id, e.target.value)}
                        sx={{
                          backgroundColor: getStatusColor(worker.status),
                          borderRadius: '5px',
                          minWidth: 120,
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              backgroundColor: '#f9f9f9'
                            }
                          }
                        }}
                      >
                        <MenuItem value="To Do" sx={{ backgroundColor: '#FFF176' }}>To Do</MenuItem>
                        <MenuItem value="In Progress" sx={{ backgroundColor: '#81D4FA' }}>In Progress</MenuItem>
                        <MenuItem value="Complete" sx={{ backgroundColor: '#AED581' }}>Complete</MenuItem>
                      </Select>
                    </TableCell>
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
      </Box>
    </ThemeProvider>
  );
};

export default WorkerTable;
