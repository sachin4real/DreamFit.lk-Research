import express from 'express';
import {
  saveCardDetails,
  getSavedCards,
  updateCardDetails,
  deleteCard,
  processPayment,
} from '../controllers/Card_controller.js';

const router = express.Router();

// Route to save card details
router.post('/save', saveCardDetails);

// Route to get all saved cards
router.get('/saved-cards', getSavedCards);

// Route to update card details
router.patch('/update/:id', updateCardDetails);

// Route to delete a card
router.delete('/delete/:id', deleteCard);

// Route to process payment
router.post('/process-payment', processPayment);

export default router;
