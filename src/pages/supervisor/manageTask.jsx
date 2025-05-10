"use client"

import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Collapse,
  Box,
  Typography,
  Select,
  MenuItem,
  Chip,
  Tooltip,
  LinearProgress,
} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import FilterListIcon from "@mui/icons-material/FilterList"
import RefreshIcon from "@mui/icons-material/Refresh"
import SearchIcon from "@mui/icons-material/Search"
import { styled } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import { getFetcher, patchProgressFetcher, enpoints } from "../../utils/axios"

// Progress options with colors
const progressOptions = {
  0: { label: "Pending", color: "#E5E5E5", textColor: "#666666", lightBg: "#F5F5F5" },
  1: { label: "Developing", color: "#2196F3", textColor: "#FFFFFF", lightBg: "#E3F2FD" },
  2: { label: "Testing", color: "#FF9800", textColor: "#FFFFFF", lightBg: "#FFF3E0" },
  3: { label: "Q/A Complete", color: "#9C27B0", textColor: "#FFFFFF", lightBg: "#F3E5F5" },
  4: { label: "Completed", color: "#4CAF50", textColor: "#FFFFFF", lightBg: "#E8F5E9" },
}

// Custom styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  border: "1px solid #E0E0E0",
  "&:hover": {
    backgroundColor: theme.palette.common.white,
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))

const ProgressSelect = styled(Select)(({ theme, value }) => {
  const progressColor = progressOptions[value]?.lightBg || theme.palette.background.paper
  return {
    backgroundColor: progressColor,
    borderRadius: "4px",
    "&:before": {
      borderColor: progressOptions[value]?.color,
    },
    "&:hover:not(.Mui-disabled):before": {
      borderColor: progressOptions[value]?.color,
    },
    "& .MuiSelect-select": {
      paddingRight: "32px",
    },
  }
})

