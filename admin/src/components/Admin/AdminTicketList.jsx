import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminTicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showPopup, setShowPopup] = useState(false);  // State for showing popup

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

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/support/${id}`, { status: newStatus });
            setTickets(tickets.map(ticket => (ticket._id === id ? { ...ticket, status: newStatus } : ticket)));
            setShowPopup(true);  // Show popup
            setTimeout(() => setShowPopup(false), 3000);  // Hide popup after 3 seconds
        } catch (error) {
            console.error('Error updating ticket status:', error);
            setError('Failed to update ticket status.');
        }
    };

    if (loading) {
        return <p>Loading tickets...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Admin Support Ticket List</h2>

            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th className="py-3 px-5 border-b text-left">Name</th>
                        <th className="py-3 px-5 border-b text-left">Email</th>
                        <th className="py-3 px-5 border-b text-left">Phone Number</th>
                        <th className="py-3 px-5 border-b text-left">Subject</th>
                        <th className="py-3 px-5 border-b text-left">Issue Type</th>
                        <th className="py-3 px-5 border-b text-left">Description</th>
                        <th className="py-3 px-5 border-b text-left">Status</th>
                        <th className="py-3 px-5 border-b text-left">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="py-3 px-5 border-b">{ticket.name}</td>
                            <td className="py-3 px-5 border-b">{ticket.email}</td>
                            <td className="py-3 px-5 border-b">{ticket.phoneNumber}</td>
                            <td className="py-3 px-5 border-b">{ticket.subject}</td>
                            <td className="py-3 px-5 border-b">{ticket.issueType}</td>
                            <td className="py-3 px-5 border-b">{ticket.description}</td>
                            <td className="py-3 px-5 border-b">
                                <select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="open">Open</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </td>
                            <td className="py-3 px-5 border-b">{new Date(ticket.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <p className="text-xl font-bold text-green-600">Successfully changed status!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTicketList;