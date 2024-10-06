import Support from '../models/Support_model.js';

export const createSupportTicket = async (req, res) => {
    try {
        const { name, email, phoneNumber, subject, issueType, description } = req.body;
        const newTicket = new Support({ name, email, phoneNumber, subject, issueType, description });
        await newTicket.save();
        res.status(201).json({ message: 'Support ticket created successfully!' });
    } catch (error) {
        console.error('Error in createSupportTicket:', error);
        res.status(500).json({ message: 'Failed to create support ticket.', error });
    }
};

export const getAllSupportTickets = async (req, res) => {
    try {
        // Sort by 'createdAt' in descending order (-1)
        const tickets = await Support.find().sort({ createdAt: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve support tickets.' });
    }
};


export const getSupportTicketById = async (req, res) => {
    try {
        const ticket = await Support.findById(req.params.id);
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error in getSupportTicketById:', error);
        res.status(500).json({ message: 'Failed to retrieve support ticket.', error: error.message });
    }
};

export const getSupportTicketsByUserId = async (req, res) => {
    try {
        const tickets = await Support.find({ userId: req.params.userId });
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error in getSupportTicketsByUserId:', error);
        res.status(500).json({ message: 'Failed to retrieve user support tickets.', error: error.message });
    }
};

export const updateSupportTicket = async (req, res) => {
    try {
        console.log('Update Data:', req.body); // Log update data
        const { subject, issueType, description, status } = req.body;
        const ticket = await Support.findByIdAndUpdate(req.params.id, { subject, issueType, description, status, updatedAt: Date.now() }, { new: true });
        res.status(200).json({ message: 'Support ticket updated successfully!', ticket });
    } catch (error) {
        console.error('Error in updateSupportTicket:', error);
        res.status(500).json({ message: 'Failed to update support ticket.', error: error.message });
    }
};

export const deleteSupportTicket = async (req, res) => {
    try {
        await Support.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Support ticket deleted successfully!' });
    } catch (error) {
        console.error('Error in deleteSupportTicket:', error);
        res.status(500).json({ message: 'Failed to delete support ticket.', error: error.message });
    }
};
