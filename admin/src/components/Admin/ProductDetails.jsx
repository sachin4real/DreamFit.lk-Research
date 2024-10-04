import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent, Grid, List, ListItem, ListItemText, Button, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ boxShadow: 4, borderRadius: 3, overflow: 'hidden' }}>
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
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} sm={6}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                {product.name}
              </Typography>

              <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
                Price: ${product.price}
              </Typography>

              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                SKU: {product.sku}
              </Typography>

              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                Category: {product.category}
              </Typography>

              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                In Stock: {product.inStock ? 'Yes' : 'No'}
              </Typography>

              <Divider sx={{ marginY: 3 }} />

              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Available Sizes
              </Typography>
              <List sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                {product.sizeOptions.map((size, index) => (
                  <ListItem
                    key={index}
                    sx={{ width: 'auto', backgroundColor: '#f5f5f5', padding: 1, borderRadius: 2 }}
                  >
                    <ListItemText primary={size} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ marginY: 3 }} />

              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Product Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary={`Chest: ${product.details.chest}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Length: ${product.details.length}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Shoulders: ${product.details.shoulders}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Material: ${product.details.material}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Color: ${product.details.color}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Fit Type: ${product.details.fitType}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Stretch: ${product.details.stretch}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Style: ${product.details.style}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Model Size: ${product.details.modelSize}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Care Instructions: ${product.details.care}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Note: ${product.details.note}`} />
                </ListItem>
              </List>

              <Divider sx={{ marginY: 3 }} />

              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
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
