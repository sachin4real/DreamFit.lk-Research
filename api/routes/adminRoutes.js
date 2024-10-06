import express from 'express';
import { getAdminSalesReport } from '../controllers/adminController.js'; // Import the controller function

const router = express.Router();

// Use controller for sales report route
router.get('/sales-report', getAdminSalesReport);

export default router;
