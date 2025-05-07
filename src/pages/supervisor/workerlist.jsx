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
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material"

import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Mood as HappyIcon,
  SentimentVerySatisfied as JoyfulIcon,
  SentimentSatisfied as NeutralIcon,
  SentimentNeutral as ThoughtfulIcon,
  SentimentDissatisfied as StressfulIcon,
  SentimentVeryDissatisfied as SeriousIcon,
  EmojiEmotions as ExcitedIcon,
  TagFaces as SurpriseIcon,
  Psychology as CuriousIcon,
  SelfImprovement as ConfidentIcon,
} from "@mui/icons-material"

const WorkerTable = () => {
  const [workers, setWorkers] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [selectedExpressionFilter, setSelectedExpressionFilter] = useState("")

  // Expression configuration
  const expressionConfig = {
    Happy: {
      icon: <HappyIcon fontSize="small" />,
      color: "#4caf50",
      bgColor: "#e8f5e9",
    },
    Surprise: {
      icon: <SurpriseIcon fontSize="small" />,
      color: "#2196f3",
      bgColor: "#e3f2fd",
    },
    Stressful: {
      icon: <StressfulIcon fontSize="small" />,
      color: "#f44336",
      bgColor: "#ffebee",
    },
    Excited: {
      icon: <ExcitedIcon fontSize="small" />,
      color: "#ff9800",
      bgColor: "#fff3e0",
    },
    Curious: {
      icon: <CuriousIcon fontSize="small" />,
      color: "#9c27b0",
      bgColor: "#f3e5f5",
    },
    Confident: {
      icon: <ConfidentIcon fontSize="small" />,
      color: "#00acc1",
      bgColor: "#e0f7fa",
    },
    Thoughtful: {
      icon: <ThoughtfulIcon fontSize="small" />,
      color: "#5c6bc0",
      bgColor: "#e8eaf6",
    },
    Serious: {
      icon: <SeriousIcon fontSize="small" />,
      color: "#6d4c41",
      bgColor: "#efebe9",
    },
    Joyful: {
      icon: <JoyfulIcon fontSize="small" />,
      color: "#ffa000",
      bgColor: "#fff8e1",
    },
    Neutral: {
      icon: <NeutralIcon fontSize="small" />,
      color: "#616161",
      bgColor: "#f5f5f5",
    },
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3f51b5",
        light: "#757de8",
        dark: "#002984",
      },
      secondary: {
        main: "#f5f5f5",
      },
      success: {
        main: "#4caf50",
        contrastText: "#fff",
      },
      error: {
        main: "#f44336",
        contrastText: "#fff",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderLeft: "4px solid",
            borderLeftColor: "#3f51b5",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderCollapse: "separate",
            borderSpacing: "0 8px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold",
            backgroundColor: "#3f51b5",
            color: "#fff",
          },
          root: {
            borderBottom: "none",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "rgba(63, 81, 181, 0.04)",
            },
          },
        },
      },
    },
  })

  const fetchWorkers = async (showRefreshMessage = false) => {
    if (!loading) setRefreshing(true)
    if (showRefreshMessage) {
      setSnackbar({
        open: true,
        message: "Refreshing data...",
        severity: "info",
      })
    }
    setLoading(true)
    try {
      const data = await getFetcher(enpoints.worker.viewAll)
      setWorkers(data)
      console.log("Workers data:", data)
    } catch (error) {
      console.error("Error fetching workers:", error)
      setSnackbar({
        open: true,
        message: "Failed to fetch workers. Please try again.",
        severity: "error",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
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

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleExpressionSelect = (expression) => {
    setSelectedExpressionFilter(expression)
    setPage(0)
    handleFilterClose()
  }

  const handleClearFilter = () => {
    setSelectedExpressionFilter("")
    setPage(0)
    handleFilterClose()
  }

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.country?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesExpression =
      selectedExpressionFilter === "" ||
      worker.expressionStatus === selectedExpressionFilter

    return matchesSearch && matchesExpression
  })

  const activeWorkers = workers.filter((worker) => worker.status === "Active")
  const inactiveWorkers = workers.filter((worker) => worker.status === "Inactive")

  const downloadPDF = async () => {
    try {
      setSnackbar({
        open: true,
        message: "Generating report...",
        severity: "info",
      })

      const response = await getFetcherPramspdf(enpoints.worker.report)
      console.log("PDF Response:", response)

      const blob = new Blob([response.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "Worker Report.pdf")
      document.body.appendChild(link)
      link.click()
      link.remove()

      setSnackbar({
        open: true,
        message: "Report downloaded successfully",
        severity: "success",
      })
    } catch (error) {
      console.error("Download error:", error)
      setSnackbar({
        open: true,
        message: "Failed to download report. Please try again.",
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

  // Get expression config or default if not found
  const getExpressionConfig = (expression) => {
    return expressionConfig[expression] || {
      icon: <NeutralIcon fontSize="small" />,
      color: "#616161",
      bgColor: "#f5f5f5",
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "24px", backgroundColor: "#f9fafc" }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">All Workers</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>{workers.length}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeftColor: theme.palette.success.main }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon sx={{ fontSize: 40, color: theme.palette.success.main, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Active Workers</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.success.main }}>
                    {activeWorkers.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ borderLeftColor: theme.palette.error.main }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <CancelIcon sx={{ fontSize: 40, color: theme.palette.error.main, mr: 2 }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Inactive Workers</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.error.main }}>
                    {inactiveWorkers.length}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          mb: 3, 
          flexWrap: "wrap", 
          gap: 2,
          backgroundColor: "#fff",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <TextField
            placeholder="Search workers..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ 
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#e0e0e0",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.primary.main,
                }
              }
            }}
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
              sx={{
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: theme.palette.primary.dark
                }
              }}
            >
              Download
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />} 
              sx={{ 
                borderColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                textTransform: "none",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                }
              }} 
              onClick={handleFilterClick}
            >
              Filter
            </Button>
            <IconButton 
              color="primary" 
              sx={{ 
                border: `1px solid ${theme.palette.primary.light}`,
                "&:hover": {
                  backgroundColor: "rgba(63, 81, 181, 0.08)"
                }
              }} 
              onClick={() => fetchWorkers(true)}
            >
              {refreshing ? <CircularProgress size={24} color="inherit" /> : <RefreshIcon />}
            </IconButton>
          </Box>
        </Box>

        <Menu 
          anchorEl={filterAnchorEl} 
          open={Boolean(filterAnchorEl)} 
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              minWidth: 200,
              maxHeight: 400,
              overflow: "auto",
            }
          }}
        >
          {Object.entries(expressionConfig).map(([expression, config]) => (
            <MenuItem 
              key={expression}
              onClick={() => handleExpressionSelect(expression)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                backgroundColor: selectedExpressionFilter === expression ? config.bgColor : "inherit",
                "&:hover": {
                  backgroundColor: `${config.bgColor} !important`,
                  opacity: 0.9
                }
              }}
            >
              <Box sx={{ color: config.color }}>
                {config.icon}
              </Box>
              <Typography variant="body1">{expression}</Typography>
            </MenuItem>
          ))}
          <MenuItem 
            onClick={handleClearFilter} 
            sx={{ 
              fontStyle: "italic",
              color: theme.palette.primary.main,
              borderTop: "1px solid #e0e0e0",
              mt: 1,
              justifyContent: "center"
            }}
          >
            Clear Filter
          </MenuItem>
        </Menu>

        <TableContainer 
          component={Paper}
          sx={{
            borderRadius: "8px",
            boxShadow: "none",
            border: `1px solid #e0e0e0`,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Expression Status</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredWorkers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((worker) => {
                const expression = worker.expressionStatus || "Neutral"
                const config = getExpressionConfig(expression)
                return (
                  <TableRow key={worker.id}>
                    <TableCell>{worker.firstName}</TableCell>
                    <TableCell>{worker.lastName}</TableCell>
                    <TableCell>{worker.email}</TableCell>
                    <TableCell>{worker.country}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          padding: "6px 12px",
                          borderRadius: "16px",
                          backgroundColor: config.bgColor,
                          color: config.color,
                          width: "fit-content"
                        }}
                      >
                        <Box sx={{ display: "flex" }}>
                          {config.icon}
                        </Box>
                        {worker.expressionStatus}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "12px",
                          backgroundColor: worker.status === "Active" 
                            ? "rgba(76, 175, 80, 0.1)" 
                            : "rgba(244, 67, 54, 0.1)",
                          color: worker.status === "Active" 
                            ? theme.palette.success.main 
                            : theme.palette.error.main,
                        }}
                      >
                        {worker.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredWorkers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            border: `1px solid #e0e0e0`,
            borderTop: "none",
            borderRadius: "0 0 8px 8px",
          }}
        />

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={4000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}

export default WorkerTable