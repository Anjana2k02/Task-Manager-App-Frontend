"use client"
import { Box, Card, CardContent, Typography, Container, Grid, LinearProgress, useTheme } from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"

// Sample data
const sampleData = {
  totalTasks: 248,
  activeUsers: 1423,
  taskCompletionPercentage: 78,

  countriesData: [
    { name: "USA", value: 400 },
    { name: "UK", value: 300 },
    { name: "Canada", value: 200 },
    { name: "New Zealand", value: 150 },
    { name: "Malaysia", value: 100 },
  ],

  monthlyTasksData: [
    { month: "Jan", tasks: 65 },
    { month: "Feb", tasks: 59 },
    { month: "Mar", tasks: 80 },
    { month: "Apr", tasks: 81 },
    { month: "May", tasks: 56 },
    { month: "Jun", tasks: 55 },
    { month: "Jul", tasks: 40 },
  ],

  taskStatusData: [
    { name: "Jan", Todo: 20, InProgress: 15, Done: 10 },
    { name: "Feb", Todo: 15, InProgress: 20, Done: 15 },
    { name: "Mar", Todo: 10, InProgress: 15, Done: 20 },
    { name: "Apr", Todo: 15, InProgress: 10, Done: 25 },
  ],

  bubbleChartData: [
    { name: "Feature A", complexity: 60, priority: 30, effort: 100, id: 1 },
    { name: "Bug Fix", complexity: 30, priority: 70, effort: 80, id: 2 },
    { name: "Enhancement", complexity: 50, priority: 50, effort: 70, id: 3 },
    { name: "Documentation", complexity: 20, priority: 20, effort: 30, id: 4 },
    { name: "Refactoring", complexity: 70, priority: 40, effort: 90, id: 5 },
  ],

  taskPriorityData: [
    { name: "High", value: 35 },
    { name: "Medium", value: 45 },
    { name: "Low", value: 20 },
  ],
}

const AdminViewDetails = () => {
  const theme = useTheme()

  // Colors for the donut chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* First row - 3 cards */}
        <Grid container spacing={3}>
          {/* Total Tasks Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Tasks
                </Typography>
                <Typography variant="h3" component="div">
                  {sampleData.totalTasks}
                </Typography>
                <Typography variant="body2" color="success.main">
                  total task increased by 115%
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Active Users Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Active Users
                </Typography>
                <Typography variant="h3" component="div">
                  26
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  26% of all users (45)
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Task Completion Card */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Task Completion
                </Typography>
                <Typography variant="h3" component="div">
                  {sampleData.taskCompletionPercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={sampleData.taskCompletionPercentage}
                  sx={{ mt: 2, height: 10, borderRadius: 5 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Second row - 2 cards with charts */}
        <Grid container spacing={3}>
          {/* Donut Chart Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", minHeight: 400, bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  User Distribution by Country
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sampleData.countriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sampleData.countriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Column Chart Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", minHeight: 400, bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Monthly Tasks
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={sampleData.monthlyTasksData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tasks" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Third row - 3 additional charts */}
        <Grid container spacing={3}>
          {/* Stacked Bar Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", minHeight: 350, bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Task Status by Month
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={sampleData.taskStatusData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Todo" stackId="a" fill="#8884d8" />
                    <Bar dataKey="InProgress" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Done" stackId="a" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Bubble Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", minHeight: 350, bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Task Complexity vs Priority
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="complexity" name="Complexity" unit="%" />
                    <YAxis type="number" dataKey="priority" name="Priority" unit="%" />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Legend />
                    <Scatter name="Tasks" data={sampleData.bubbleChartData} fill="#8884d8">
                      {sampleData.bubbleChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", minHeight: 350, bgcolor: "background.paper", boxShadow: 3 }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Task Priority Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={sampleData.taskPriorityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sampleData.taskPriorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AdminViewDetails

