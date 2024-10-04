import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Checkbox, FormControlLabel, Typography, Grid, Stack, MenuItem } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const EditItem = () => {
  const { id } = useParams(); // Get product ID from the URL params
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    sku: '',
    sizeOptions: 'M', // Default size set to 'M'
    inStock: true,
    category: '',
    stockQuantity: '', // New field for stock quantity
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
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    // Fetch product data by ID to pre-fill the form
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        const product = response.data.product;

        setFormData({
          ...product,
          sizeOptions: product.sizeOptions ? product.sizeOptions[0] : 'M', // Assuming sizeOptions is an array
        });
        setExistingImages(product.images || []);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

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

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append('name', formData.name);
    newFormData.append('price', formData.price);
    newFormData.append('sku', formData.sku);
    newFormData.append('sizeOptions', formData.sizeOptions); // Changed to single value for size
    newFormData.append('inStock', formData.inStock); // True/false value for stock status
    newFormData.append('stockQuantity', formData.stockQuantity); // New field for stock quantity
    newFormData.append('category', formData.category);
    newFormData.append('details', JSON.stringify(formData.details));

    // Append new image files to FormData (if there are any)
    imageFiles.forEach((file) => {
      newFormData.append('images', file);
    });

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/edit/${id}`, newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product updated successfully:', response.data);
      alert('Product updated successfully!');
    } catch (error) {
      console.error('There was an error updating the product:', error);
      alert('Error updating product. Please try again.');
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Product
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        label="Price"
        variant="outlined"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <TextField
        label="SKU"
        variant="outlined"
        name="sku"
        value={formData.sku}
        onChange={handleChange}
        required
      />

      {/* Dropdown for Size Options */}
      <TextField
        select
        label="Size Options"
        variant="outlined"
        name="sizeOptions"
        value={formData.sizeOptions}
        onChange={handleChange}
        required
      >
        <MenuItem value="S">Small (S)</MenuItem>
        <MenuItem value="M">Medium (M)</MenuItem>
        <MenuItem value="L">Large (L)</MenuItem>
      </TextField>

      <TextField
        label="Stock Quantity"
        variant="outlined"
        name="stockQuantity"
        type="number"
        value={formData.stockQuantity}
        onChange={handleChange}
        required
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

      {/* Display existing images */}
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        {existingImages.map((src, index) => (
          <img key={index} src={src} alt={`existing-preview-${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
        ))}
      </Stack>

      {/* Display new image previews */}
      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        {imagePreviews.map((src, index) => (
          <img key={index} src={src} alt={`preview-${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
        ))}
      </Stack>

      <FormControlLabel
        control={<Checkbox checked={formData.inStock} onChange={() => setFormData({ ...formData, inStock: !formData.inStock })} />}
        label="In Stock"
      />

      <TextField
        label="Category"
        variant="outlined"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <Typography variant="h6" component="h4" gutterBottom>
        Product Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Chest"
            variant="outlined"
            name="chest"
            value={formData.details.chest}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Length"
            variant="outlined"
            name="length"
            value={formData.details.length}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Shoulders"
            variant="outlined"
            name="shoulders"
            value={formData.details.shoulders}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Material"
            variant="outlined"
            name="material"
            value={formData.details.material}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Color"
            variant="outlined"
            name="color"
            value={formData.details.color}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Fit Type"
            variant="outlined"
            name="fitType"
            value={formData.details.fitType}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Stretch"
            variant="outlined"
            name="stretch"
            value={formData.details.stretch}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Style"
            variant="outlined"
            name="style"
            value={formData.details.style}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Model Size"
            variant="outlined"
            name="modelSize"
            value={formData.details.modelSize}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Care"
            variant="outlined"
            name="care"
            value={formData.details.care}
            onChange={handleDetailsChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Note"
            variant="outlined"
            name="note"
            value={formData.details.note}
            onChange={handleDetailsChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
        Update Product
      </Button>
    </Box>
  );
};

export default EditItem;
