import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartTotal = location.state?.total || 0; // Default to 0 if no total passed

  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
  });

  const [summary, setSummary] = useState({
    subtotal: cartTotal,
    deliveryFee: 200, // Example static shipping fee
    total: parseFloat(cartTotal) + 200, // Example calculation including shipping fee
  });

  const handleChange = (e) => {
    setDeliveryInfo({
      ...deliveryInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deliveryData = {
      ...deliveryInfo,
      subtotal: summary.subtotal,
      deliveryFee: summary.deliveryFee,
      total: summary.total,
    };

    try {
      const response = await fetch('http://localhost:3000/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData),
      });

      if (response.ok) {
        alert('Delivery information saved successfully.');
        navigate('/card', { state: { total: summary.total } });
      } else {
        alert('Failed to save delivery information.');
      }
    } catch (error) {
      console.error('Error saving delivery information:', error);
      alert('An error occurred while saving delivery information.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input
                type="text"
                name="firstName"
                value={deliveryInfo.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input
                type="text"
                name="lastName"
                value={deliveryInfo.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                value={deliveryInfo.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone number</label>
              <input
                type="tel"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={deliveryInfo.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip code</label>
              <input
                type="text"
                name="zipCode"
                value={deliveryInfo.zipCode}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="border border-gray-300 rounded-md shadow-sm p-4">
              <h3 className="text-lg font-semibold">Summary</h3>
              <div className="flex justify-between mt-4">
                <span>Subtotal:</span>
                <span>Rs{summary.subtotal}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Delivery Fee:</span>
                <span>Rs{summary.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>Rs{summary.total.toFixed(2)}</span>
              </div>
            </div>
            <button
  type="submit"
  className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300">
  Proceed to Payment
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
