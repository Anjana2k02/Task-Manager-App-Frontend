"use client"

import { useEffect, useState } from "react"
import { getFetcher, enpoints, getFetcherPramspdf, getFetcherPrams } from "../../utils/axios"

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  createTheme,
  ThemeProvider,
  Snackbar,
  Alert,
} from "@mui/material"

import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"

const WorkerTable = () => {
  const [workers, setWorkers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
        light: "#42a5f5",
        dark: "#1565c0",
      },
      secondary: {
        main: "#e3f2fd",
      },
    },
  })
 // worker api get all 
  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      try {
        const data = await getFetcher(enpoints.worker.viewAll)
        setWorkers(data)
        console.log("Workers data:", data)
      } catch (error) {
        console.error("Error fetching workers:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkers()
  }, [])

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.country?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const allTasks = workers.flatMap((worker) => worker.tasks || [])
  const completedTasks = allTasks.filter((task) => task.status === "Completed")
  const pendingTasks = allTasks.filter((task) => task.status === "Pending")

  const taskCards = [
    {
      title: "Total Tasks",
      count: allTasks.length,
      icon: <PeopleIcon sx={{ fontSize: 30, color: theme.palette.primary.main }} />,
      borderColor: theme.palette.primary.main,
      bgColor: theme.palette.secondary.main,
      textColor: theme.palette.primary.main,
    },
    {
      title: "Completed Tasks",
      count: completedTasks.length,
      icon: <CheckCircleIcon sx={{ fontSize: 30, color: "#2e7d32" }} />,
      borderColor: "#2e7d32",
      bgColor: "#e8f5e9",
      textColor: "#2e7d32",
    },
    {
      title: "Pending Tasks",
      count: pendingTasks.length,
      icon: <CancelIcon sx={{ fontSize: 30, color: "#c62828" }} />,
      borderColor: "#c62828",
      bgColor: "#fff8e1",
      textColor: "#c62828",
    },
  ]

  // Download PDF report function
  const downloadPDF = async () => {
    try {
      // Show loading message
      setSnackbar({
        open: true,
        message: "Generating task report...",
        severity: "info",
      })

      // Call the API to get the PDF report
      const response = await getFetcherPramspdf(enpoints.worker.taskReport)
      console.log("PDF Response:", response)

      // Create a blob from the PDF data
      const blob = new Blob([response.data], { type: "application/pdf" })

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Worker Tasks Report.pdf")

      // Append to the document, click it, and remove it
      document.body.appendChild(link)
      link.click()
      link.remove()

      // Show success message
      setSnackbar({
        open: true,
        message: "Task report downloaded successfully",
        severity: "success",
      })
    } catch (error) {
      console.error("Download error:", error)

      // Show error message
      setSnackbar({
        open: true,
        message: "Failed to download task report. Please try again.",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "24px" }}>
        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {taskCards.map((card, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: 2,
                  borderRadius: 2,
                  height: "100%",
                  borderLeft: `5px solid ${card.borderColor}`,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 4 },
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      backgroundColor: card.bgColor,
                      borderRadius: "50%",
                      p: 1.5,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: card.textColor }}>
                      {card.count}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Actions + Search */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <TextField
            placeholder="Search workers..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: 300, backgroundColor: "white", borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadPDF}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              Download
            </Button>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{ borderColor: theme.palette.primary.main, color: theme.palette.primary.main }}
            >
              Filter
            </Button>
            <IconButton color="primary" sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Table */}
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2, boxShadow: 3 }}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="styled worker table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.secondary.main }}>
                  {["First Name", "Last Name", "Email", "Country", "Expression", "Status"].map((head, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid #e0e0e0",
                        color: theme.palette.primary.dark,
                        py: 2,
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography>Loading worker data...</Typography>
                    </TableCell>
                  </TableRow>
                ) : filteredWorkers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography>No workers found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWorkers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((worker, idx) => (
                    <TableRow
                      key={worker.id || idx}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#fafafa" : "white",
                        "&:hover": { backgroundColor: "#f0f7ff" },
                      }}
                    >
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        {worker.firstName}
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        {worker.lastName}
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        {worker.email}
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        {worker.country}
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        {worker.expression}
                      </TableCell>
                      <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                        <Box
                          sx={{
                            backgroundColor:
                              worker.status === "Active"
                                ? "#e8f5e9"
                                : worker.status === "Inactive"
                                  ? "#ffebee"
                                  : "#fff8e1",
                            color:
                              worker.status === "Active"
                                ? "#2e7d32"
                                : worker.status === "Inactive"
                                  ? "#c62828"
                                  : "#f57f17",
                            borderRadius: 1,
                            px: 1,
                            py: 0.5,
                            display: "inline-block",
                            fontWeight: "medium",
                          }}
                        >
                          {worker.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredWorkers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: "1px solid #e0e0e0", backgroundColor: "#fafafa" }}
          />
        </Paper>
      </Box>

      {/* Success/Error Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default WorkerTable
