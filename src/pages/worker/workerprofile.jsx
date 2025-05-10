"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Divider,
  Button,
  Avatar,
  AvatarGroup,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  Assignment,
  CalendarToday,
  People,
  CheckCircle,
  ArrowForward,
  Add,
  FilterList,
  Sort,
  MoreHoriz,
  AccessTime,
  Flag,
  Bolt,
  Star,
  StarBorder,
  TrendingUp,
  ArrowUpward,
  ArrowDownward,
  Search,
  Notifications,
  Circle,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"

// Enhanced Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "visible",
  borderRadius: 20,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[900]})`
      : `linear-gradient(145deg, #ffffff, #f8f9fa)`,
  boxShadow: theme.palette.mode === "dark" ? "0 10px 30px -10px rgba(0,0,0,0.3)" : "0 10px 30px -10px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow:
      theme.palette.mode === "dark" ? "0 20px 40px -15px rgba(0,0,0,0.5)" : "0 20px 40px -15px rgba(0,0,0,0.15)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  "& .MuiCardHeader-root": {
    padding: theme.spacing(3),
  },
  "& .MuiCardContent-root": {
    padding: theme.spacing(0, 3, 3, 3),
  },
}))

const ProjectCard = styled(StyledCard)(({ theme, priority }) => {
  let gradientColors

  switch (priority) {
    case "high":
      gradientColors = `${theme.palette.error.light}, ${theme.palette.error.main}`
      break
    case "medium":
      gradientColors = `${theme.palette.warning.light}, ${theme.palette.warning.main}`
      break
    case "low":
      gradientColors = `${theme.palette.success.light}, ${theme.palette.success.main}`
      break
    default:
      gradientColors = `${theme.palette.primary.light}, ${theme.palette.primary.main}`
  }

  return {
    "&::before": {
      background: `linear-gradient(90deg, ${gradientColors})`,
    },
    "& .priority-indicator": {
      position: "absolute",
      top: 16,
      right: 16,
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: theme.palette.mode === "dark" ? theme.palette.background.paper : "#ffffff",
      boxShadow: theme.palette.mode === "dark" ? "0 4px 12px rgba(0,0,0,0.3)" : "0 4px 12px rgba(0,0,0,0.1)",
      zIndex: 1,
    },
  }
})

const ScheduleCard = styled(StyledCard)(({ theme, color }) => ({
  "&::before": {
    background: color || `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
  "& .MuiCardContent-root": {
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: -40,
      right: 20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color || theme.palette.primary.main}20, transparent 70%)`,
      zIndex: 0,
    },
  },
}))

const ActivityCard = styled(StyledCard)(({ theme }) => ({
  "& .activity-item": {
    position: "relative",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      left: 24,
      top: 48,
      bottom: 0,
      width: 2,
      background: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
      zIndex: 0,
    },
    "&:last-child::after": {
      display: "none",
    },
  },
}))

const StatsCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  height: "100%",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  borderRadius: 20,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[900]})`
      : `linear-gradient(145deg, #ffffff, #f8f9fa)`,
  boxShadow: theme.palette.mode === "dark" ? "0 10px 30px -10px rgba(0,0,0,0.3)" : "0 10px 30px -10px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      theme.palette.mode === "dark" ? "0 15px 35px -10px rgba(0,0,0,0.4)" : "0 15px 35px -10px rgba(0,0,0,0.12)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${theme.palette[color].light}30, transparent 70%)`,
    transform: "translate(30%, 30%)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: 6,
    height: "30%",
    background: theme.palette[color].main,
    borderTopLeftRadius: 20,
  },
}))

const IconContainer = styled(Box)(({ theme, color }) => ({
  backgroundColor: theme.palette[color].light + "30",
  borderRadius: 16,
  padding: theme.spacing(1.5),
  marginRight: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette[color].main,
  boxShadow:
    theme.palette.mode === "dark"
      ? `0 4px 12px ${theme.palette[color].main}30`
      : `0 4px 12px ${theme.palette[color].main}20`,
}))

const GradientButton = styled(Button)(({ theme, startcolor, endcolor }) => ({
  background: `linear-gradient(90deg, ${startcolor || theme.palette.primary.main}, ${endcolor || theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  padding: "10px 20px",
  borderRadius: 12,
  "&:hover": {
    background: `linear-gradient(90deg, ${startcolor || theme.palette.primary.dark}, ${endcolor || theme.palette.secondary.dark})`,
    boxShadow: `0 4px 14px ${startcolor || theme.palette.primary.main}50`,
  },
}))

