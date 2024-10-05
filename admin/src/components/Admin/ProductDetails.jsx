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
  Badge,
  CircularProgress,
  Modal,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [rating, setRating] = useState(4.5); // For demonstration

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography>Product not found.</Typography>;
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

  const handleOpenImageModal = () => setImageModalOpen(true);
  const handleCloseImageModal = () => setImageModalOpen(false);

  return (
    <Box sx={{ padding: 4, background: 'linear-gradient(135deg, #f6f7f9, #eaecef)', minHeight: '100vh' }}>
      <Card
        sx={{
          boxShadow: 8,
          borderRadius: 3,
          overflow: 'hidden',
          backgroundColor: '#fff',
          padding: 3,
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.02)' },
        }}
      >
        <Grid container spacing={4}>
          {/* Image Section */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ position: 'relative' }}>
              <Badge
                badgeContent={product.stockQuantity < 5 ? 'Limited Stock' : product.stockQuantity === 0 ? 'Out of Stock' : 'New'}
                color={product.stockQuantity === 0 ? 'error' : 'success'}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{
                  top: 16,
                  left: 16,
                  padding: '10px',
                  zIndex: 1,
                  '& .MuiBadge-badge': {
                    fontSize: '0.9rem',
                    padding: '8px',
                    borderRadius: '10px',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image={`${import.meta.env.VITE_API_URL}${product.images[selectedImage]}`}
                  alt={product.name}
                  sx={{ objectFit: 'cover', borderRadius: 2, boxShadow: 4, cursor: 'pointer' }}
                  onClick={handleOpenImageModal}
                />
              </Badge>
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

            {/* Image Modal */}
            <Modal open={imageModalOpen} onClose={handleCloseImageModal}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  maxWidth: 900,
                  bgcolor: 'background.paper',
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="auto"
                  image={`${import.meta.env.VITE_API_URL}${product.images[selectedImage]}`}
                  alt={product.name}
                  sx={{ objectFit: 'cover', width: '100%', borderRadius: 2 }}
                />
              </Box>
            </Modal>
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

              {/* Product Rating */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Rating
              </Typography>
              <Rating value={rating} precision={0.5} readOnly sx={{ marginBottom: 2 }} />

              <Divider sx={{ marginY: 3 }} />

              {/* Available Sizes with Radio Buttons */}
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Available Sizes
              </Typography>
              <RadioGroup row defaultValue={product.sizeOptions[0]} sx={{ gap: 2 }}>
                {product.sizeOptions.map((size, index) => (
                  <FormControlLabel
                    key={index}
                    value={size}
                    control={<Radio color="primary" />}
                    label={size}
                    sx={{
                      '& .MuiFormControlLabel-label': { fontWeight: 'bold' },
                    }}
                  />
                ))}
              </RadioGroup>

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
