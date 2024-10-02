import ClothesProduct from '../models/clothesProduct.js';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';


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
//product review adding
export const addProductReview = async (req, res) => {
  console.log('pppppp');
  const { rating, comment } = req.body;

  try {
    console.log('qqqqq');
    // Make sure you're looking for the product using the `sku`
    const product = await ClothesProduct.findOne({ sku: req.params.sku });
     console.info('product is found', product)
    if (product) {
  
      const review = {
        name: 'Default User', // Static since no authentication is used
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

      await product.save();
      res.status(201).json({ message: 'Review added', reviews: product.reviews });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const getProductByIdWithReviews = async (req, res) => {
  try {
    // Find product by SKU
    const product = await ClothesProduct.findOne({ sku: req.params.sku });

    // If product exists
    if (product) {
      res.status(200).json({
        name: product.name,
        rating: product.rating,
        numReviews: product.numReviews,
        reviews: product.reviews
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

