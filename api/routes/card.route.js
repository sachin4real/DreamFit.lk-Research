import express from 'express';
import { saveCardDetails } from '../controllers/Card_controller.js';

const router = express.Router();

// Route to save card details
router.post('/save', saveCardDetails);

export default router;
