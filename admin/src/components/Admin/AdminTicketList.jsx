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
        <div className="admin-ticket-list">
            <h2 className="title">Admin Support Ticket List</h2>

            <table className="ticket-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Subject</th>
                        <th>Issue Type</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id}>
                            <td>{ticket.name}</td>
                            <td>{ticket.email}</td>
                            <td>{ticket.phoneNumber}</td>
                            <td>{ticket.subject}</td>
                            <td>{ticket.issueType}</td>
                            <td>{ticket.description}</td>
                            <td>
                                <select
                                    value={ticket.status}
                                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                                >
                                    <option value="open">Open</option>
                                    <option value="in progress">In Progress</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </td>
                            <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup Modal */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Successfully changed status!</p>
                    </div>
                </div>
            )}

            <style>{`
                .admin-ticket-list {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding: 24px;
                }

                .title {
                    font-size: 2rem;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 24px;
                }

                .ticket-table {
                    width: 100%;
                    border-collapse: collapse;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }

                .ticket-table th, .ticket-table td {
                    padding: 12px 16px;
                    border: 1px solid #ccc;
                    text-align: left;
                }

                .ticket-table tr:hover {
                    background-color: #f9f9f9;
                }

                .ticket-table select {
                    padding: 6px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    outline: none;
                }

                .popup {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                }

                .popup-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .popup-content p {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #38a169;  /* Green color */
                }
            `}</style>
        </div>
    );
};

export default AdminTicketList;
