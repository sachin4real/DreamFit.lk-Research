import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart');

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`Server Error: ${text}`);
        }

        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const updatedItem = await response.json();
      setCartItems(cartItems.map(item => item._id === id ? updatedItem : item));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = () => {
  const cartTotal = cartItems.reduce((total, item) => total + item.ItemPrice * item.Quantity, 0).toFixed(2);

  // Extract relevant cart item details (ItemName and Quantity)
  const cartDetails = cartItems.map(item => ({
    itemName: item.ItemName,
    quantity: item.Quantity,
  }));

  navigate('/checkout', {
    state: { 
      total: cartTotal, 
      cartDetails: cartDetails  
    }
  });
};


  return (
    <div className="container mx-auto p-4">
      <div className="shadow-2xl rounded-lg p-6 bg-white relative before:absolute before:-inset-1 before:bg-gradient-to-r before:from-cyan-500 before:via-teal-500 before:to-green-500 before:blur-xl before:opacity-50 before:rounded-lg before:-z-10">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <img
              src="src/assets/cart/emptyCart.jpg"
              alt="Empty Cart"
              className="mx-auto w-32 h-32 mb-4"
            />
            <p className="text-lg text-gray-600">No items yet? Continue shopping to explore more.</p>
            <button
              className="mt-4 px-4 py-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded"
              onClick={() => window.location.href = '/shop'}>
              Explore Items
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-600 uppercase">Item</th>
                  <th className="py-3 px-6 text-right text-sm font-medium text-gray-600 uppercase">Price</th>
                  <th className="py-3 px-6 text-center text-sm font-medium text-gray-600 uppercase">Qty</th>
                  <th className="py-3 px-6 text-right text-sm font-medium text-gray-600 uppercase">Subtotal</th>
                  <th className="py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200">
                    <td className="py-4 px-6 flex items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.ItemName}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <span className="font-medium text-gray-700">{item.ItemName}</span>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-gray-700">Rs{item.ItemPrice}</td>
                    <td className="py-4 px-6 text-center">
                      <input
                        type="number"
                        value={item.Quantity}
                        min="1"
                        className="w-16 border rounded p-1 text-center"
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                      />
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-gray-700">
                      Rs{(item.ItemPrice * item.Quantity).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeItem(item._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-6">
            <button
  className="px-4 py-2 bg-red-500 shadow-lg shadow-red-500/50 text-white rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-red-600 duration-300"
  onClick={clearCart}>
  Clear Cart
</button>

<button
  className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 shadow-lg shadow-cyan-500/50 text-white rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
  onClick={handleCheckout}>
  Checkout
</button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
