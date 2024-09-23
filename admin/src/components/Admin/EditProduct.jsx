import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Grid, Stack, IconButton } from '@mui/material';
import { PhotoCamera, Delete as DeleteIcon } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress'; // Loader for better UX

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState(new Array(5).fill(null)); // To allow up to 5 images
  const [newImages, setNewImages] = useState(new Array(5).fill(null)); // New images
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/all`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct({ ...product, sizeOptions: product.sizeOptions.join(', ') });
    
    // Set existing images for the 5 image slots
    const currentPreviews = new Array(5).fill(null);
    product.images.forEach((img, index) => {
      currentPreviews[index] = `${import.meta.env.VITE_API_URL}${img}`;
    });
    setImagePreviews(currentPreviews);
    setNewImages(new Array(5).fill(null)); // Reset new images
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
        fetchProducts(); // Refresh product list after deletion
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const newPreviews = [...imagePreviews];
    newPreviews[index] = URL.createObjectURL(file);

    const updatedNewImages = [...newImages];
    updatedNewImages[index] = file; // Store new image in corresponding slot

    setImagePreviews(newPreviews);
    setNewImages(updatedNewImages);
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    const updatedFormData = new FormData();
    updatedFormData.append('name', editingProduct.name);
    updatedFormData.append('price', editingProduct.price);
    updatedFormData.append('sku', editingProduct.sku);
    updatedFormData.append('sizeOptions', JSON.stringify(editingProduct.sizeOptions.split(',')));
    updatedFormData.append('customizeLink', editingProduct.customizeLink);
    updatedFormData.append('inStock', editingProduct.inStock);
    updatedFormData.append('viewDetails', editingProduct.viewDetails);
    updatedFormData.append('category', editingProduct.category);
    updatedFormData.append('details', JSON.stringify(editingProduct.details));

    // Append new images or keep the old ones if not changed
    newImages.forEach((file, index) => {
      if (file) {
        updatedFormData.append('images', file); // Append only new images
      } else if (imagePreviews[index]) {
        // Keep the current image if it wasn't replaced
        updatedFormData.append('images', editingProduct.images[index]);
      }
    });

    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully');
      setEditingProduct(null); // Close edit form
      setImagePreviews(new Array(5).fill(null)); // Clear image previews after update
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, [name]: value });
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({ ...editingProduct, details: { ...editingProduct.details, [name]: value } });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Products
      </Typography>

      {/* Product Table with Image Preview */}
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                {/* Display First Image */}
                <TableCell>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${product.images[0]}`}
                    alt={product.name}
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditClick(product)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteClick(product._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Product Form */}
      {editingProduct && (
        <Box component="form" sx={{ marginTop: 4, padding: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Editing: {editingProduct.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={editingProduct.name}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                name="price"
                value={editingProduct.price}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SKU"
                name="sku"
                value={editingProduct.sku}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                name="category"
                value={editingProduct.category}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Size Options (comma separated)"
                name="sizeOptions"
                value={editingProduct.sizeOptions}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editingProduct.inStock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  />
                }
                label="In Stock"
              />
            </Grid>

            {/* Image Upload Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Images (Upload up to 5 images)</Typography>
              <Stack direction="row" spacing={2}>
                {imagePreviews.map((src, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <img
                      src={src ? src : 'https://via.placeholder.com/100'} // Placeholder if no image is uploaded
                      alt={`preview-${index}`}
                      style={{ width: 100, height: 100, borderRadius: 8, objectFit: 'cover' }}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<PhotoCamera />}
                      sx={{ position: 'absolute', bottom: 0, left: 0 }}
                    >
                      Upload
                      <input type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, index)} />
                    </Button>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Product Details */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Material"
                name="material"
                value={editingProduct.details.material}
                onChange={handleDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Color"
                name="color"
                value={editingProduct.details.color}
                onChange={handleDetailsChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                name="note"
                value={editingProduct.details.note}
                onChange={handleDetailsChange}
                fullWidth
              />
            </Grid>
          </Grid>

          {loading ? (
            <CircularProgress sx={{ marginTop: 2 }} />
          ) : (
            <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ marginTop: 2 }}>
              Update Product
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default EditProduct;
