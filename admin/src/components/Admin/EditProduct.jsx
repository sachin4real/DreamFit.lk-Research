import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Checkbox, Grid, Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import FormControlLabel from '@mui/material/FormControlLabel';  // Import FormControlLabel for checkboxes
import CircularProgress from '@mui/material/CircularProgress';  // Loader for better UX

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [newImages, setNewImages] = useState([]);
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
    setImagePreviews(product.images); // Display existing images as previews
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setNewImages(files); // Store new images
    setImagePreviews([...imagePreviews, ...previews]); // Show new image previews along with old ones
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

    newImages.forEach(file => updatedFormData.append('images', file));

    setLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`, updatedFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully');
      setEditingProduct(null); // Close edit form
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
                    src={`${import.meta.env.VITE_API_URL}${product.images[0]}`} // Display the first image
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

            {/* Image Upload */}
            <Grid item xs={12}>
              <Button variant="contained" component="label" startIcon={<PhotoCamera />}>
                Upload Images
                <input type="file" multiple accept="image/*" hidden onChange={handleImageChange} />
              </Button>
            </Grid>

            {/* Image Previews */}
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                {imagePreviews.map((src, index) => (
                  <img key={index} src={src} alt={`preview-${index}`} style={{ width: 100, height: 100, borderRadius: 8 }} />
                ))}
              </Stack>
            </Grid>

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
