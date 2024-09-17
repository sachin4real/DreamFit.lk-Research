import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import Cart from '../models/Cart_model.js';

export const createCartItem = async (req, res) => {
    const { ItemID, ItemName, Quantity, ItemPrice, imageUrl, Size } = req.body;

    if (isNaN(ItemPrice)) {
        return res.status(400).json({ error: 'Invalid Item Price' });
    }

    try {
        // Generate a unique OrderID
        const OrderID = uuidv4();

        const cartItem = await Cart.create({ OrderID, ItemID, ItemName, Quantity, ItemPrice, imageUrl, Size });
        res.status(200).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({});
        res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const getCartItemById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid ID Format' });
    }

    try {
        const cartItem = await Cart.findById(id);

        if (!cartItem) {
            return res.status(404).json({ error: 'No such item' });
        }

        res.status(200).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Cart_controller.js

// Define and export the function
export const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { Quantity } = req.body; // Only destructure Quantity from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        // Find the item and update its quantity
        const updatedCartItem = await Cart.findByIdAndUpdate(
            id,
            { Quantity }, // Only update the Quantity field
            { new: true }
        );

        if (!updatedCartItem) {
            return res.status(404).json({ error: 'No such item' });
        }

        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


export const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const deletedCartItem = await Cart.findByIdAndDelete(id);

        if (!deletedCartItem) {
            return res.status(404).json({ error: 'No such item' });
        }

        res.status(200).json(deletedCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const deleteAllCartItems = async (req, res) => {
    try {
        const deletedItems = await Cart.deleteMany({});
        res.status(200).json(deletedItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
