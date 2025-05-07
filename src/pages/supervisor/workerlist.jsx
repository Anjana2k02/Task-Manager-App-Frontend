"use client"

import { useEffect, useState } from "react"
import { getFetcher, enpoints, getFetcherPramspdf } from "../../utils/axios"

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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"

import {
  Search as SearchIcon,
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
  const [statusFilter, setStatusFilter] = useState("")
  const [expressionFilter, setExpressionFilter] = useState("")
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const expressionEmojiMap = {
    Happy: "😊",
    Neutral: "😐",
    Curious: "🤔",
    stressfull: "😩",
    surprised: "😲",
    Excited: "😄",
    Confident: "😎",
    Thoughtful: "💭",
    Serious: "😐",
    Joyful: "😁",
  }

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

  const fetchWorkers = async () => {
    setLoading(true)
    try {
      const data = await getFetcher(enpoints.worker.viewAll)
      const enriched = data.map((w) => ({
        ...w,
        status: w.status || "Not Started",
      }))
      setWorkers(enriched)
      console.log("Workers data:", enriched)
      setSnackbar({
        open: true,
        message: "Data refreshed successfully",
        severity: "success",
      })
    } catch (error) {
      console.error("Error fetching workers:", error)
      setSnackbar({
        open: true,
        message: "Failed to refresh data",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkers()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  const handleStatusChange = (id, newStatus) => {
    const updatedWorkers = workers.map((w) =>
      w.id === id ? { ...w, status: newStatus } : w
    )
    setWorkers(updatedWorkers)
  }

  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value)
    setPage(0)
  }

  const handleExpressionFilterChange = (event) => {
    setExpressionFilter(event.target.value)
    setPage(0)
  }

  const downloadPDF = async () => {
    try {
      setSnackbar({
        open: true,
        message: "Generating task report...",
        severity: "info",
      })

      const response = await getFetcherPramspdf(enpoints.worker.report)
      if (!response || !response.data) {
        throw new Error("Invalid response format")
      }

      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Worker Tasks Report.pdf")
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)

      setSnackbar({
        open: true,
        message: "Task report downloaded successfully",
        severity: "success",
      })
    } catch (error) {
      console.error("Download error:", error)
      setSnackbar({
        open: true,
        message: "Failed to download task report. Please try again.",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return
    setSnackbar({ ...snackbar, open: false })
  }

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.country?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter ? worker.status === statusFilter : true
    const matchesExpression = expressionFilter
      ? worker.expressionStatus === expressionFilter
      : true

    return matchesSearch && matchesStatus && matchesExpression
  })

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

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "24px" }}>
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
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 4,
                  },
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

        {/* Filter & Actions */}
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
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadPDF}
              sx={{ backgroundColor: theme.palette.primary.main }}
            >
              Download
            </Button>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select value={statusFilter} onChange={handleFilterChange} label="Status Filter">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Not Started">Not Started</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="To Do">To Do</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Expression Filter</InputLabel>
              <Select value={expressionFilter} onChange={handleExpressionFilterChange} label="Expression Filter">
                <MenuItem value="">All</MenuItem>
                {Object.keys(expressionEmojiMap).map((expression) => (
                  <MenuItem key={expression} value={expression}>
                    {expressionEmojiMap[expression]} {expression}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              color="primary"
              sx={{ border: `1px solid ${theme.palette.primary.main}` }}
              onClick={fetchWorkers} // Refresh works here
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Table */}
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2, boxShadow: 3 }}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
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
                  filteredWorkers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((worker, idx) => (
                      <TableRow
                        key={worker.id || idx}
                        sx={{
                          backgroundColor: idx % 2 === 0 ? "#fafafa" : "white",
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        }}
                      >
                        <TableCell align="center">{worker.firstName}</TableCell>
                        <TableCell align="center">{worker.lastName}</TableCell>
                        <TableCell align="center">{worker.email}</TableCell>
                        <TableCell align="center">{worker.country}</TableCell>
                        <TableCell align="center">
                          {expressionEmojiMap[worker.expressionStatus] || "❓"}{" "}
                          {worker.expressionStatus || "Unknown"}
                        </TableCell>
                        <TableCell align="center" sx={{ border: "1px solid #e0e0e0" }}>
                          <FormControl size="small" fullWidth>
                            <Select
                              value={worker.status || "Not Started"}
                              onChange={(e) => handleStatusChange(worker.id, e.target.value)}
                              sx={{
                                minWidth: 130,
                                backgroundColor:
                                  worker.status === "Completed"
                                    ? "#A1EEBD"
                                    : worker.status === "Pending"
                                    ? "#FDB7EA"
                                    : worker.status === "To Do"
                                    ? "#A1E3F9"
                                    : "#eeeeee",
                                fontWeight: 500,
                                color:
                                  worker.status === "Completed"
                                    ? "#2e7d32"
                                    : worker.status === "Pending"
                                    ? "#670D2F"
                                    : worker.status === "To Do"
                                    ? "#1565c0"
                                    : "#424242",
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: { bgcolor: "#94B4C1" },
                                },
                              }}
                            >
                              <MenuItem value="Not Started">Not Started</MenuItem>
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="To Do">To Do</MenuItem>
                              <MenuItem value="Completed">Completed</MenuItem>
                            </Select>
                          </FormControl>
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
            sx={{
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "#fafafa",
            }}
          />
        </Paper>
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default WorkerTable
