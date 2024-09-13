import React, { useState } from 'react';
import products from '../data/products';
import ClothesCard from '../components/ClothesCard';

export default function Collection() {
  const [clothes, setClothes] = useState(products);
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredClothes = filter === 'All' ? clothes : clothes.filter((item) => item.category === filter);

  return (
    <div>
      <div className="container mx-auto px-9 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Latest Collection
        </h1>
        
        {/* Filter Section */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-4 py-2 border ${filter === 'All' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => handleFilterChange('All')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 border ${filter === 'Men' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => handleFilterChange('Men')}
          >
            Men
          </button>
          <button
            className={`px-4 py-2 border ${filter === 'Women' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => handleFilterChange('Women')}
          >
            Women
          </button>
          <button
            className={`px-4 py-2 border ${filter === 'Kids' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            onClick={() => handleFilterChange('Kids')}
          >
            Kids
          </button>
        </div>

        {/* Clothes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredClothes.map((item) => (
            <ClothesCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
