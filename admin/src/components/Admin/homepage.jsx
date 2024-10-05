import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Grid, Button, CircularProgress,
  LinearProgress, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  InputAdornment
} from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SearchIcon from '@mui/icons-material/Search';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { useTheme } from '@mui/material/styles';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const HomePage = () => {
  const [inventoryReport, setInventoryReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lowStockModalOpen, setLowStockModalOpen] = useState(false); // State to control modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();

  // Fetch the inventory report from the backend
  const fetchInventoryReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/products/inventory-report');
      setInventoryReport(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching inventory report');
      setLoading(false);
    }
  };

  // Open the modal
  const handleOpenLowStockModal = () => {
    setLowStockModalOpen(true);
  };

  // Close the modal
  const handleCloseLowStockModal = () => {
    setLowStockModalOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Generate and download the report as a PDF
  const downloadReportAsPDF = () => {
    const doc = new jsPDF();

    // Set up a title
    doc.setFontSize(16);
    doc.text('Inventory Report', 10, 10);

    const inStockItems = inventoryReport?.products.filter(product => product.inStock === 'In Stock');
    const lowStockItems = inventoryReport?.products.filter(item => item.stockQuantity <= 10 && item.inStock === 'In Stock');
    const outOfStockItems = inventoryReport?.products.filter(product => product.inStock === 'Out of Stock');
    const categories = Object.keys(inventoryReport?.products.reduce((acc, product) => {
      acc[product.category] = acc[product.category] ? acc[product.category] + 1 : 1;
      return acc;
    }, {}));

    let startY = 20;

    // 1. All Inventory Clothes Data (First Section)
    doc.setFontSize(12);
    doc.text('All Inventory Clothes Data:', 10, startY);
    startY += 10;
    doc.autoTable({
      startY: startY,
      head: [['Product Name', 'SKU', 'Category', 'Stock Quantity']],
      body: inventoryReport.products.map(item => [item.name, item.sku, item.category, item.stockQuantity]),
    });
    
    // Move to next page for the next table
    doc.addPage();

    // 2. In-Stock Items
    doc.text('In Stock Items:', 10, 20);
    startY = 30;
    doc.autoTable({
      startY: startY,
      head: [['Product Name', 'SKU', 'Stock Quantity']],
      body: inStockItems.map(item => [item.name, item.sku, item.stockQuantity]),
    });

    // Move to next page
    doc.addPage();

    // 3. Low Stock Items
    doc.text('Low Stock Items:', 10, 20);
    startY = 30;
    doc.autoTable({
      startY: startY,
      head: [['Product Name', 'SKU', 'Stock Quantity']],
      body: lowStockItems.map(item => [item.name, item.sku, item.stockQuantity]),
    });

    // Move to next page
    doc.addPage();

    // 4. Out of Stock Items
    doc.text('Out of Stock Items:', 10, 20);
    startY = 30;
    doc.autoTable({
      startY: startY,
      head: [['Product Name', 'SKU']],
      body: outOfStockItems.map(item => [item.name, item.sku]),
    });

    // Move to next page
    doc.addPage();

    // 5. Available Categories
    doc.text('Available Categories:', 10, 20);
    startY = 30;
    doc.autoTable({
      startY: startY,
      head: [['Category']],
      body: categories.map(category => [category]),
    });

    // Save the PDF
    doc.save('inventory_report.pdf');
  };

  useEffect(() => {
    fetchInventoryReport();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  if (error) return <div>{error}</div>;

  // Data for the charts
  const inStockItems = inventoryReport?.products.filter(product => product.inStock === 'In Stock');
  const lowStockItems = inventoryReport?.products.filter(item => item.stockQuantity <= 10 && item.inStock === 'In Stock');
  const outOfStockItems = inventoryReport?.products.filter(product => product.inStock === 'Out of Stock');
  const categories = inventoryReport?.products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] ? acc[product.category] + 1 : 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Product Categories',
        data: Object.values(categories),
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
  };

  const stockChangesOverTime = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'], // Example months
    datasets: [
      {
        label: 'In Stock',
        data: [120, 110, 100, 130, 150, 140], // Hypothetical data
        fill: false,
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.dark,
        tension: 0.4,
      },
      {
        label: 'Out of Stock',
        data: [30, 40, 50, 45, 35, 20], // Hypothetical data
        fill: false,
        backgroundColor: theme.palette.error.main,
        borderColor: theme.palette.error.dark,
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={dashboardContainer}>
      
      <Typography variant="h4" align="center" gutterBottom style={headingStyle}>
        Admin Dashboard
      </Typography>

      {/* Buttons and Search Bar */}
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadReportAsPDF}
            style={downloadButtonStyle}
          >
            Download Inventory Report
          </Button>
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => window.location.href = '/add-product'}
            style={{ marginLeft: '15px', padding: '10px 25px' }}
          >
            Add New Product
          </Button> */}
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid> */}
      </Grid>

      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={6} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="div" color="textSecondary">
                Total Products
              </Typography>
              <Typography variant="h3" color="textPrimary">
                {inventoryReport?.totalProducts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="div" color="textSecondary">
                In Stock Items
              </Typography>
              <Typography variant="h3" color="textPrimary">
                {inventoryReport?.inStockItems}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(inStockItems.length / inventoryReport.totalProducts) * 100}
                style={{ marginTop: '10px', height: '6px', borderRadius: '5px' }}
                color="success"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" component="div" color="textSecondary">
                Out of Stock Items
              </Typography>
              <Typography variant="h3" color="textPrimary">
                {inventoryReport?.outOfStockItems}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(outOfStockItems.length / inventoryReport.totalProducts) * 100}
                style={{ marginTop: '10px', height: '6px', borderRadius: '5px' }}
                color="error"
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} md={3}>
        <Card 
            style={{ ...cardStyle, cursor: 'pointer' }}
            onClick={handleOpenLowStockModal}
            >
            <CardContent>
              <Typography variant="h6" component="div" color="textSecondary">
                Low Stock Alerts
              </Typography>
              <Typography variant="h3" color="textPrimary">
                {lowStockItems?.length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Low Stock Modal */}
        <Dialog open={lowStockModalOpen} onClose={handleCloseLowStockModal} fullWidth maxWidth="sm">
          <DialogTitle>Low Stock Items</DialogTitle>
          <DialogContent dividers>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lowStockItems.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell align="right">{item.stockQuantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLowStockModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={12} md={6}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Product Category Breakdown
              </Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Stock Changes Over Time
              </Typography>
              <Line data={stockChangesOverTime} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card style={cardStyle}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Out of Stock Items
              </Typography>
              <Paper elevation={3}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product Name</TableCell>
                      <TableCell align="right">SKU</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {outOfStockItems.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.sku}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// Custom styles for the dashboard
const dashboardContainer = {
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: '#f7f9fc',
};

const cardStyle = {
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
  backgroundColor: '#fff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  },
};

const downloadButtonStyle = {
  backgroundColor: '#1976d2',
  color: '#fff',
  padding: '12px 25px',
  fontSize: '16px',
  borderRadius: '10px',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
  marginBottom : '25px'
};

const headingStyle = {
  marginTop: '30px',
  fontWeight: 'bold',
  textAlign: 'center',
};

export default HomePage;
