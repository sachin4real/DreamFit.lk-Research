import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import products from '../data/products';
import Swal from 'sweetalert2'; 

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCart = async () => {
    const cartItem = {
      ItemID: product.id,
      ItemName: product.name,
      Quantity: quantity,
      ItemPrice: product.price,
      imageUrl: selectedImage,
      Size: selectedSize,
    };

    try {
      // Fetch current cart items
      const response = await fetch('http://localhost:3000/cart');
      const cartItems = await response.json();

      const existingItem = cartItems.find(
        (item) => item.ItemID === cartItem.ItemID && item.Size === cartItem.Size
      );

      if (existingItem) {
        // Update the quantity of the existing item
        const updatedQuantity = existingItem.Quantity + quantity;

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
          // Show SweetAlert2 Toast for updated quantity
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'success',
            title: `${product.name} (${selectedSize}) quantity updated in your cart`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          const error = await updateResponse.json();
          console.error('Error updating quantity:', error);
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'error',
            title: 'Failed to update item quantity in cart',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      } else {
        // Add new item to cart
        const addResponse = await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });

        if (addResponse.ok) {
          // Show SweetAlert2 Toast for adding new item
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'success',
            showCancelButton: true,
          cancelButtonText: 'Dismiss',
          confirmButtonText: 'Go to Cart',
            title: `${product.name} (${selectedSize}) added to your cart`,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        } else {
          const error = await addResponse.json();
          console.error('Error adding to cart:', error);
          Swal.fire({
            toast: true,
            position: 'top-right',
            showCancelButton: true,
          cancelButtonText: 'Dismiss',
          confirmButtonText: 'Go to Cart',
            icon: 'error',
            title: 'Failed to add item to cart',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        toast: true,
        position: 'top-right',
        icon: 'error',
        title: 'An error occurred while adding the item to the cart',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
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
                src={img}
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
              src={selectedImage}
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
            <Link to={product.customizeLink} className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white">
              Customize
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16 ml-10">
        <h2 className="text-xl font-semibold mb-2">Product Information</h2>
        <div className="border-t border-b py-4 text-sm text-gray-700">
          <p><strong>Chest:</strong> {product.details.chest}</p>
          <p><strong>Length:</strong> {product.details.length}</p>
          <p><strong>Across Shoulders:</strong> {product.details.shoulders}</p>
          <p><strong>Material:</strong> {product.details.material}</p>
          <p><strong>Color:</strong> {product.details.color}</p>
          <p><strong>Fit Type:</strong> {product.details.fitType}</p>
          <p><strong>Stretch:</strong> {product.details.stretch}</p>
          <p><strong>Style:</strong> {product.details.style}</p>
          <p><strong>Model Size:</strong> {product.details.modelSize}</p>
          <p><strong>Wash & Care:</strong> {product.details.care}</p>
          <p className="text-xs text-gray-500 mt-2"><em>Note: {product.details.note}</em></p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
