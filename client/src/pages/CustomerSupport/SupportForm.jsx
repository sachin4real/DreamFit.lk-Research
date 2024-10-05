import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa'; // Ticket icon

const SupportForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const [popupMessage, setPopupMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // To control the success/error popup
    const [isError, setIsError] = useState(false); // To track if it's an error popup

    const submitSupportRequest = async () => {
        try {
            const data = { name, email, phoneNumber, subject, issueType, description };
            await axios.post('http://localhost:3000/api/support', data);
            setPopupMessage('Your request has been submitted successfully!');
            setIsError(false); // It's a success, no error
            setShowPopup(true); // Show success popup
        } catch (error) {
            setPopupMessage('Failed to submit support request. Please try again.');
            setIsError(true); // It's an error
            setShowPopup(true); // Show error popup
        }
    };

    return (
        <div className="relative">
            {/* My Ticket Button outside the form */}
            <Link to="/supportlist">
                <button className="fixed top-20 right-4 px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white hover:opacity-80 transition duration-300 flex items-center z-50">
                    <FaTicketAlt className="mr-2" /> My Tickets
                </button>
            </Link>

            <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg mt-10"
                 style={{
                     backdropFilter: 'blur(10px)',
                     backgroundColor: 'rgba(255, 255, 255, 0.75)'
                 }}
            >
                <h3 className="text-2xl font-bold mb-6 text-center">Submit a Support Request</h3>

                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Name" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    type="text" 
                    value={phoneNumber} 
                    onChange={e => setPhoneNumber(e.target.value)} 
                    placeholder="Phone Number" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input 
                    type="text" 
                    value={subject} 
                    onChange={e => setSubject(e.target.value)} 
                    placeholder="Subject" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select 
                    value={issueType} 
                    onChange={e => setIssueType(e.target.value)} 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Select Issue Type</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="general">General</option>
                </select>

                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="Description" 
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button 
                    onClick={submitSupportRequest} 
                    className="w-full px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white hover:opacity-80 transition duration-300"
                >
                    Submit
                </button>

                {/* Success/Error Popup */}
                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                            <div className="mb-4">
                                <svg className={`mx-auto h-16 w-16 ${isError ? 'text-red-500' : 'text-green-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isError ? "M6 18L18 6M6 6l12 12" : "M5 13l4 4L19 7"} />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{isError ? 'Error!' : 'Request Successful!'}</h2>
                            <p>{popupMessage}</p>
                            <button 
                                onClick={() => setShowPopup(false)} 
                                className="px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white hover:opacity-80 mt-4 transition duration-300"
                            >
                                {isError ? 'Try Again' : 'Continue'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportForm;