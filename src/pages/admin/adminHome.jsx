import { useState } from "react";
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
} from "@mui/material";
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
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

// Styled Components
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
}));

const ProgressBar = styled(LinearProgress)(({ theme, value }) => {
  let color = theme.palette.error.main;
  if (value >= 30 && value < 70) color = theme.palette.warning.main;
  if (value >= 70) color = theme.palette.success.main;

  return {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
    "& .MuiLinearProgress-bar": {
      backgroundColor: color,
      borderRadius: 5,
      backgroundImage: `linear-gradient(90deg, ${color}90, ${color})`,
    },
  };
});

// Mock Data
const tasks = [
  { title: "Task 1", progress: 80, priority: "High", status: "In Progress" },
  { title: "Task 2", progress: 50, priority: "Medium", status: "In Progress" },
  { title: "Task 3", progress: 100, priority: "Low", status: "Completed" },
];

const taskProgressData = [
  { name: "Completed", value: 10, color: "#10b981" },
  { name: "In Progress", value: 5, color: "#f59e0b" },
  { name: "Pending", value: 3, color: "#ef4444" },
];

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

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
            Admin Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Overview of tasks and team progress
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

      {/* Task Progress Chart */}
      <StyledCard sx={{ mb: 4 }}>
        <CardHeader
          title={
            <Typography variant="h6" fontWeight="bold">
              Task Progress
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
                <MenuItem onClick={handleFilterClose}>All Tasks</MenuItem>
                <MenuItem onClick={handleFilterClose}>Completed Tasks</MenuItem>
                <MenuItem onClick={handleFilterClose}>Pending Tasks</MenuItem>
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
                      data={taskProgressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {taskProgressData.map((entry, index) => (
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
                  {taskProgressData.map((item, index) => (
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
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

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
          <Tab label="Tasks" />
          <Tab label="Team" />
          <Tab label="Activity" />
        </Tabs>
      </Box>

      {/* Tasks Tab */}
      {tabValue === 0 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Current Tasks
          </Typography>
          <Grid container spacing={3}>
            {tasks.map((task, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <StyledCard>
                  <CardHeader
                    title={
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {task.title}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight="medium">
                        Progress
                      </Typography>
                      <ProgressBar variant="determinate" value={task.progress} />
                      <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                        {task.progress}%
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Priority: {task.priority}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {task.status}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Team Tab */}
      {tabValue === 1 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Team Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your team and their tasks.
          </Typography>
        </Box>
      )}

      {/* Activity Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Recent Activity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View the latest updates and changes.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AdminDashboard;