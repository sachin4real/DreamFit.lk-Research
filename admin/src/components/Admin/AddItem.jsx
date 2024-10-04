import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Checkbox, FormControlLabel, Typography, Grid, IconButton, Stack } from '@mui/material';
import { PhotoCamera, Delete } from '@mui/icons-material';

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: '',
    sizeOptions: '',
    customizeLink: '',
    inStock: true,
    viewDetails: '',
    category: '',
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

    // Update the file and preview for the specific image slot
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
    newFormData.append('sizeOptions', JSON.stringify(formData.sizeOptions.split(',')));
    newFormData.append('customizeLink', formData.customizeLink);
    newFormData.append('inStock', formData.inStock);
    newFormData.append('viewDetails', formData.viewDetails);
    newFormData.append('category', formData.category);
    newFormData.append('details', JSON.stringify(formData.details));

    // Append images only if they exist
    imageFiles.forEach((file) => {
      if (file) {
        newFormData.append('images', file);
      }
    });

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/add`, newFormData, {
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': { m: 2, width: '100%' },
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: 4,
        boxShadow: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Product
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Price"
        variant="outlined"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="SKU"
        variant="outlined"
        name="sku"
        value={formData.sku}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Size Options (comma separated)"
        variant="outlined"
        name="sizeOptions"
        value={formData.sizeOptions}
        onChange={handleChange}
        required
        fullWidth
      />

      <Typography variant="h6" component="h4" gutterBottom>
        Upload Images (Max 5)
      </Typography>

      <Grid container spacing={2}>
        {imagePreviews.map((src, index) => (
          <Grid item xs={6} key={index}>
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <img
                src={src || 'https://via.placeholder.com/100'}
                alt={`preview-${index}`}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
              <IconButton
                onClick={() => handleImageRemove(index)}
                size="small"
                sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
              >
                <Delete fontSize="small" />
              </IconButton>
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
                sx={{ marginTop: 1 }}
              >
                {src ? 'Replace' : 'Upload'}
                <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, index)} />
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <TextField
        label="Customize Link"
        variant="outlined"
        name="customizeLink"
        value={formData.customizeLink}
        onChange={handleChange}
        required
        fullWidth
      />

      <FormControlLabel
        control={<Checkbox checked={formData.inStock} onChange={() => setFormData({ ...formData, inStock: !formData.inStock })} />}
        label="In Stock"
      />

      <TextField
        label="View Details Link"
        variant="outlined"
        name="viewDetails"
        value={formData.viewDetails}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Category"
        variant="outlined"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        fullWidth
      />

      <Typography variant="h6" component="h4" gutterBottom>
        Product Details
      </Typography>

      <Grid container spacing={2}>
        {Object.keys(formData.details).map((key) => (
          <Grid item xs={6} key={key}>
            <TextField
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              variant="outlined"
              name={key}
              value={formData.details[key]}
              onChange={handleDetailsChange}
              fullWidth
              required
            />
          </Grid>
        ))}
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddItem;
