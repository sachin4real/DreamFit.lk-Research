import express from 'express';
import { createCartItem, deleteCartItem, updateCartItem, getAllCartItems, getCartItemById, deleteAllCartItems } from '../controllers/Cart_controller.js';

const CartRoute = express.Router();

// Get all cart items
CartRoute.get('/', getAllCartItems);

// Get cart item by ID
CartRoute.get('/:id', getCartItemById);

// Create a new cart item
CartRoute.post('/', createCartItem);

// Update cart item by ID
CartRoute.patch('/:id', updateCartItem);

// Delete cart item by ID
CartRoute.delete('/:id', deleteCartItem);

// Delete all cart items
CartRoute.delete('/', deleteAllCartItems);

export default CartRoute;