const ProgressBar = styled(LinearProgress)(({ theme, value }) => {
  let color = theme.palette.error.main
  if (value >= 30 && value < 70) color = theme.palette.warning.main
  if (value >= 70) color = theme.palette.success.main

  return {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    "& .MuiLinearProgress-bar": {
      backgroundColor: color,
      borderRadius: 5,
      backgroundImage: `linear-gradient(90deg, ${color}90, ${color})`,
    },
  }
})

const TaskItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: 12,
  transition: "all 0.2s",
  backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)",
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.03)",
    transform: "translateX(4px)",
  },
}))

const TaskBullet = styled(Box)(({ theme }) => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(1.5),
  marginTop: 6,
  boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
}))

const WelcomeBanner = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: 24,
  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  color: theme.palette.common.white,
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `radial-gradient(circle at 20% 150%, ${theme.palette.primary.light}30 0%, transparent 60%), 
                      radial-gradient(circle at 80% 50%, ${theme.palette.secondary.light}20 0%, transparent 50%)`,
  },
}))

const ChartCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  overflow: "visible",
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[900]})`
      : `linear-gradient(145deg, #ffffff, #f8f9fa)`,
  boxShadow: theme.palette.mode === "dark" ? "0 10px 30px -10px rgba(0,0,0,0.3)" : "0 10px 30px -10px rgba(0,0,0,0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow:
      theme.palette.mode === "dark" ? "0 15px 35px -10px rgba(0,0,0,0.4)" : "0 15px 35px -10px rgba(0,0,0,0.12)",
  },
  "& .MuiCardHeader-root": {
    padding: theme.spacing(3),
  },
  "& .MuiCardContent-root": {
    padding: theme.spacing(0, 3, 3, 3),
  },
}))

const StyledChip = styled(Chip)(({ theme, color }) => ({
  borderRadius: 8,
  fontWeight: 600,
  backgroundColor: color ? `${color}20` : theme.palette.primary.main + "20",
  color: color || theme.palette.primary.main,
  "& .MuiChip-label": {
    padding: "0 10px",
  },
}))

const PriorityChip = styled(Chip)(({ theme, priority }) => {
  let color
  switch (priority?.toLowerCase()) {
    case "high":
      color = theme.palette.error.main
      break
    case "medium":
      color = theme.palette.warning.main
      break
    case "low":
      color = theme.palette.success.main
      break
    default:
      color = theme.palette.info.main
  }

  return {
    borderRadius: 8,
    fontWeight: 600,
    backgroundColor: `${color}20`,
    color: color,
    "& .MuiChip-label": {
      padding: "0 10px",
    },
  }
})

// Mocked Data
const projects = [
  {
    title: "Creating Mobile App Design",
    date: "Aug 31 - Sep 3",
    progress: 5,
    tasks: ["Discussing the project", "Brainstorms", "Add Subtask"],
    team: ["JD", "AS", "MT"],
    priority: "High",
    starred: true,
    trend: "up",
  },
  {
    title: "Software Project",
    description: "Planning of software, navigation, and data",
    progress: 40,
    tags: ["A day App", "CCT 9.0"],
    team: ["JD", "KL"],
    priority: "Medium",
    starred: false,
    trend: "stable",
  },
  {
    title: "Plan Project",
    description: "Design of the planning of software, navigation, and data",
    progress: 60,
    date: "2 weeks ago",
    tags: ["CCT 9.0"],
    team: ["AS", "MT", "JD"],
    priority: "Low",
    starred: true,
    trend: "down",
  },
]

