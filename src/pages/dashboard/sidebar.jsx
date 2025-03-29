import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Collapse, IconButton, Chip } from '@mui/material';

import { Home as HomeIcon, AccountCircle as AccountIcon, Description as DescriptionIcon, CalendarMonth as CalendarIcon, Article as ArticleIcon, KeyboardArrowDown as ArrowDownIcon, KeyboardArrowUp as ArrowUpIcon, Close as CloseIcon } from '@mui/icons-material';

import { Link, useNavigate } from 'react-router-dom';
import { WorkflowIcon } from 'lucide-react';

const Sidebarmain = ({ open, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState({});

  const navigate = useNavigate();


  const handleToggle = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleNavigation = (path) => {

    if (path) navigate(path);

  };

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/admin/dashboard' },
    {
      text: 'User',
      icon: <AccountIcon />,
      hasSubmenu: true,
      submenuKey: 'users',
      submenu: [

        { text: 'Users', path: '/user/list' },
        { text: 'Create', path: '/user/create' },
        { text: 'Manage', path: '/user/manage' }
      ]
    },

    {
      text: 'Worker', 
      icon: <AccountIcon />, 
      hasSubmenu: true,
      submenuKey: 'workers',
      submenu: [
        { text: 'Workers', path: '/worker/list' },  
        { text: 'Create', path: '/worker/create' },
        { text: 'Manage', path: '/worker/manage' }
      ]
    },

    {
      text: 'Tasks',
      icon: <AccountIcon />,
      hasSubmenu: true,
      submenuKey: 'tasks',
      submenu: [
        { text: 'All Tasks', path: '#' },
        { text: 'Create Task', path: '#' },
        { text: 'Task Overview', path: '#' }
      ]
    },

    {
      text: 'Supervisor',
      icon: <AccountIcon />,
      hasSubmenu: true,
      submenuKey: 'supervisors',
      submenu: [

        { text: 'Supervisor', path: '/supervisor/list' },
        { text: 'Create', path: '/supervisor/create' },
        { text: 'Manage', path: '/supervisor/manage' }
      ]
    },

    {
      text: 'Admin',
      icon: <AccountIcon />,
      hasSubmenu: true,
      submenuKey: 'admin',
      submenu: []
// merge
    },
    { text: 'Projects', icon: <DescriptionIcon />, path: '/projects' },
    { text: 'Calendar', icon: <CalendarIcon />, path: '#', badge: 'New' },
    { text: 'Documentation', icon: <ArticleIcon />, path: '#' }
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{ width: 280, flexShrink: 0, '& .MuiDrawer-paper': { width: 280, boxSizing: 'border-box' } }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="h6"></Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => item.hasSubmenu ? handleToggle(item.submenuKey) : handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.hasSubmenu && (expandedMenus[item.submenuKey] ? <ArrowUpIcon /> : <ArrowDownIcon />)}
                {item.badge && <Chip label={item.badge} size="small" sx={{ marginLeft: '8px' }} />}
              </ListItemButton>
            </ListItem>

            {item.hasSubmenu && (
              <Collapse in={expandedMenus[item.submenuKey]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.submenu.map((sub, idx) => (
                    <ListItem key={idx} disablePadding sx={{ paddingLeft: 4 }}>
                      <ListItemButton component={Link} to={sub.path}>
                        <ListItemText primary={sub.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebarmain;
