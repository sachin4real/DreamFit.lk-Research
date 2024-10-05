import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  IconButton,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleNextImage = () => {
    if (selectedImage < product.images.length - 1) {
      setSelectedImage((prev) => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage((prev) => prev - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImage < product.images.length - 1) {
      setSelectedImage((prev) => prev + 1);
    }
  };

  const handlePrevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Card
        sx={{
          boxShadow: 6,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
          padding: 3,
        }}
      >
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="500"
                image={`${import.meta.env.VITE_API_URL}${product.images[selectedImage]}`}
                alt={product.name}
                sx={{ objectFit: 'contain', borderRadius: 2 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  marginTop: 2,
                }}
              >
                <IconButton
                  onClick={handlePrevImage}
                  disabled={selectedImage === 0}
                  sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#155fa0' } }}
                >
                  <ArrowBackIcon />
                </IconButton>
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_API_URL}${img}`}
                    alt={`thumb-${index}`}
                    onClick={() => handleImageChange(index)}
                    style={{
                      width: 60,
                      height: 60,
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: selectedImage === index ? '2px solid #1976d2' : '2px solid transparent',
                      borderRadius: '8px',
                      transition: 'border-color 0.3s',
                    }}
                  />
                ))}
                <IconButton
                  onClick={handleNextImage}
                  disabled={selectedImage === product.images.length - 1}
                  sx={{ backgroundColor: '#1976d2', color: '#fff', '&:hover': { backgroundColor: '#155fa0' } }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} sm={6}>
            <CardContent sx={{ padding: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                {product.name}
              </Typography>

              <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 2 }}>
                Price: <strong>${product.price.toFixed(2)}</strong>
              </Typography>

              <Chip
                label={product.stockQuantity > 0 ? `In Stock: ${product.stockQuantity}` : 'Out of Stock'}
                color={product.stockQuantity > 0 ? 'success' : 'error'}
                sx={{ marginBottom: 2, fontSize: '1rem', padding: '0.5rem 1rem' }}
              />

              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                SKU: {product.sku}
              </Typography>

              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                Category: {product.category}
              </Typography>

              <Divider sx={{ marginY: 3 }} />

              {/* Available Sizes Section */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Available Sizes
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                {product.sizeOptions.map((size, index) => (
                  <Chip
                    key={index}
                    label={size}
                    sx={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#e0e0e0',
                      fontWeight: 'bold',
                    }}
                  />
                ))}
              </Box>

              <Divider sx={{ marginY: 3 }} />

              {/* Product Details List */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Product Details
              </Typography>
              <List>
                {Object.keys(product.details).map((detailKey, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${detailKey.charAt(0).toUpperCase() + detailKey.slice(1)}: ${product.details[detailKey]}`} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ marginY: 3 }} />

              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                sx={{ marginTop: 2, padding: '0.75rem 2rem', fontSize: '1rem', backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#155fa0' } }}
              >
                Add to Cart
              </Button>

              <Button
                variant="outlined"
                color="primary"
                sx={{ marginTop: 2, marginLeft: 2, padding: '0.75rem 2rem', fontSize: '1rem', '&:hover': { backgroundColor: '#f5f5f5' } }}
                onClick={() => navigate('/products')}
              >
                Back to Products
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ProductDetails;
