import ClothesProduct from '../models/clothesProduct.js';
import fs from 'fs';
import path from 'path';

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, price, sku, sizeOptions, images, customizeLink, inStock, viewDetails, category, details } = req.body;

    const newProduct = new ClothesProduct({
      name,
      price,
      sku,
      sizeOptions,
      images, // Images sent as JSON (URLs or base64 if needed)
      customizeLink,
      inStock,
      viewDetails,
      category,
      details,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error adding product' });
  }
};

// Edit an existing product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, sku, sizeOptions, images, customizeLink, inStock, viewDetails, category, details } = req.body;

    const product = await ClothesProduct.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.sku = sku || product.sku;
    product.sizeOptions = sizeOptions || product.sizeOptions;
    product.images = images || product.images;
    product.customizeLink = customizeLink || product.customizeLink;
    product.inStock = inStock || product.inStock;
    product.viewDetails = viewDetails || product.viewDetails;
    product.category = category || product.category;
    product.details = details || product.details;

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ClothesProduct.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Optionally remove images from the filesystem if applicable
    product.images.forEach(image => {
      const imagePath = path.join(path.resolve(), image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};
