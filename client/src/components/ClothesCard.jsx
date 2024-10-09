import React from 'react';
import { Link } from 'react-router-dom';

const ClothesCard = ({ item }) => {
  return (
    <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
    <div className="relative">
    <img
        src={item.images[0]}
        alt={item.name}
        className="w-65 h-45 object-cover object-center"
      />
      <div>
      {item.inStock 
        ?<span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">In stock</span>
        :<span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of stock</span>
        } 
      </div>
    </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mt-2">${item.price}</p>
        <Link to={item.viewDetails} className="px-2 py-1 bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 rounded-lg text-black">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ClothesCard;
