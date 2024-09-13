import React from 'react';
import { Link } from 'react-router-dom';

const HomeClothesCard = ({ item }) => {
  return (
    <div className="bg-gray-200 shadow-lg rounded-lg overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-56 object-cover object-center"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
        <p className="text-gray-600 mt-2">${item.price}</p>
        <Link to={item.viewProduct} className="px-2 py-1 bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 rounded-lg text-white">
          View Product
        </Link>
      </div>
    </div>
  );
};

export default HomeClothesCard;
