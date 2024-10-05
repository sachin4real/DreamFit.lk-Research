import ClothesProduct from '../models/clothesProduct.js';
import fs from 'fs';
import path from 'path';
const { Parser } = require('json2csv');

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details, stockQuantity } = req.body;

    const images = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new ClothesProduct({
      name,
      price,
      sku,
      sizeOptions: JSON.parse(sizeOptions),
      images,  // Store relative image paths
      customizeLink,
      inStock: inStock === 'true',
      stockQuantity: parseInt(stockQuantity, 10), // Adding stockQuantity
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
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details, stockQuantity } = req.body;

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
      stockQuantity: parseInt(stockQuantity, 10), // Updating stockQuantity
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
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details, stockQuantity } = req.body;

    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : undefined;

    const updatedProduct = {
      name,
      price,
      sku,
      sizeOptions: JSON.parse(sizeOptions),
      customizeLink,
      inStock: inStock === 'true',
      stockQuantity: parseInt(stockQuantity, 10), // Updating stockQuantity
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

// Generate a stock report
export const generateStockReport = async (req, res) => {
  try {
    // Fetch all products
    const products = await ClothesProduct.find();

    // Initialize arrays to separate in-stock and out-of-stock products
    const inStockProducts = [];
    const outOfStockProducts = [];

    // Calculate total stock value for in-stock products
    let totalStockValue = 0;

    // Process each product to calculate stock value and categorize in-stock/out-of-stock
    products.forEach(product => {
      const stockValue = product.price * product.stockQuantity;
      if (product.stockQuantity > 0) {
        inStockProducts.push({
          name: product.name,
          sku: product.sku,
          price: product.price,
          stockQuantity: product.stockQuantity,
          stockValue, // Total value for the product (price * stockQuantity)
          category: product.category,
          inStock: product.inStock,
        });
        totalStockValue += stockValue;
      } else {
        outOfStockProducts.push({
          name: product.name,
          sku: product.sku,
          price: product.price,
          category: product.category,
          inStock: product.inStock,
        });
      }
    });

    // Prepare the report data
    const report = {
      totalProducts: products.length,
      totalStockValue,
      inStockProductsCount: inStockProducts.length,
      outOfStockProductsCount: outOfStockProducts.length,
      inStockProducts,   // List of products with available stock
      outOfStockProducts // List of products with no stock available
    };

    // Return the report as a JSON response
    res.status(200).json(report);
  } catch (error) {
    console.error('Error generating stock report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getInventoryReport = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ClothesProduct.find();

    // Define fields for the CSV export
    const fields = [
      { label: 'Product Name', value: 'name' },
      { label: 'Price', value: 'price' },
      { label: 'SKU', value: 'sku' },
      { label: 'Category', value: 'category' },
      { label: 'Stock Quantity', value: 'stockQuantity' },
      { label: 'In Stock', value: 'inStock' },
      { label: 'Size Options', value: (row) => row.sizeOptions.join(', ') }, // Handle array to CSV
      { label: 'Material', value: 'details.material' },
      { label: 'Color', value: 'details.color' },
    ];

    // Convert products to CSV format
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(products);

    // Set headers for the file download
    res.header('Content-Type', 'text/csv');
    res.attachment('inventory_report.csv');
    return res.send(csv);
  } catch (error) {
    console.error('Error generating inventory report:', error);
    res.status(500).json({ message: 'Error generating inventory report' });
  }
};