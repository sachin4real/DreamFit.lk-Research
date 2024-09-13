import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import products from '../data/products';



const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  if (!product) {
    return <div>Product not found</div>;
  }

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
                className={`w-16 h-20 rounded-lg cursor-pointer border-2 ${selectedImage === img ? 'border-blue-500' : 'border-gray-200'}`}
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
            <select className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              {product.sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-4 mb-4">
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white">Add to cart</button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800">Add to Wishlist</button>
          </div>

          

          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm font-medium text-gray-600">Share:</span>
            <button className="text-gray-600"><FaFacebook size={20} /></button>
            <button className="text-gray-600"><FaWhatsapp size={20} /></button>
          </div>

          <div className="flex space-x-4 mb-4">
          <Link to={product.customizeLink} className="px-4 py-2 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white">Customize</Link>
          </div>

        </div>
      </div>

      <div className="mt-16 ml-10  ">
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

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
          {products.slice(1, 5).map((relatedProduct) => (
            <div key={relatedProduct.id} className="border p-4 rounded-lg max-w-xs">
              <div className="relative">
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.name}
                  className="w-full h-56 object-contain rounded-lg mb-2"
                />
               <div>
               {relatedProduct.inStock 
                  ?<span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">In stock</span>
                  :<span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Out of stock</span>
                }
                </div>

                
              </div>
              <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
              <p className="text-gray-700">Rs {relatedProduct.price}.00</p>
              <div className="mt-2">
                <a href={relatedProduct.viewDetails} className="px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white">View Details</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
