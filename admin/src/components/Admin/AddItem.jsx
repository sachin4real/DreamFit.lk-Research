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

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, details: { ...formData.details, [name]: value } });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }
    setImageFiles([...imageFiles, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleImageRemove = (index) => {
    const updatedImages = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedImages);
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

    imageFiles.forEach((file) => {
      newFormData.append('images', file);
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

      <Button
        variant="contained"
        component="label"
        startIcon={<PhotoCamera />}
        sx={{ marginTop: 2 }}
      >
        Upload Images (Max 5)
        <input type="file" multiple accept="image/*" hidden onChange={handleImageChange} />
      </Button>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        {imagePreviews.map((src, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <img src={src} alt={`preview-${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
            <IconButton
              onClick={() => handleImageRemove(index)}
              size="small"
              sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Stack>

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