const schedule = [
  {
    title: "Creating Awesome Mobile Apps",
    type: "UI/UX Design Meeting",
    time: "09:00 - 10:00 AM",
    assigned: "Design Team",
    location: "Conference Room A",
    color: "#6366f1",
    status: "Upcoming",
  },
  {
    title: "Marketing Plan & Strategies",
    type: "Marketing Meeting",
    time: "10:00 - 11:00 AM",
    assigned: "Marketing Team",
    location: "Conference Room B",
    color: "#ec4899",
    status: "In Progress",
  },
  {
    title: "Weekly Team Standup",
    type: "Team Meeting",
    time: "01:00 - 01:30 PM",
    assigned: "All Teams",
    location: "Main Hall",
    color: "#10b981",
    status: "Upcoming",
  },
]

// Chart data
const pieData = [
  { name: "Pending", value: 10, color: "#D50B8B" },
  { name: "Developing", value: 15, color: "#e176e5" },
  { name: "Testing", value: 12, color: "#d68149" },
  { name: "QA Testing", value: 8, color: "#0baecd" },
  { name: "Completed", value: 20, color: "#10b981" },
]

// Modified project progress pie chart data with 5 sections
const projectProgressData = [
  { name: "Pending", value: 10, color: "#D50B8B" },
  { name: "Developing", value: 15, color: "#e176e5" },
  { name: "Testing", value: 12, color: "#d68149" },
  { name: "QA Testing", value: 8, color: "#0baecd" },
  { name: "Completed", value: 20, color: "#10b981" }
]


// Custom active shape for pie chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={16} fontWeight="bold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>
        {`${value} Tasks`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  )
}

