import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Checkbox, FormControlLabel, Typography, Grid, IconButton, MenuItem, Paper } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: '',
    sizeOptions: 'M', // Default size is 'M'
    inStock: true,
    category: '',
    stockQuantity: '',
    details: {
      chest: '',
      length: '',
      shoulders: '',
      material: '',
      color: '',
      fitType: '',
      stretch: '',
      style: '',
      modelSize: '',
      care: '',
      note: ''
    }
  });

  const [imageFiles, setImageFiles] = useState(new Array(5).fill(null)); // Array to hold 5 image files
  const [imagePreviews, setImagePreviews] = useState(new Array(5).fill(null)); // Array to hold 5 image previews

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, details: { ...formData.details, [name]: value } });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles[index] = file;
    updatedPreviews[index] = URL.createObjectURL(file);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleImageRemove = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles[index] = null;
    updatedPreviews[index] = null;

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('price', formData.price);
    newFormData.append('sku', formData.sku);
    newFormData.append('sizeOptions', formData.sizeOptions); 
    newFormData.append('inStock', formData.inStock);
    newFormData.append('category', formData.category);
    newFormData.append('stockQuantity', formData.stockQuantity);
    newFormData.append('details', JSON.stringify(formData.details));

    imageFiles.forEach((file) => {
      if (file) {
        newFormData.append('images', file);
      }
    });

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/products/add`, newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product added successfully!');
    } catch (error) {
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        padding: '30px',
        maxWidth: '900px',
        margin: 'auto',
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
          '& > :not(style)': { marginBottom: '18px' },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: 'center', color: '#333', mb: 3 }}>
          Add New Product
        </Typography>

        {/* Grid Layout for a more compact and balanced form */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              size="medium"
              sx={{ borderRadius: 2, backgroundColor: '#fff' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              variant="outlined"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              fullWidth
              size="medium"
              sx={{ borderRadius: 2, backgroundColor: '#fff' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="SKU"
              variant="outlined"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              fullWidth
              size="medium"
              sx={{ borderRadius: 2, backgroundColor: '#fff' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* Dropdown for Size Options */}
            <TextField
              select
              label="Size Options"
              variant="outlined"
              name="sizeOptions"
              value={formData.sizeOptions}
              onChange={handleChange}
              required
              fullWidth
              size="medium"
              sx={{ borderRadius: 2, backgroundColor: '#fff' }}
            >
              <MenuItem value="S">Small (S)</MenuItem>
              <MenuItem value="M">Medium (M)</MenuItem>
              <MenuItem value="L">Large (L)</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {/* Image Upload Section */}
        <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, color: '#3f51b5', fontWeight: 'bold', textAlign: 'center' }}>
          Upload Images (Max 5)
        </Typography>

        <Grid container spacing={2}>
          {imagePreviews.map((src, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Box sx={{ position: 'relative', textAlign: 'center', marginBottom: 2 }}>
                <img
                  src={src || 'https://via.placeholder.com/100'}
                  alt={`preview-${index}`}
                  style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}
                />
                <IconButton
                  onClick={() => handleImageRemove(index)}
                  size="small"
                  sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', color: 'white' }}
                >
                  <Delete fontSize="small" />
                </IconButton>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{ mt: 1, textTransform: 'none', borderRadius: '20px', background: '#4CAF50', width: '80%', fontSize: '0.8rem' }}
                >
                  {src ? 'Replace' : 'Upload'}
                  <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, index)} />
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Stock and In-Stock Fields */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={<Checkbox checked={formData.inStock} onChange={() => setFormData({ ...formData, inStock: !formData.inStock })} />}
              label="In Stock"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Stock Quantity"
              variant="outlined"
              name="stockQuantity"
              type="number"
              value={formData.stockQuantity}
              onChange={handleChange}
              required
              fullWidth
              size="medium"
              sx={{ borderRadius: 2, backgroundColor: '#fff' }}
            />
          </Grid>
        </Grid>

        <TextField
          label="Category"
          variant="outlined"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          fullWidth
          size="medium"
          sx={{ borderRadius: 2, backgroundColor: '#fff' }}
        />

        {/* Product Details Section */}
        <Typography variant="h6" component="h4" gutterBottom sx={{ mt: 2, color: '#3f51b5', fontWeight: 'bold' }}>
          Product Details
        </Typography>

        <Grid container spacing={2}>
          {Object.keys(formData.details).map((key) => (
            <Grid item xs={6} sm={4} key={key}>
              <TextField
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                variant="outlined"
                name={key}
                value={formData.details[key]}
                onChange={handleDetailsChange}
                fullWidth
                size="medium"
                required
                sx={{ borderRadius: 2, backgroundColor: '#fff' }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            padding: '12px 0',
            background: 'linear-gradient(to right, #3f51b5, #4caf50)',
            textTransform: 'none',
            borderRadius: '30px',
            fontWeight: 'bold',
            fontSize: '1rem',
            '&:hover': {
              background: 'linear-gradient(to right, #4caf50, #3f51b5)',
            },
          }}
        >
          Add Product
        </Button>
      </Box>
    </Paper>
  );
};

export default AddItem;
