import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Collapse, IconButton, Chip } from '@mui/material';
import { Home as HomeIcon, AccountCircle as AccountIcon, Description as DescriptionIcon, CalendarMonth as CalendarIcon, Article as ArticleIcon, KeyboardArrowDown as ArrowDownIcon, KeyboardArrowUp as ArrowUpIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link for routing

const Sidebarmain = ({ open, onClose }) => {
  const [expandedMenus, setExpandedMenus] = useState({
    users: true,
    subMenu1: true,
    subMenu2: false,
    account: false,
    projects: false
  });

  const handleToggle = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  // Menu items data
  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <HomeIcon />, 
      path: '/' 
    },
    { 
      text: 'User', 
      icon: <AccountIcon />, 
      hasSubmenu: true,
      submenuKey: 'users',
      submenu: [
        { text: 'List', path: '/users' },  // Use Link to navigate
        { text: 'Create', path: '/user/create' },
        { text: 'Manage', path: '/user/manage' }
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
      text: 'Admin', 
      icon: <AccountIcon />, 
      hasSubmenu: true,
      submenuKey: 'admin',
      submenu: [
        { text: 'Admin Dashboard', path: '/admin/admindaashboard' },
        { text: 'Task Reassign Requests List', path: '/admin/requestlist' },
      ]
    },
    { 
      text: 'Projects', 
      icon: <DescriptionIcon />, 
      hasSubmenu: true,
      submenuKey: 'projects',
      submenu: []
    },
    { 
      text: 'Calendar', 
      icon: <CalendarIcon />, 
      path: '#',
      badge: 'New'
    },
    { 
      text: 'Documentation', 
      icon: <ArticleIcon />, 
      path: '#' 
    }
  ];

  const renderSubmenu = (items, level = 1) => {
    return items.map((item, index) => {
      if (item.hasSubmenu) {
        return (
          <React.Fragment key={`submenu-${level}-${index}`}>
            <ListItem disablePadding sx={level === 1 ? styles.subMenuItem : styles.subSubMenuItem}>
              <ListItemButton onClick={() => handleToggle(item.submenuKey)} sx={styles.listItemButton}>
                <ListItemText primary={item.text} />
                {expandedMenus[item.submenuKey] ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </ListItemButton>
            </ListItem>
            {item.submenu && item.submenu.length > 0 && (
              <Collapse in={expandedMenus[item.submenuKey]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderSubmenu(item.submenu, level + 1)}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      } else {
        return (
          <ListItem key={`submenu-item-${level}-${index}`} disablePadding sx={level === 1 ? styles.subMenuItem : styles.subSubMenuItem}>
            <ListItemButton component={Link} to={item.path} sx={{ ...styles.listItemButton, ...(item.active ? styles.activeItem : {}) }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        );
      }
    });
  };

  // Styles for the sidebar
  const styles = {
    drawer: {
      width: 280,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 280,
        boxSizing: 'border-box',
      },
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    listItem: {
      padding: '4px 16px',
    },
    listItemButton: {
      borderRadius: '4px',
      padding: '8px 16px',
    },
    activeItem: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    subMenuItem: {
      paddingLeft: '32px',
    },
    subSubMenuItem: {
      paddingLeft: '48px',
    },
    badge: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      color: 'rgba(0, 0, 0, 0.6)',
      height: '24px',
      marginLeft: '8px',
    }
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={true}
      sx={styles.drawer}
    >
      <Box sx={styles.header}>
        <Typography variant="h6" component="div">
          Brand
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List>
        {menuItems.map((item, index) => (
          <React.Fragment key={`menu-${index}`}>
            <ListItem disablePadding sx={styles.listItem}>
              <ListItemButton sx={styles.listItemButton}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.badge && (
                  <Chip label={item.badge} size="small" sx={styles.badge} />
                )}
              </ListItemButton>
            </ListItem>
            
            {item.hasSubmenu && (
              <Collapse in={expandedMenus[item.submenuKey]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {renderSubmenu(item.submenu)}
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
