import mongoose from 'mongoose'
import Cart from '../models/Cart_model.js';

export const createCartItem = async (req, res) => {
    const { OrderID, ItemID, ItemName, Quantity, ItemPrice, imageUrl } = req.body;

    if (isNaN(ItemPrice)) {
        return res.status(400).json({ error: 'Invalid Item Price' });
    }

    try {
        const cartItem = await Cart.create({ OrderID, ItemID, ItemName, Quantity, ItemPrice, imageUrl });
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

export const updateCartItem = async (req, res) => {
    const { id } = req.params;
    const { OrderID, ItemID, ItemName, Quantity, ItemPrice, imageUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID Format' });
    }

    try {
        const updatedCartItem = await Cart.findByIdAndUpdate(id, { OrderID, ItemID, ItemName, Quantity, ItemPrice, imageUrl }, { new: true });

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

    // Validate the MongoDB ObjectId
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
