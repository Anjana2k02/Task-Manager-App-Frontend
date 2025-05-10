"use client"

import React, { useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Chip,
  Paper,
  alpha,
} from "@mui/material"

import {
  BarChart as DashboardIcon,
  Group as PersonIcon,
  BusinessCenter as WorkerIcon,
  AssignmentTurnedIn as TaskIcon,
  AccountTree as TaskDividingIcon,
  ManageAccounts as SupervisorIcon,
  Security as AdminIcon,
  Folder as ProjectsIcon,
  Event as CalendarIcon,
  Description as DocumentationIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"

import { Link, useNavigate, useLocation } from "react-router-dom"

const Sidebarmain = () => {
  const [expandedMenus, setExpandedMenus] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const handleToggle = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const handleNavigation = (path) => {
    if (path) navigate(path)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isActiveParent = (submenu) => {
    return submenu.some((item) => location.pathname === item.path)
  }

  // Attractive, professional color palette
  const colors = {
    dashboard: "#3498db", // Light blue (matching header)
    user: "#2980b9", // Darker blue
    worker: "#D50B8B", // Purple
    tasks: "#1abc9c", // Teal
    taskDividing: "#27ae60", // Green
    supervisor: "#e74c3c", // Red
    admin: "#34495e", // Dark blue-gray
    projects: "#f1c40f", // Yellow
    calendar: "#d35400", // Orange
    documentation: "#16a085", // Dark teal
    settings: "#7f8c8d", // Gray
  }

  // Menu items with colorful styling
  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/admin/dashboard",
      color: colors.dashboard,
    },
    {
      text: "User",
      icon: <PersonIcon />,
      hasSubmenu: true,
      submenuKey: "users",
      color: colors.user,
      submenu: [
        { text: "Users", path: "/user/list" },
        { text: "Create", path: "/user/create" },
        { text: "Manage", path: "/user/manage" },
      ],
    },
    {
      text: "Worker",
      icon: <WorkerIcon />,
      hasSubmenu: true,
      submenuKey: "workers",
      color: colors.worker,
      submenu: [
        { text: "Worker Profile", path: "/worker/workerprofile" },
        { text: "Workers", path: "/worker/list" },
        { text: "Create Worker", path: "/worker/create" },
        { text: "Worker Home", path: "/worker/workerhome" },
        { text: "Manage", path: "/worker/manage" },
      ],
    },
    {
      text: "Tasks",
      icon: <TaskIcon />,
      hasSubmenu: true,
      submenuKey: "tasks",
      color: colors.tasks,
      submenu: [
        { text: "All Tasks", path: "/task/list" },
        { text: "Create Task", path: "/task/create" },
        { text: "Manage Task", path: "/task/manage" },
      ],
    },

    {
      text: "My Tasks",
      icon: <TaskIcon />,
      hasSubmenu: true,
      submenuKey: "my_tasks",
      color: colors.tasks,
      submenu: [
        { text: "All Tasks", path: "/task/my-task-list" },
        { text: "Task Overview", path: "/task/my-task-overview" },
      ],
    },
    {
      text: "Task Dividing",
      icon: <TaskDividingIcon />,
      hasSubmenu: true,
      submenuKey: "taskdi",
      color: colors.taskDividing,
      submenu: [
        { text: "All Task dividing", path: "/taskdi/list" },
        { text: "Create", path: "/taskdi/create" },
        { text: "Manage", path: "/taskdi/manage" },
      ],
    },
    {
      text: "Supervisor",
      icon: <SupervisorIcon />,
      hasSubmenu: true,
      submenuKey: "supervisors",
      color: colors.supervisor,
      submenu: [
        { text: "My Dashboard", path: "/supervisor/supervisorhome" },
        { text: "Manage", path: "/supervisor/manage" },
        { text: "Task Manage", path: "/supervisor/manage-all-task" },
        // { text: "Create", path: "/supervisor/create" },
        { text: "Worker Create", path: "/worker/create" },
        { text: "Worker list", path: "/supervisor/workerlist" },
        { text: "Create Supervisor", path: "/supervisor/create" },
        { text: "Manage", path: "/supervisor/manage" },
       
      ],
    },
    {
      text: "Admin",
      icon: <AdminIcon />,
      hasSubmenu: true,
      submenuKey: "admin",
      color: colors.admin,
      submenu: [
        { text: "Admin Dashboard", path: "/admin/adminHome" },
        { text: "Create Tasks", path: "/admin/create" },
        {text: "Task List", path: "/admin/list" },
       // { text: "Manage Tasks", path: "/admin/manage" },
       // { text: "User Management", path: "/admin/userManagement" },
        

      ],
    },
    {
      text: "Projects",
      icon: <ProjectsIcon />,
      path: "/projects",
      color: colors.projects,
    },
    {
      text: "Calendar",
      icon: <CalendarIcon />,
      path: "#",
      badge: "New",
      color: colors.calendar,
    },
    {
      text: "Documentation",
      icon: <DocumentationIcon />,
      path: "#",
      color: colors.documentation,
    },
  ]

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: 0,
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e9ecef",
      }}
    >
      <Box sx={{ overflow: "auto", height: "100%" }}>
        <List sx={{ py: 2 }}>
          {menuItems.map((item, index) => {
            const isItemActive = item.hasSubmenu ? isActiveParent(item.submenu) : isActive(item.path)

            return (
              <React.Fragment key={index}>
                <ListItem disablePadding sx={{ mb: 0.5, px: 2 }}>
                  <ListItemButton
                    onClick={() => (item.hasSubmenu ? handleToggle(item.submenuKey) : handleNavigation(item.path))}
                    sx={{
                      borderRadius: "6px",
                      backgroundColor: isItemActive ? alpha(item.color, 0.15) : "transparent",
                      "&:hover": {
                        backgroundColor: alpha(item.color, 0.08),
                      },
                      py: 1,
                      transition: "all 0.2s",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isItemActive ? item.color : "#495057",
                        minWidth: "40px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& .MuiTypography-root": {
                          fontWeight: isItemActive ? "600" : "400",
                          color: isItemActive ? item.color : "#495057",
                        },
                      }}
                    />
                    {item.hasSubmenu &&
                      (expandedMenus[item.submenuKey] ? (
                        <ArrowUpIcon sx={{ color: item.color }} />
                      ) : (
                        <ArrowDownIcon sx={{ color: "#6c757d" }} />
                      ))}
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          ml: 1,
                          backgroundColor: item.color,
                          color: "white",
                          height: "20px",
                          fontSize: "0.65rem",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>

                {item.hasSubmenu && (
                  <Collapse in={expandedMenus[item.submenuKey]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((sub, idx) => {
                        const isSubActive = isActive(sub.path)

                        return (
                          <ListItem key={idx} disablePadding sx={{ pl: 4, pr: 2 }}>
                            <ListItemButton
                              component={Link}
                              to={sub.path}
                              sx={{
                                borderRadius: "6px",
                                py: 0.75,
                                backgroundColor: isSubActive ? alpha(item.color, 0.15) : "transparent",
                                "&:hover": {
                                  backgroundColor: alpha(item.color, 0.08),
                                },
                              }}
                            >
                              <ListItemText
                                primary={sub.text}
                                sx={{
                                  "& .MuiTypography-root": {
                                    fontSize: "0.875rem",
                                    fontWeight: isSubActive ? "500" : "400",
                                    color: isSubActive ? item.color : "#6c757d",
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            )
          })}
        </List>
      </Box>

      {/* Settings Section */}
      <Box sx={{ p: 2, borderTop: "1px solid #e9ecef" }}>
        <ListItemButton
          sx={{
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: alpha(colors.settings, 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ color: colors.settings, minWidth: "40px" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Settings"
            sx={{
              "& .MuiTypography-root": {
                color: "#495057",
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Paper>
  )
}

export default Sidebarmain
