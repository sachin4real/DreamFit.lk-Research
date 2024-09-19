import express from 'express';
import { addProduct, editProduct, deleteProduct } from '../controllers/clothesProductController.js';

const router = express.Router();

// Add a product
router.post('/add', addProduct);

// Edit a product
router.put('/edit/:id', editProduct);

// Delete a product
router.delete('/delete/:id', deleteProduct);

export default router;
