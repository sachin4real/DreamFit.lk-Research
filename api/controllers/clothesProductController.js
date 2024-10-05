import ClothesProduct from '../models/clothesProduct.js';
import fs from 'fs';
import path from 'path';

export const addProduct = async (req, res) => {
  try {
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details, stockQuantity } = req.body;

    // Check if files are uploaded
    const images = req.files && req.files.length > 0 ? req.files.map(file => `/uploads/${file.filename}`) : [];

    

    // Ensure sizeOptions is an array (it might come as a string like "M, L, S")
    const parsedSizeOptions = Array.isArray(sizeOptions) ? sizeOptions : sizeOptions.split(',').map(option => option.trim());

    // Check if 'details' is a string, then parse it. If it's already an object, use it as is.
    const parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;

    // Creating a new product with the parsed data
    const newProduct = new ClothesProduct({
      name,
      price,
      sku,
      sizeOptions: parsedSizeOptions,
      images,  // Store relative image paths
      customizeLink,
      inStock: inStock === 'true',  // Convert 'inStock' to boolean
      stockQuantity: parseInt(stockQuantity, 10),  // Convert stockQuantity to a number
      viewDetails,
      category,
      details: parsedDetails  // Use the parsed details object
    });

    // Save the new product to the database
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

export const updateProductById = async (req, res) => {
  try {
    // Log the request body for debugging
    console.log('Request body:', req.body);
    
    const { name, price, sku, sizeOptions, customizeLink, inStock, viewDetails, category, details, stockQuantity } = req.body;

    // Log for debugging to see exactly what is being passed
    console.log('Received sizeOptions:', sizeOptions);
    console.log('Received details:', details);

    // Convert sizeOptions to an array if it's a string
    let parsedSizeOptions;
    if (typeof sizeOptions === 'string') {
      parsedSizeOptions = sizeOptions.split(',').map(option => option.trim()); // Convert 'S' into ['S']
    } else {
      parsedSizeOptions = sizeOptions; // If it's already an array, use it as is
    }

    // Try parsing details if it's a string, catch any JSON errors
    let parsedDetails;
    try {
      parsedDetails = typeof details === 'string' ? JSON.parse(details || '{}') : details;
    } catch (e) {
      console.error('Error parsing details:', e.message);
      return res.status(400).json({ error: 'Invalid JSON format for details' });
    }

    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : undefined;

    // Create updated product object
    const updatedProduct = {
      name,
      price,
      sku,
      sizeOptions: parsedSizeOptions,
      customizeLink,
      inStock: inStock === 'true',
      stockQuantity: parseInt(stockQuantity, 10),
      viewDetails,
      category,
      details: parsedDetails,
    };

    // Only update images if new images are provided
    if (images) {
      updatedProduct.images = images;
    }

    // Find the product by ID and update it
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

// Generate inventory report
export const getInventoryReport = async (req, res) => {
  try {
    const products = await ClothesProduct.find();

    // Build the inventory report
    const inventoryReport = products.map(product => ({
      name: product.name,
      sku: product.sku,
      category: product.category,
      inStock: product.inStock ? 'In Stock' : 'Out of Stock',
      stockQuantity: product.stockQuantity,
      colors: product.details.color, // Assuming 'color' is included in 'details'
    }));

    // Separate out-of-stock products
    const outOfStockItems = inventoryReport.filter(product => product.inStock === 'Out of Stock');

    res.status(200).json({
      totalProducts: inventoryReport.length,
      inStockItems: inventoryReport.filter(item => item.inStock === 'In Stock').length,
      outOfStockItems: outOfStockItems.length,
      products: inventoryReport,
    });
  } catch (error) {
    console.error('Error generating inventory report:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

