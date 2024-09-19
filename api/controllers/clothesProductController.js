import ClothesProduct from '../models/clothesProduct.js';
import fs from 'fs';
import path from 'path';

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details } = req.body;

    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new ClothesProduct({
      name,
      price,
      sku,
      sizeOptions: JSON.parse(sizeOptions),
      images,  // Store relative image paths
      customizeLink,
      inStock: inStock === 'true',
      viewDetails,
      category,
      details: JSON.parse(details)
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Edit an existing product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details } = req.body;

    const images = req.files.length > 0 
      ? req.files.map(file => `/uploads/${file.filename}`) 
      : undefined;

    const updatedProduct = {
      name,
      price,
      sku,
      sizeOptions: JSON.parse(sizeOptions),
      customizeLink,
      inStock: inStock === 'true',
      viewDetails,
      category,
      details: JSON.parse(details),
      ...(images && { images }) // Only update images if new images are uploaded
    };

    const product = await ClothesProduct.findByIdAndUpdate(id, updatedProduct, { new: true });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ClothesProduct.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await ClothesProduct.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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

// Update a product by ID
export const updateProductById = async (req, res) => {
  try {
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details } = req.body;

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : undefined;

    const updatedProduct = {
      name,
      price,
      sku,
      sizeOptions: JSON.parse(sizeOptions),
      customizeLink,
      inStock: inStock === 'true',
      viewDetails,
      category,
      details: JSON.parse(details)
    };

    if (images) {
      updatedProduct.images = images;
    }

    const product = await ClothesProduct.findByIdAndUpdate(req.params.id, updatedProduct, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product by ID
export const deleteProductById = async (req, res) => {
  try {
    const product = await ClothesProduct.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
