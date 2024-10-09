import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart');
        if (response.ok) {
          const cart = await response.json();
          setCartItems(cart);
        } else {
          toast.error('Failed to load cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        toast.error('Error loading cart items');
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Quantity: newQuantity }),
      });

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, Quantity: newQuantity } : item
          )
        );
        toast.success('Quantity updated successfully');
      } else {
        toast.error('Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error updating quantity');
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'DELETE',
      });

      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Error removing item');
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('http://localhost:3000/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Add correct headers
        },
      });

      if (response.ok) {
        setCartItems([]); // Clear the cart on the frontend after a successful response
        toast.success('Cart cleared successfully');
      } else {
        toast.error('Failed to clear the cart');
      }
    } catch (error) {
      console.error('Error clearing the cart:', error);
      toast.error('Error clearing the cart');
    }
  };

  const handleCheckout = () => {
    const cartTotal = cartItems
      .reduce((total, item) => total + item.ItemPrice * item.Quantity, 0)
      .toFixed(2);

    const cartDetails = cartItems.map((item) => ({
      itemName: item.ItemName,
      quantity: item.Quantity,
      Size: item.Size || 'N/A',
    }));

    navigate('/checkout', {
      state: {
        total: cartTotal,
        cartDetails: cartDetails,
      },
    });
  };

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.ItemPrice * item.Quantity,
    0
  );
  const shippingFee = 200.0;
  const cartTotal = cartSubtotal + shippingFee;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 mt-5 flex-grow">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 tracking-wide uppercase">
            Your Cart
          </h2>
          {loading ? (
            <div>Loading...</div>
          ) : cartItems.length === 0 ? (
            <div className="text-center">
              <img
                src="src/assets/cart/emptyCart.jpg"
                alt="Empty Cart"
                className="mx-auto w-32 h-32 mb-4"
              />
              <p className="text-md text-gray-600">
                Your cart is empty. Time to explore more!
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-lg hover:shadow-md transition-shadow"
                onClick={() => (window.location.href = '/')}
              >
                Explore Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id} className="border-b border-gray-300">
                        <td className="py-4 px-4 flex items-center space-x-4">
                          <img
                            src={item.imageUrl}
                            alt={item.ItemName}
                            className="w-24 h-24 object-cover rounded-lg shadow-md"
                          />
                          <div>
                            <span className="font-bold text-md text-gray-800">
                              {item.ItemName}
                            </span>
                            <p className="text-sm text-gray-500">
                              Rs {item.ItemPrice}
                            </p>
                            <p className="text-sm text-gray-500">
                              Size: {item.Size || 'N/A'}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <input
                            type="number"
                            value={item.Quantity}
                            min="1"
                            className="w-12 border rounded p-2 text-center text-md"
                            onChange={(e) =>
                              updateQuantity(item._id, parseInt(e.target.value))
                            }
                          />
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            className="text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => removeItem(item._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="col-span-1">
                <div className="bg-gray-100 p-4 rounded-lg shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Cart Totals</h3>
                  <div className="flex justify-between text-md mb-3">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">
                      Rs {cartSubtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-md mb-3">
                    <span className="text-gray-600">Shipping Fee:</span>
                    <span className="font-semibold">
                      Rs {shippingFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-md mb-6">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-bold text-xl">
                      Rs {cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg text-md hover:shadow-lg transition-shadow"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                    <button
                      className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg text-md hover:shadow-lg transition-shadow"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Include the ToastContainer to show the notifications */}
      <ToastContainer />
    </div>
  );
};

export default Cart;