const TaskManageTable = () => {
  const [tasks, setTasks] = useState([])
  const [expandedRows, setExpandedRows] = useState({})
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Custom theme with blue primary color
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#2196F3", // Blue color as requested
        light: "#64B5F6",
        dark: "#1976D2",
      },
      secondary: {
        main: "#F50057",
      },
      background: {
        default: "#F9FAFC", // Light gray background similar to Jira
        paper: "#FFFFFF",
      },
      text: {
        primary: "#172B4D", // Jira-like text color
        secondary: "#6B778C",
      },
    },
    typography: {
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
            borderRadius: 8,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: "16px",
            borderBottom: "1px solid #F0F0F0",
          },
          head: {
            fontWeight: 600,
            backgroundColor: "#F4F5F7", // Jira-like header background
            color: "#172B4D",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#F4F9FF",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  })

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const data = await getFetcher(enpoints.task.viewAll)
        // const filteredTasks = data.filter((task) => task.userId === "dev014")
        setTasks(data)
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleToggleRow = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleChangeProgress = async (taskId, newProgress) => {
    try {
      await patchProgressFetcher(taskId, newProgress)
      console.log("Progress updated successfully:", taskId, newProgress)
      // Update the local state
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, progress: newProgress } : task)))
    } catch (error) {
      console.error("Error updating progress:", error)
    }
  }

  const handleChangePage = (event, newPage) => setPage(newPage)

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleRefresh = async () => {
    setLoading(true)
    try {
      const data = await getFetcher(enpoints.task.viewAll)
      setTasks(data)
      console.log("all task" ,data);
      
    } catch (error) {
      console.error("Error refreshing tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    setPage(0)
  }

  // Filter tasks based on search term
//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       task.description.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

  // Get priority chip color
  const getPriorityColor = (priority) => {
    // Check if priority is a string before calling toLowerCase
    // If it's not a string or is null/undefined, use a default value
    const priorityStr = typeof priority === "string" ? priority.toLowerCase() : String(priority || "").toLowerCase()

    switch (priorityStr) {
      case "high":
        return { bg: "#FFEBEE", color: "#D32F2F" }
      case "medium":
        return { bg: "#FFF8E1", color: "#FFA000" }
      case "low":
        return { bg: "#E8F5E9", color: "#388E3C" }
      default:
        return { bg: "#E8EAF6", color: "#3F51B5" }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
            Task Management
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search tasks..."
                inputProps={{ "aria-label": "search" }}
                value={searchTerm}
                onChange={handleSearch}
              />
            </Search>
            <Tooltip title="Filter">
              <IconButton size="small" sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton size="small" onClick={handleRefresh} sx={{ bgcolor: "background.paper", boxShadow: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          These tasks are assigned to you. Track your progress and update status as you work.
        </Typography>

        {loading && <LinearProgress sx={{ mb: 2 }} />}

        <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #E0E0E0" }}>
          <Table aria-label="task table">
            <TableHead>
              <TableRow>
                <TableCell width="10%">
                  <strong>T-No</strong>
                </TableCell>
                <TableCell width="35%">
                  <strong>Task</strong>
                </TableCell>
                <TableCell width="25%">
                  <strong>Progress</strong>
                </TableCell>
                <TableCell width="15%">
                  <strong>Priority</strong>
                </TableCell>
                <TableCell width="15%" align="center">
                  <strong>Details</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => {
                const priorityStyle = getPriorityColor(task.priority)
                return (
                  <React.Fragment key={task.id}>
                    <TableRow hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: "primary.main" }}>
                          {task.t_no}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {task.task}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <ProgressSelect
                          value={task.progress}
                          onChange={(e) => handleChangeProgress(task.id, e.target.value)}
                          variant="outlined"
                          size="small"
                          sx={{
                            minWidth: 150,
                            fontSize: 14,
                            fontWeight: 500,
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                borderRadius: 2,
                                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                              },
                            },
                          }}
                        >
                          {Object.entries(progressOptions).map(([value, { label, color, lightBg }]) => (
                            <MenuItem
                              key={value}
                              value={Number.parseInt(value)}
                              sx={{
                                borderLeft: `4px solid ${color}`,
                                "&.Mui-selected": {
                                  backgroundColor: lightBg,
                                  "&:hover": {
                                    backgroundColor: lightBg,
                                  },
                                },
                                "&:hover": {
                                  backgroundColor: lightBg,
                                },
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: "50%",
                                    bgcolor: color,
                                    mr: 1,
                                  }}
                                />
                                {label}
                              </Box>
                            </MenuItem>
                          ))}
                        </ProgressSelect>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={task.priority}
                          size="small"
                          sx={{
                            backgroundColor: priorityStyle.bg,
                            color: priorityStyle.color,
                            fontWeight: 500,
                            borderRadius: "4px",
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleToggleRow(task.id)}
                          sx={{
                            color: "primary.main",
                            backgroundColor: expandedRows[task.id] ? "rgba(33, 150, 243, 0.08)" : "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(33, 150, 243, 0.12)",
                            },
                          }}
                        >
                          {expandedRows[task.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5} sx={{ paddingBottom: 0, paddingTop: 0, border: "none" }}>
                        <Collapse in={expandedRows[task.id]} timeout="auto" unmountOnExit>
                          <Box
                            sx={{
                              m: 2,
                              p: 2,
                              borderRadius: 2,
                              backgroundColor: "#F8FAFD",
                              border: "1px solid #E3F2FD",
                            }}
                          >
                            <Typography variant="subtitle2" sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}>
                              Task Details
                            </Typography>

                            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, mb: 2 }}>
                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
                                >
                                  Description
                                </Typography>
                                <Typography variant="body2">{task.description}</Typography>
                              </Box>

                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
                                >
                                  Supervisor
                                </Typography>
                                <Typography variant="body2">{task.supervisorId}</Typography>
                              </Box>

                              <Box>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
                                >
                                  Due Date
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: new Date(task.dueDate) < new Date() ? "error.main" : "text.primary",
                                    fontWeight: new Date(task.dueDate) < new Date() ? 500 : 400,
                                  }}
                                >
                                  {task.dueDate}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ mt: 2, pt: 2, borderTop: "1px dashed #E0E0E0" }}>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                Progress Status:
                                <Box
                                  component="span"
                                  sx={{
                                    ml: 1,
                                    color: progressOptions[task.progress].color,
                                    fontWeight: 500,
                                  }}
                                >
                                  {progressOptions[task.progress].label}
                                </Box>
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={(task.progress / 4) * 100}
                                sx={{
                                  mt: 1,
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: "#E0E0E0",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: progressOptions[task.progress].color,
                                  },
                                }}
                              />
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                )
              })}
              {tasks.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" sx={{ color: "text.secondary" }}>
                      {searchTerm ? "No tasks match your search criteria" : "No tasks available"}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: "1px solid #F0F0F0",
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                color: "text.secondary",
              },
            }}
          />
        </TableContainer>
      </Paper>
    </ThemeProvider>
  )
}

export default TaskManageTable
