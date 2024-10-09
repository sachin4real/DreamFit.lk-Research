import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvc: {
    type: String,
    required: true,
  },
  cardholderName: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Card = mongoose.model('Card', cardSchema);

export default Card;
