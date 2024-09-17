import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    OrderID: {
        type: String,
        required: true,
    },
    ItemID: {
        type: String,
        required: true,
    },
    ItemName: {
        type: String,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    ItemPrice: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    Size: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
