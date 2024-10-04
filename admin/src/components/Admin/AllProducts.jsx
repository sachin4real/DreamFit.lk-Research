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
  Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Box sx={{ padding: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          All Products
        </Typography>
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
      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3}>
                <Skeleton variant="rectangular" height={140} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card elevation={3} sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={`${import.meta.env.VITE_API_URL}${product.images[0]}`} // Ensure correct image path
                  alt={product.name}
                  sx={{ objectFit: 'cover' }} // Make sure the image fits well
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Box display="flex" justifyContent="center" gap={1}>
                    <Button
                      variant="contained"
                      size="small"
                      component={Link}
                      to={`/product/${product._id}`}
                      sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155fa0' } }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ p: 2, backgroundColor: '#f9f9f9' }}
                >
                  <Tooltip title="Edit Product">
                    <IconButton
                      component={Link}
                      to={`/admin/product/edit/${product._id}`}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Product">
                    <IconButton
                      onClick={() => handleDelete(product._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default AllProducts;
