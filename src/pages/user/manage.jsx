import React, { useEffect, useState } from 'react';
import { getFetcher, enpoints, getFetcherPramspdf } from '../../utils/axios'; 

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, Stack, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const UserTable = () => {
  const [users, setUsers] = useState([]);
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
    const fetchUsers = async () => {
      try {
        const data = await getFetcher(enpoints.user.viewAll);
        setUsers(data); 
        console.log('gtr', data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const downloadPDF = async () => {
    setpdflorading(true);

    // const acc = {
    //   from_date: moment(filters.startDate).format('YYYY-MM-DD'),
    //   to_date: moment(filters.endDate).format('YYYY-MM-DD'),
    // };
    // console.log({ acc });

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const response = await getFetcherPramspdf(enpoints.user.report, config);
      console.log("PDF Response:", response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'User Report Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove(); // Remove link after clicking

    //   setpdflorading(false);
    } catch (error) {
      console.error("Download error:", error);

    //   enqueueSnackbar('Something went wrong! Please check the selected date!', {
    //     variant: 'warning',
    //     autoHideDuration: 7000,
    //     anchorOrigin: { vertical: 'top', horizontal: 'center' },
    //     sx: {
    //       width: '500px',
    //     },
    //   });

    //   setpdflorading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 , mt: 1 }}>
        {/* Heading and Subheading */}
        <Stack spacing={1} mb={2} sx={{ borderBottom: '1px solid #ccc', pb: 1, mt: 2, mb: 4 }}>
          <Typography variant="h5" component="div">
            User Management
          </Typography>
          <Typography variant="subtitle1" component="div">
            Manage and view users' data efficiently.
          </Typography>
        </Stack>

        {/* Filter and Date Selection in a Single Row */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            {/* Start Date Picker */}
            <DatePicker
              label="Start Date"
              value={startDate}
              sx={{ width: '170px' }} 
              onChange={(newDate) => setStartDate(newDate)}
              slotProps={{ textField: { size: 'small' } }}
            />

            {/* End Date Picker */}
            <DatePicker
              label="End Date"
              value={endDate}
              sx={{ width: '170px' }} 
              onChange={(newDate) => setEndDate(newDate)}
              slotProps={{ textField: { size: 'small' } }}
            />

            {/* Search Bar with Reduced Width */}
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              sx={{ width: '55%' }} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Download Button */}
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

        {/* Table Container */}
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

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </ThemeProvider>
  );
};

export default UserTable;
