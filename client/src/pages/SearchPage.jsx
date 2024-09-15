import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../data/products'; 
import ClothesCard from '../components/ClothesCard';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Function to extract query params from URL
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  useEffect(() => {
    // Extract query from the URL on component mount and update state
    const query = getQueryParam('q') || '';
    setSearchTerm(query);

    // Filter products based on the query
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()) ||
      product.details.material.toLowerCase().includes(query.toLowerCase()) ||
      product.details.color.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [location]);

  // Handle search input change
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Update the URL query string as the user types
    navigate(`/search?q=${encodeURIComponent(term)}`);

    // Filter products based on the input
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.details.material.toLowerCase().includes(term) ||
      product.details.color.toLowerCase().includes(term)
    );
    setFilteredProducts(results);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Clothes Search</h1>

    

        {/* Display search results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((item) => (
              <ClothesCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center text-lg">No products found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
