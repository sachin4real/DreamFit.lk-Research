import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  IconButton,
  Skeleton,
  Tooltip,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Chip,
  Pagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FilterListIcon from '@mui/icons-material/FilterList';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/all`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    // Add your delete logic here
    console.log('Deleting product with id:', id);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (filter === 'inStock') return product.stockQuantity > 0;
    if (filter === 'outOfStock') return product.stockQuantity === 0;
    return true;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Product Management
        </Typography>
        <Box display="flex" gap={2}>
          <FormControl variant="outlined" size="small">
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={filter}
              onChange={handleFilterChange}
              label="Filter"
              startAdornment={<FilterListIcon />}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="inStock">In Stock</MenuItem>
              <MenuItem value="outOfStock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            component={Link}
            to="/add"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              '&:hover': {
                backgroundColor: '#155fa0',
              },
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <Skeleton variant="rectangular" height={250} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card
                elevation={3}
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  },
                  overflow: 'hidden',
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={`${import.meta.env.VITE_API_URL}${product.images[0]}`} // Ensure correct image path
                  alt={product.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center', padding: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    ${product.price.toFixed(2)}
                  </Typography>

                  {/* Product Status - In Stock / Out of Stock */}
                  <Chip
                    label={product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                    color={product.stockQuantity > 0 ? 'success' : 'error'}
                    sx={{ mb: 2 }}
                  />

                  {/* Category Display */}
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Category: {product.category}
                  </Typography>

                  <Box display="flex" justifyContent="center" gap={2} sx={{ mt: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/product/${product._id}`}
                      sx={{
                        color: '#1976d2',
                        borderColor: '#1976d2',
                        '&:hover': {
                          borderColor: '#155fa0',
                          color: '#155fa0',
                        },
                      }}
                    >
                      View Details
                    </Button>
                    <Tooltip title="Delete Product">
                      <IconButton
                        onClick={() => handleDelete(product._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AllProducts;
