import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ViewListIcon from '@mui/icons-material/ViewList';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart'; // For Admin Sales Report
import AssignmentIcon from '@mui/icons-material/Assignment'; // For Admin Tickets
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 280,
            boxSizing: 'border-box',
            backgroundColor: darkTheme.palette.background.paper,
            borderRight: '1px solid rgba(255, 255, 255, 0.1)', // Border for modern feel
            boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', // Shadow effect for depth
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Top shadow for depth
          }}
        >
          <Typography variant="h5" sx={{ color: '#fff' }}>
            Admin Panel
          </Typography>
          <IconButton sx={{ color: '#fff' }}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <List sx={{ paddingTop: 2 }}>
          {/* Existing links */}
          <ListItem
            button
            component={Link}
            to="/add"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(92, 107, 192, 0.2)',
              },
              transition: 'background-color 0.3s ease',
              borderRadius: 2,
              margin: '8px 16px',
            }}
          >
            <ListItemIcon>
              <AddCircleIcon sx={{ color: '#5c6bc0' }} />
            </ListItemIcon>
            <ListItemText primary="Add Item" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/products"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(92, 107, 192, 0.2)',
              },
              transition: 'background-color 0.3s ease',
              borderRadius: 2,
              margin: '8px 16px',
            }}
          >
            <ListItemIcon>
              <ViewListIcon sx={{ color: '#5c6bc0' }} />
            </ListItemIcon>
            <ListItemText primary="View Products" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/edit-products"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(92, 107, 192, 0.2)',
              },
              transition: 'background-color 0.3s ease',
              borderRadius: 2,
              margin: '8px 16px',
            }}
          >
            <ListItemIcon>
              <EditIcon sx={{ color: '#5c6bc0' }} />
            </ListItemIcon>
            <ListItemText primary="Edit Products" />
          </ListItem>

          {/* New links */}
          <ListItem
            button
            component={Link}
            to="/admin/sales-report"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(92, 107, 192, 0.2)',
              },
              transition: 'background-color 0.3s ease',
              borderRadius: 2,
              margin: '8px 16px',
            }}
          >
            <ListItemIcon>
              <BarChartIcon sx={{ color: '#5c6bc0' }} />
            </ListItemIcon>
            <ListItemText primary="Sales Report" />
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/adminticket"
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(92, 107, 192, 0.2)',
              },
              transition: 'background-color 0.3s ease',
              borderRadius: 2,
              margin: '8px 16px',
            }}
          >
            <ListItemIcon>
              <AssignmentIcon sx={{ color: '#5c6bc0' }} />
            </ListItemIcon>
            <ListItemText primary="Admin Tickets" />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Sidebar;
