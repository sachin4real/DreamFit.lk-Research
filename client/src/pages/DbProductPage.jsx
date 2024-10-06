import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios'; // Using axios for backend API calls

const DbProductPage = () => {
  const { id } = useParams(); // Get the product id from the URL params
  const [product, setProduct] = useState(null); // State to hold the product data
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Fetch product details from the backend when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`); // Adjust the URL as per your backend
        const productData = response.data;
        setProduct(productData);
        setSelectedImage(productData.images[0]); // Set the initial selected image
        setSelectedSize(productData.sizeOptions[0]); // Set the initial selected size
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]); // Re-run when id changes

  if (!product) {
    return <div>Loading product details...</div>; // Display a loading message until the product is loaded
  }

  const addToCart = async () => {
    const cartItem = {
      ItemID: product._id,
      ItemName: product.name,
      Quantity: quantity,
      ItemPrice: product.price,
      imageUrl: selectedImage,
      Size: selectedSize,
    };

    try {
      const response = await fetch('http://localhost:3000/cart');
      const cartItems = await response.json();

      const existingItem = cartItems.find(
        (item) => item.ItemID === cartItem.ItemID && item.Size === cartItem.Size
      );

      if (existingItem) {
        const updatedQuantity = existingItem.Quantity + 1;

        const updateResponse = await fetch(`http://localhost:3000/cart/${existingItem._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Quantity: updatedQuantity,
          }),
        });

        if (updateResponse.ok) {
          alert(`${product.name} (${selectedSize}) quantity has been updated in your cart.`);
        } else {
          const error = await updateResponse.json();
          console.error('Error updating quantity:', error);
          alert('Failed to update item quantity in cart.');
        }
      } else {
        const addResponse = await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });

        if (addResponse.ok) {
          alert(`${product.name} (${selectedSize}) has been added to your cart.`);
        } else {
          const error = await addResponse.json();
          console.error('Error adding to cart:', error);
          alert('Failed to add item to cart.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the item to the cart.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        <div className="flex items-start space-x-4 justify-center">
          <div className="flex flex-col space-y-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:3000${img}`} // Prepend the backend URL
                alt={`${product.name} ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-20 rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? 'border-blue-500' : 'border-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="flex-2 flex justify-left">
            <img
              src={`http://localhost:3000${selectedImage}`}
              alt={product.name}
              className="w-68 h-80 object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col ml-0">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
          <p className="text-2xl text-gray-800 mb-4">Rs {product.price}.00</p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Style Size:</label>
            <select
              className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4 mb-4">
            <button
              onClick={addToCart}
              className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white"
            >
              Add to cart
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800">Add to Wishlist</button>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium text-gray-600">Share:</span>
            <button className="text-gray-600">
              <FaFacebook size={20} />
            </button>
            <button className="text-gray-600">
              <FaWhatsapp size={20} />
            </button>
          </div>

          <div className="flex space-x-4 mb-4">
            <Link
              to={product.customizeLink}
              className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white"
            >
              Customize
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 ml-10">
        <h2 className="text-xl font-semibold mb-2">Product Information</h2>
        <div className="border-t border-b py-4 text-sm text-gray-700">
          <p>
            <strong>Chest:</strong> {product.details.chest}
          </p>
          <p>
            <strong>Length:</strong> {product.details.length}
          </p>
          <p>
            <strong>Across Shoulders:</strong> {product.details.shoulders}
          </p>
          <p>
            <strong>Material:</strong> {product.details.material}
          </p>
          <p>
            <strong>Color:</strong> {product.details.color}
          </p>
          <p>
            <strong>Fit Type:</strong> {product.details.fitType}
          </p>
          <p>
            <strong>Stretch:</strong> {product.details.stretch}
          </p>
          <p>
            <strong>Style:</strong> {product.details.style}
          </p>
          <p>
            <strong>Model Size:</strong> {product.details.modelSize}
          </p>
          <p>
            <strong>Wash & Care:</strong> {product.details.care}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <em>Note: {product.details.note}</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DbProductPage;
