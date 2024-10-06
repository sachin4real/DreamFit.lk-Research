import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';

const CardDetails = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const deliveryFee = 200;
  const [subTotal, setSubTotal] = useState(0);
  const totalAmount = subTotal + deliveryFee;

  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
  });

  const [savedCards, setSavedCards] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart');
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await response.json();
        setCartItems(data);

        const total = data.reduce((acc, item) => acc + item.ItemPrice * item.Quantity, 0);
        setSubTotal(total);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    const fetchSavedCards = async () => {
      try {
        const response = await fetch('http://localhost:3000/card/saved-cards');
        if (!response.ok) {
          throw new Error('Failed to fetch saved cards');
        }
        const data = await response.json();
        setSavedCards(data);
      } catch (error) {
        console.error('Error fetching saved cards:', error);
      }
    };

    fetchCartItems();
    fetchSavedCards();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For card number: Format with a space after every 4 digits
    if (name === 'cardNumber') {
      let formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Add space after every 4 digits
      setCardInfo({
        ...cardInfo,
        [name]: formattedValue.trim(), // Ensure there is no extra trailing space
      });
    }
    // For expiry date: Add '/' after MM
    else if (name === 'expiryDate') {
      let formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      setCardInfo({
        ...cardInfo,
        [name]: formattedValue,
      });
    } else {
      setCardInfo({
        ...cardInfo,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    // Card number validation
    if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, ''))) { // Validate without spaces
      newErrors.cardNumber = 'Card number must be 16 digits';
      isValid = false;
    }

    // Expiry date validation (MM/YY)
    const currentYear = new Date().getFullYear().toString().slice(2); // Get last 2 digits of current year
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed, so add 1

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardInfo.expiryDate)) {
      newErrors.expiryDate = 'Expiry date must be in MM/YY format';
      isValid = false;
    } else {
      const [expMonth, expYear] = cardInfo.expiryDate.split('/');
      if (parseInt(expYear) < parseInt(currentYear) || (parseInt(expYear) === parseInt(currentYear) && parseInt(expMonth) < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
        isValid = false;
      }
    }

    // CVC validation (3 digits, 4 for American Express)
    if (!/^\d{3,4}$/.test(cardInfo.cvc)) {
      newErrors.cvc = 'CVC must be 3 or 4 digits';
      isValid = false;
    }

    // Cardholder name validation
    if (cardInfo.cardholderName.trim() === '') {
      newErrors.cardholderName = 'Cardholder name is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate before submitting
    if (!validate()) return;
  
    try {
      // Check if card already exists in savedCards
      const cardExists = savedCards.some(
        (card) => card.cardNumber === cardInfo.cardNumber.replace(/\s/g, '')
      );
  
      // Save card details if it doesn't already exist
      if (!cardExists) {
        const saveCardResponse = await fetch('http://localhost:3000/card/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...cardInfo,
            cardNumber: cardInfo.cardNumber.replace(/\s/g, ''),
          }),
        });
  
        if (!saveCardResponse.ok) {
          Swal.fire({
            title: 'Card Save Failed',
            text: 'Unable to save card details. Please try again.',
            icon: 'error',
            confirmButtonText: 'Try Again',
            confirmButtonColor: '#0d9488',
          });
          return; // Exit if saving the card fails
        } else {
          const savedCardData = await saveCardResponse.json();
          setSavedCards([...savedCards, savedCardData.card]); // Add new card to saved cards list
        }
      }
  
      // Now proceed with processing the payment
      const paymentResponse = await fetch('http://localhost:3000/card/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...cardInfo,
          cardNumber: cardInfo.cardNumber.replace(/\s/g, ''), // Remove spaces before sending to the backend
          totalAmount,
        }),
      });
  
      if (paymentResponse.ok) {
        // Clear the cart after successful payment
        const clearCartResponse = await fetch('http://localhost:3000/cart/', {
          method: 'DELETE',
        });
  
        if (clearCartResponse.ok) {
          Swal.fire({
            title: 'Order Successful!',
            text: 'Your order has been placed successfully, and your cart has been cleared.',
            icon: 'success',
            confirmButtonText: 'Continue Shopping',
            confirmButtonColor: '#0d9488',
          }).then(() => {
            // Redirect to the homepage or another page after clearing the cart
            navigate('/');
          });
        }
      } else {
        Swal.fire({
          title: 'Payment Failed',
          text: 'There was an issue with your payment. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#0d9488',
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred while processing your payment.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#0d9488',
      });
    }
  };
  
  const handleSavedCardClick = async (card) => {
    try {
      const paymentResponse = await fetch('http://localhost:3000/card/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...card,
          totalAmount,
        }),
      });
  
      if (paymentResponse.ok) {
        const clearCartResponse = await fetch('http://localhost:3000/cart/', {
          method: 'DELETE',
        });
  
        if (clearCartResponse.ok) {
          Swal.fire({
            title: 'Order Successful!',
            text: 'Your order has been placed successfully, and your cart has been cleared.',
            icon: 'success',
            confirmButtonText: 'Continue Shopping',
            confirmButtonColor: '#0d9488',
          }).then(() => {
            navigate('/');
          });
        }
      } else {
        Swal.fire({
          title: 'Payment Failed',
          text: 'There was an issue with your payment. Please try again.',
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#0d9488',
        });
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred while processing your payment.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#0d9488',
      });
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
  
    // Simulating the text-based logo
    const logoText = 'DreamFit.LK';
  
    // Gradient-like background color
    const gradientColors = [
      { color: [34, 197, 94], position: 10 },    // Green
      { color: [13, 148, 136], position: 25 },   // Teal
      { color: [6, 182, 212], position: 40 },    // Cyan
    ];
  
    // Loop to simulate a gradient by drawing colored rectangles behind the text
    gradientColors.forEach(({ color, position }) => {
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(position, 10, 30, 10, 'F'); // Rectangle behind the text
    });
  
    // Text styling for "DreamFit.LK"
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); // White text
    doc.text(logoText, 15, 18); // x, y position for the text
  
    // Title below the logo
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Summary', 20, 40); // Position below logo
  
    // Add styling for table
    doc.autoTable({
      startY: 60, // Adjusted for logo
      head: [['Name', 'Qty', 'Price', 'Subtotal']],
      body: cartItems.map(item => [
        item.ItemName,
        item.Quantity,
        `Rs ${item.ItemPrice.toFixed(2)}`,
        `Rs ${(item.ItemPrice * item.Quantity).toFixed(2)}`
      ]),
      theme: 'grid', // Adding grid lines
      headStyles: { fillColor: [41, 128, 185] }, // Custom header background color
      styles: {
        halign: 'center', // Horizontal alignment of text
        font: 'helvetica',
      },
    });
  
    // Adding the subtotal, delivery fee, and total amount within the content
    const finalY = doc.lastAutoTable.finalY + 10; // Getting the final position of the table
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    
    doc.text(`Subtotal: Rs ${subTotal.toFixed(2)}`, 20, finalY);
    doc.text(`Delivery Fee: Rs ${deliveryFee.toFixed(2)}`, 20, finalY + 10);
    
    // Making the total amount bold
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`Total: Rs ${totalAmount.toFixed(2)}`, 20, finalY + 20);
  
    // Ensure total appears at the bottom of the page
    const pageHeight = doc.internal.pageSize.height; // Get the height of the page
    const bottomY = pageHeight - 20; // Leaving some space at the bottom (20 units from the bottom)
  
    // Drawing a total box or just the total text at the bottom of the page
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0); // Black text color
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount Due: Rs ${totalAmount.toFixed(2)}`, 20, bottomY);
  
    // Save the PDF
    doc.save('order-summary.pdf');
  };
  
  

  return (
    <div className="container mx-auto p-6" style={{ marginBottom: '50px' }}>
      <div className="shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div>
            {/* Saved Cards Section */}
            <h3 className="text-lg font-semibold mb-4">Saved Cards</h3>
            <div className="space-y-2">
              {savedCards.map((card, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-left"
                  onClick={() => handleSavedCardClick(card)}
                >
                  {card.cardholderName} - **** **** **** {card.cardNumber.slice(-4)}
                </button>
              ))}
            </div>
            {/* Existing order summary code here */}
            <h3 className="text-lg font-semibold mb-4 mt-6">Order Summary</h3>
            <div className="border border-gray-300 rounded-md shadow-sm p-4 bg-gray-50">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="py-2 px-4 text-center text-sm font-medium text-gray-700">Qty</th>
                    <th className="py-2 px-4 text-right text-sm font-medium text-gray-700">Price</th>
                    <th className="py-2 px-4 text-right text-sm font-medium text-gray-700">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4 text-left text-sm font-medium text-gray-700">{item.ItemName}</td>
                      <td className="py-2 px-4 text-center text-sm font-medium text-gray-700">{item.Quantity}</td>
                      <td className="py-2 px-4 text-right text-sm font-medium text-gray-700">Rs {item.ItemPrice.toFixed(2)}</td>
                      <td className="py-2 px-4 text-right text-sm font-medium text-gray-700">Rs {(item.ItemPrice * item.Quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="py-2 px-4 text-right text-sm font-medium text-gray-700">Subtotal:</td>
                    <td className="py-2 px-4 text-right text-sm font-medium text-gray-700">Rs {subTotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="py-2 px-4 text-right text-sm font-medium text-gray-700">Delivery Fee:</td>
                    <td className="py-2 px-4 text-right text-sm font-medium text-gray-700">Rs {deliveryFee.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="py-2 px-4 text-right text-sm font-bold text-gray-700">Total:</td>
                    <td className="py-2 px-4 text-right text-sm font-bold text-gray-700">Rs {totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
              <button
                className="mt-4 w-10 h-10 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 flex justify-center items-center"
                onClick={downloadPDF}
              >
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          {/* Payment Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Information</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  value={cardInfo.cardNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
              </div>
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={cardInfo.expiryDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={cardInfo.cvc}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
                {errors.cvc && <p className="text-red-500 text-sm">{errors.cvc}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  placeholder="John Doe"
                  value={cardInfo.cardholderName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
                {errors.cardholderName && <p className="text-red-500 text-sm">{errors.cardholderName}</p>}
              </div>
              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white font-bold rounded-md shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-300"
              >
                Pay Rs {totalAmount.toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;