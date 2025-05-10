import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  TablePagination, Box, Stack, Typography, TextField, Button
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { getFetcher, enpoints, getFetcherPramspdf } from '../../utils/axios'

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
})

const UserTable = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getFetcher(enpoints.user.viewAll)
        setUsers(data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }
    fetchUsers()
  }, [])

  const handleChangePage = (event, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const downloadPDF = async () => {
    try {
      const response = await getFetcherPramspdf(enpoints.user.report)
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'User_Report.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error("Download error:", error)
    }
  }

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
            👥 User Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            View and manage user records efficiently.
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
                  <TableCell><strong>Second Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Password</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((u) =>
                    u.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.secondName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#caf0f8',
                          cursor: 'pointer',
                        }
                      }}
                    >
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
            sx={{ mt: 2 }}
          />
        </Paper>
      </Box>
    </ThemeProvider>
  )
}

export default UserTable
