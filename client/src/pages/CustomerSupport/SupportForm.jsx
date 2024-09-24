import React, { useState } from 'react';
import axios from 'axios';

const SupportForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [issueType, setIssueType] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const submitSupportRequest = async () => {
        try {
            const data = { name, email, phoneNumber, subject, issueType, description };
            await axios.post('http://localhost:3000/api/support', data);
            setMessage('Support request submitted successfully!');
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            setMessage('Failed to submit support request. Please try again.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg mt-10"
             style={{
                 backdropFilter: 'blur(10px)',  // Adds blur effect to the background
                 backgroundColor: 'rgba(255, 255, 255, 0.75)'  // Slightly transparent white background
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
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Submit
            </button>

            {message && <p className="text-center mt-4 text-red-500">{message}</p>}
        </div>
    );
};

export default SupportForm;
