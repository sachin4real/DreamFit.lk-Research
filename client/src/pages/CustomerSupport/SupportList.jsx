import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import icons

const SupportList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editTicketId, setEditTicketId] = useState(null);
    const [editForm, setEditForm] = useState({ subject: '', issueType: '', description: '' });

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/support/get');
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching support tickets:', error);
                setError('Failed to fetch support tickets.');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/support/${id}`);
            setTickets(tickets.filter(ticket => ticket._id !== id));
        } catch (error) {
            console.error('Error deleting support ticket:', error);
            setError('Failed to delete support ticket.');
        }
    };

    const handleEditClick = (ticket) => {
        setEditTicketId(ticket._id);
        setEditForm({ subject: ticket.subject, issueType: ticket.issueType, description: ticket.description });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditSubmit = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/support/${id}`, editForm);
            setTickets(tickets.map(ticket => (ticket._id === id ? { ...ticket, ...editForm } : ticket)));
            setEditTicketId(null);
        } catch (error) {
            console.error('Error updating support ticket:', error);
            setError('Failed to update support ticket.');
        }
    };

    if (loading) {
        return <p>Loading support tickets...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Support Tickets</h3>
            {tickets.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {tickets.map(ticket => (
                        <div key={ticket._id} className="bg-white p-6 border border-gray-300 rounded-md shadow-md relative">
                            {editTicketId === ticket._id ? (
                                <div>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={editForm.subject}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                                    />
                                    <select
                                        name="issueType"
                                        value={editForm.issueType}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                                    >
                                        <option value="technical">Technical</option>
                                        <option value="billing">Billing</option>
                                        <option value="general">General</option>
                                    </select>
                                    <textarea
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleEditChange}
                                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                                    />
                                    <button
                                        onClick={() => handleEditSubmit(ticket._id)}
                                        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mb-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditTicketId(null)}
                                        className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="font-bold mb-2">{ticket.subject}</h4>
                                    <p className="mb-1"><strong>Type:</strong> {ticket.issueType}</p>
                                    <p className="mb-1"><strong>Description:</strong> {ticket.description}</p>
                                    <p className="mb-1"><strong>Status:</strong> {ticket.status}</p>
                                    <p className="mb-4"><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <FaEdit 
                                            className="text-blue-500 cursor-pointer hover:text-blue-700" 
                                            onClick={() => handleEditClick(ticket)}
                                        />
                                        <FaTrashAlt 
                                            className="text-red-500 cursor-pointer hover:text-red-700" 
                                            onClick={() => handleDelete(ticket._id)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No support tickets found.</p>
            )}
        </div>
    );
};

export default SupportList;
