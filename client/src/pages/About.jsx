import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="container mx-auto px-5 py-8">
       <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Welcome to DreamFit.LK
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At DreamFit.LK, we are passionate about fashion and believe that
              everyone deserves to look and feel great. We are a modern
              clothing brand offering the latest styles and trends, ensuring you
              can express yourself in the best possible way. From chic casual
              wear to elegant formal attire, we have something for every
              occasion and every personality.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Our mission is to provide high-quality, stylish, and affordable
              clothing that empowers individuals to express their unique style.
              Whether you're dressing up for a special event or simply looking
              to refresh your wardrobe, DreamFit.LK has got you covered.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://cms.sriyanidresspoint.lk/storage/product/front/womens-square-neck-sleeveless-crop-top-010112302072-1.jpg"
              alt="About Us"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Why Shop With Us?
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center w-full md:w-1/3">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                We offer stylish clothing without breaking the bank. Our prices are designed to be affordable for everyone.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center w-full md:w-1/3">
              <h3 className="text-xl font-bold text-gray-800 mb-2">High-Quality Materials</h3>
              <p className="text-gray-600">
                Our clothing is made from the finest materials, ensuring durability and comfort with every piece.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center w-full md:w-1/3">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Latest Trends</h3>
              <p className="text-gray-600">
                Stay ahead of the fashion game with our collection of the latest trends and styles.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            to={"/collection"}
            className="bg-transparent hover:bg-green-300 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
      </div>
  )
}
