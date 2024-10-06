import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography, IconButton, Avatar, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link, useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Importing DashboardIcon

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#23232e', // Darker background for sidebar
      default: '#1c1c24',
    },
    primary: {
      main: '#5c6bc0', // Soft blue for accent
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5: {
      fontWeight: 700,
      letterSpacing: '0.1em',
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#e0e0e0',
    },
  },
  shape: {
    borderRadius: 10, // Rounded corners for modern look
  },
});

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // For tracking active route

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer
        variant="permanent"
        sx={{
          width: isCollapsed ? 80 : 280,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isCollapsed ? 80 : 280,
            boxSizing: 'border-box',
            backgroundColor: darkTheme.palette.background.paper,
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          <Typography variant="h5" sx={{ color: '#fff', display: isCollapsed ? 'none' : 'block' }}>
            Admin Panel
          </Typography>
          <IconButton sx={{ color: '#fff' }} onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Profile Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'space-between',
            p: 2,
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          <Avatar sx={{ bgcolor: darkTheme.palette.primary.main }}>A</Avatar>
          {!isCollapsed && (
            <Box sx={{ marginLeft: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#fff' }}>
                Code Crew
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0bec5' }}>
                Admin
              </Typography>
            </Box>
          )}
          {!isCollapsed && (
            <IconButton sx={{ color: '#fff' }}>
              <ExitToAppIcon />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Sidebar Items */}
        <List sx={{ paddingTop: 2 }}>
          <Tooltip title={!isCollapsed ? '' : 'Dashboard'} placement="right">
            <ListItem
              button
              component={Link}
              to="/"
              selected={location.pathname === '/'}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.2)',
                },
                transition: 'background-color 0.3s ease',
                borderRadius: 2,
                margin: '8px 16px',
                justifyContent: isCollapsed ? 'center' : 'initial',
                paddingLeft: isCollapsed ? '12px' : '24px',
              }}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: location.pathname === '/' ? darkTheme.palette.primary.main : '#5c6bc0' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Dashboard" />}
            </ListItem>
          </Tooltip>

          <Tooltip title={!isCollapsed ? '' : 'Add Item'} placement="right">
            <ListItem
              button
              component={Link}
              to="/add"
              selected={location.pathname === '/add'}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.2)',
                },
                transition: 'background-color 0.3s ease',
                borderRadius: 2,
                margin: '8px 16px',
                justifyContent: isCollapsed ? 'center' : 'initial',
                paddingLeft: isCollapsed ? '12px' : '24px',
              }}
            >
              <ListItemIcon>
                <AddCircleIcon sx={{ color: location.pathname === '/add' ? darkTheme.palette.primary.main : '#5c6bc0' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Add Item" />}
            </ListItem>
          </Tooltip>

          <Tooltip title={!isCollapsed ? '' : 'View Products'} placement="right">
            <ListItem
              button
              component={Link}
              to="/products"
              selected={location.pathname === '/products'}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.2)',
                },
                transition: 'background-color 0.3s ease',
                borderRadius: 2,
                margin: '8px 16px',
                justifyContent: isCollapsed ? 'center' : 'initial',
                paddingLeft: isCollapsed ? '12px' : '24px',
              }}
            >
              <ListItemIcon>
                <ViewListIcon sx={{ color: location.pathname === '/products' ? darkTheme.palette.primary.main : '#5c6bc0' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="View Products" />}
            </ListItem>
          </Tooltip>

          <Tooltip title={!isCollapsed ? '' : 'Edit Products'} placement="right">
            <ListItem
              button
              component={Link}
              to="/edit-products"
              selected={location.pathname === '/edit-products'}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.2)',
                },
                transition: 'background-color 0.3s ease',
                borderRadius: 2,
                margin: '8px 16px',
                justifyContent: isCollapsed ? 'center' : 'initial',
                paddingLeft: isCollapsed ? '12px' : '24px',
              }}
            >
              <ListItemIcon>
                <EditIcon sx={{ color: location.pathname === '/edit-products' ? darkTheme.palette.primary.main : '#5c6bc0' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Edit Products" />}
            </ListItem>
          </Tooltip>
            <Tooltip title={!isCollapsed ? '' : 'Admin ticket'} placement="right">
            <ListItem
              button
              component={Link}
              to="/adminticket"
              selected={location.pathname === '/adminticket'}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.2)',
                },
                transition: 'background-color 0.3s ease',
                borderRadius: 2,
                margin: '8px 16px',
                justifyContent: isCollapsed ? 'center' : 'initial',
                paddingLeft: isCollapsed ? '12px' : '24px',
              }}
            >  
            <ListItemIcon>
                <EditIcon sx={{ color: location.pathname === '/adminticket' ? darkTheme.palette.primary.main : '#5c6bc0' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Admin ticket" />}
            </ListItem>
          </Tooltip>

          <Tooltip title={!isCollapsed ? '' : 'Admin sales Report'} placement="right">
            <ListItem
              button
              component={Link}
              to="/admin/sales-report"
              selected={location.pathname === '/admin/sales-report'}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(92, 107, 192, 0.2)',
                },
                transition: 'background-color 0.3s ease',
                borderRadius: 2,
                margin: '8px 16px',
                justifyContent: isCollapsed ? 'center' : 'initial',
                paddingLeft: isCollapsed ? '12px' : '24px',
              }}
            >  
            <ListItemIcon>
                <EditIcon sx={{ color: location.pathname === '/admin/sales-report' ? darkTheme.palette.primary.main : '#5c6bc0' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Admin sales report" />}
            </ListItem>
          </Tooltip>
              
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
