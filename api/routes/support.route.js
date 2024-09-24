import express from 'express';
import * as supportController from '../controllers/supportController.js';

const router = express.Router();

// Create a new support ticket
router.post('/', supportController.createSupportTicket);

// Get all support tickets
router.get('/get', supportController.getAllSupportTickets);

// Get a single support ticket by ID
router.get('/:id', supportController.getSupportTicketById);

// Update a support ticket by ID
router.put('/:id', supportController.updateSupportTicket);

// Delete a support ticket by ID
router.delete('/:id', supportController.deleteSupportTicket);

export default router;
