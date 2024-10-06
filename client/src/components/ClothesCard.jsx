import React from 'react';
import { Link } from 'react-router-dom';

const ClothesCard = ({ item }) => {
  // Logic for handling images
  const isBackendImage = item.images && item.images.length > 0 && item.images[0].includes('/uploads');
  const imageUrl = isBackendImage
    ? `http://localhost:3000${item.images[0]}`  // If the image comes from the backend uploads folder
    : item.images && item.images.length > 0
    ? item.images[0]  // If it's a client-side image, use it as is
    : '/placeholder-image.jpg';  // Use a placeholder image if no image is found

  return (
    <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Image Section */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-64 object-cover object-center"
        />
        {/* In Stock/Out of Stock Badge */}
        <div>
          {item.inStock ? (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              In Stock
            </span>
          ) : (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mt-2">${item.price.toFixed(2)}</p>
        
        {/* View Product Link */}
        <Link
          to={`/product/${item.id || item._id}`}  // Handle both hardcoded and backend IDs
          className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 rounded-lg text-black font-medium hover:opacity-90 transition-opacity duration-200"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ClothesCard;