const WorkerProfile = () => {
  const [tabValue, setTabValue] = useState(0)
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [starredProjects, setStarredProjects] = useState(
    projects.reduce((acc, project, index) => {
      acc[index] = project.starred || false
      return acc
    }, {})
  )
  const [activeIndex, setActiveIndex] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const currentDate = "Tue, 07 June 2025"

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const toggleStar = (index) => {
    setStarredProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return theme.palette.error.main
      case "medium":
        return theme.palette.warning.main
      case "low":
        return theme.palette.success.main
      default:
        return theme.palette.info.main
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUpward fontSize="small" style={{ color: theme.palette.success.main }} />
      case "down":
        return <ArrowDownward fontSize="small" style={{ color: theme.palette.error.main }} />
      default:
        return <TrendingUp fontSize="small" style={{ color: theme.palette.info.main }} />
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "in progress":
        return theme.palette.warning.main
      case "completed":
        return theme.palette.success.main
      case "upcoming":
        return theme.palette.info.main
      default:
        return theme.palette.primary.main
    }
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <Container maxWidth="xl">
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          width: "100%",
          py: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Welcome, Senuu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {currentDate}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            placeholder="Search"
            size="small"
            sx={{
              mr: 2,
              width: 250,
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <IconButton sx={{ mr: 2 }}>
            <Notifications />
          </IconButton>
          <Avatar src="/placeholder.svg?height=40&width=40" sx={{ width: 40, height: 40 }} />
        </Box>
      </Box>

      {/* Welcome Banner */}
      <WelcomeBanner elevation={0}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome back, Senuu!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
              You have 5 tasks due today and 8 new messages. Your team is making good progress!
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <GradientButton variant="contained" startIcon={<Add />} startcolor="#6366f1" endcolor="#8b5cf6">
                New Project
              </GradientButton>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  borderRadius: 10,
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                View Reports
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: { xs: "none", md: "block" } }}>
            <Box sx={{ position: "relative", height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  5
                </Typography>
                <Typography variant="body2">Tasks</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </WelcomeBanner>

      {/* Quick Stats Banner */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard elevation={0} color="primary">
            <IconContainer color="primary">
              <Assignment fontSize="medium" />
            </IconContainer>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Active Projects
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                4
              </Typography>
              <Typography
                variant="caption"
                color="success.main"
                sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
              >
                <Bolt sx={{ fontSize: 14, mr: 0.5 }} /> +2 this week
              </Typography>
            </Box>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard elevation={0} color="secondary">
            <IconContainer color="secondary">
              <CalendarToday fontSize="medium" />
            </IconContainer>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Tasks Due
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                4
              </Typography>
              <Typography variant="caption" color="error.main" sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                <Bolt sx={{ fontSize: 14, mr: 0.5 }} /> Due today
              </Typography>
            </Box>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard elevation={0} color="success">
            <IconContainer color="success">
              <People fontSize="medium" />
            </IconContainer>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Pending Tasks
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                5
              </Typography>
              <Typography
                variant="caption"
                color="success.main"
                sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
              >
                <Bolt sx={{ fontSize: 14, mr: 0.5 }} /> +1 new task
              </Typography>
            </Box>
          </StatsCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard elevation={0} color="warning">
            <IconContainer color="warning">
              <CheckCircle fontSize="medium" />
            </IconContainer>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Completed
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                24
              </Typography>
              <Typography
                variant="caption"
                color="success.main"
                sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
              >
                <Bolt sx={{ fontSize: 14, mr: 0.5 }} /> +8 this month
              </Typography>
            </Box>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Project Progress Chart - UPDATED TO PIE CHART WITH 5 SECTIONS */}
      <ChartCard sx={{ mb: 4 }}>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight="bold">
              Project Progress
            </Typography>
          }
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<FilterList />}
                onClick={handleFilterOpen}
                sx={{ borderRadius: 8 }}
              >
                Filter
              </Button>
              <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
                <MenuItem onClick={handleFilterClose}>All Projects</MenuItem>
                <MenuItem onClick={handleFilterClose}>Pending</MenuItem>
                <MenuItem onClick={handleFilterClose}>Developing</MenuItem>
                <MenuItem onClick={handleFilterClose}>Testing </MenuItem>
                <MenuItem onClick={handleFilterClose}>QA Testing</MenuItem>
                <MenuItem onClick={handleFilterClose}>Completed</MenuItem>
              </Menu>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={projectProgressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {projectProgressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Task Status
                </Typography>
                <List>
                  {projectProgressData.map((item, index) => (
                    <ListItem key={index} sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <Circle sx={{ color: item.color, fontSize: 14 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2">{item.name}</Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {item.value} Tasks
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Tasks: {projectProgressData.reduce((sum, item) => sum + item.value, 0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completion Rate:{" "}
                    {Math.round(
                      (projectProgressData[4].value / projectProgressData.reduce((sum, item) => sum + item.value, 0)) *
                        100
                    )}
                    %
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </ChartCard>

      {/* Tabs for different sections */}
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          sx={{
            "& .MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              minWidth: 100,
              borderRadius: "10px 10px 0 0",
              transition: "all 0.2s",
            },
            "& .Mui-selected": {
              backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
            },
          }}
        >
          <Tab label="Projects" />
          <Tab label="Schedule" />
        </Tabs>
      </Box>

      {/* Projects Tab */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Current Projects
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="outlined" size="small" startIcon={<Sort />} sx={{ borderRadius: 8 }}>
                Sort
              </Button>
              <GradientButton size="small" startIcon={<Add />}>
                New Project
              </GradientButton>
            </Box>
          </Box>
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <ProjectCard elevation={0} priority={project.priority.toLowerCase()}>
                  <div className="priority-indicator">{getTrendIcon(project.trend)}</div>
                  <CardHeader
                    title={
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="h6" fontWeight="bold" noWrap>
                          {project.title}
                        </Typography>
                        <IconButton size="small" onClick={() => toggleStar(index)} sx={{ ml: 1 }}>
                          {starredProjects[index] ? <Star sx={{ color: "#f59e0b" }} /> : <StarBorder />}
                        </IconButton>
                      </Box>
                    }
                    action={
                      <IconButton sx={{ ml: 1 }}>
                        <MoreHoriz />
                      </IconButton>
                    }
                    sx={{ pb: 0 }}
                  />
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 1 }}>
                      <PriorityChip label={project.priority} size="small" priority={project.priority} />
                      {project.date && (
                        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                          <AccessTime fontSize="small" sx={{ color: "text.secondary", mr: 1, fontSize: 16 }} />
                          <Typography variant="body2" color="text.secondary">
                            {project.date}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {project.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>
                    )}

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" fontWeight="medium">
                          Progress
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {project.progress}%
                        </Typography>
                      </Box>
                      <ProgressBar variant="determinate" value={project.progress} />
                    </Box>

                    {project.tasks && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
                          Tasks:
                        </Typography>
                        {project.tasks.map((task, i) => (
                          <TaskItem key={i}>
                            <TaskBullet />
                            <Typography variant="body2">{task}</Typography>
                          </TaskItem>
                        ))}
                      </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {project.team && (
                        <AvatarGroup
                          max={3}
                          sx={{
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              fontSize: "0.875rem",
                              border: "2px solid",
                              borderColor: theme.palette.background.paper,
                            },
                          }}
                        >
                          {project.team.map((member, i) => (
                            <Avatar key={i} alt={member} src={`/placeholder.svg?height=32&width=32&text=${member}`} />
                          ))}
                        </AvatarGroup>
                      )}

                      {project.tags && (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {project.tags.map((tag, i) => (
                            <StyledChip key={i} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </CardContent>
                </ProjectCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Schedule Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Today's Schedule
            </Typography>
            <GradientButton size="small" startIcon={<Add />}>
              Add Event
            </GradientButton>
          </Box>
          <Grid container spacing={3}>
            {schedule.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <ScheduleCard elevation={0} color={item.color}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <Avatar
                        sx={{
                          bgcolor: item.color + "20",
                          color: item.color,
                          mr: 2,
                          boxShadow: `0 4px 12px ${item.color}30`,
                        }}
                      >
                        <CalendarToday fontSize="small" />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <Typography variant="h6" fontWeight="bold">
                            {item.title}
                          </Typography>
                          <StyledChip label={item.status} size="small" color={getStatusColor(item.status)} />
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.type}
                        </Typography>
                        <Divider sx={{ my: 1.5 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <AccessTime fontSize="small" sx={{ color: "text.secondary", mr: 1, fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                {item.time}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <People fontSize="small" sx={{ color: "text.secondary", mr: 1, fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                {item.assigned}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Flag fontSize="small" sx={{ color: "text.secondary", mr: 1, fontSize: 16 }} />
                              <Typography variant="body2" color="text.secondary">
                                {item.location}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                          <Button variant="outlined" size="small" sx={{ mr: 1, borderRadius: 8 }}>
                            Details
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              borderRadius: 8,
                              bgcolor: item.color,
                              "&:hover": {
                                bgcolor: item.color + "dd",
                              },
                            }}
                          >
                            Join
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </ScheduleCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Activity Tab */}
      {tabValue === 2 && (
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold">
              Recent Activity
            </Typography>
            <Button variant="outlined" size="small" endIcon={<ArrowForward />} sx={{ borderRadius: 8 }}>
              View All
            </Button>
          </Box>
          <ActivityCard elevation={0}>
            <CardContent sx={{ p: 0 }}>
              {recentActivities.map((activity, index) => (
                <Box key={index} className="activity-item" sx={{ p: 3, display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={activity.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      border: "3px solid",
                      borderColor: activity.color + "40",
                      boxShadow: `0 4px 12px ${activity.color}30`,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">
                      <Typography component="span" fontWeight="bold">
                        {activity.user}
                      </Typography>{" "}
                      {activity.action}{" "}
                      <Typography component="span" fontWeight="medium" color="primary.main">
                        {activity.item}
                      </Typography>
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                      {activity.time}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                      "&:hover": {
                        bgcolor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                      },
                    }}
                  >
                    <MoreHoriz fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </CardContent>
          </ActivityCard>
        </Box>
      )}
    </Container>
  )
}

export default WorkerProfile