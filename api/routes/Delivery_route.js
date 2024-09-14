import express from 'express';
import { saveDeliveryDetails } from '../controllers/Delivery_controller.js';

const router = express.Router();

// Route to save delivery details
router.post('/', saveDeliveryDetails);  // Correct: This handles POST requests to /delivery

export default router;
