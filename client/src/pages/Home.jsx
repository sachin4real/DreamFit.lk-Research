import React  from 'react'
import ProductCard from '../components/ProductCard';
import HomeClothesCard from '../components/HomeClothesCard';
import Slider from '../components/Slider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import ClothesCard from '../components/ClothesCard';


export default function Home() {

  const [clothes, setClothes] = useState(products);

  const clothesData = [
    {
      id: 1,
      name: 'Work-Out',
      price: 19.99,
      image: 'https://gflock.lk/cdn/shop/files/GFX-cover-LK_final2_2048x2048.jpg?v=1722403511',
    },
    {
      id: 2,
      name: 'NightWears',
      price: 49.99,
      image: 'https://nilsonline.lk/image/catalog/nils/product/night-wear%20collection%20by%20nils_150623.jpg',
    },
    {
      id: 3,
      name: 'Dress',
      price: 39.99,
      image: 'https://nilsonline.lk/image/cache/catalog/nils/product/Home%20Page/August_5th_Website%20Homepage-2880x1180.jpg',
    },
    {
      id: 4,
      name: 'Denim',
      price: 79.99,
      image: 'https://gflock.lk/cdn/shop/files/Denim-Cover-LK_48962d78-a3d4-439a-863f-d84a791957c8_2048x2048.jpg?v=1721848577',
    },
  ]

  

  // product fetch from db
  // const [clothes, setClothes] = useState([]);

  // useEffect(() => {
  //   fetch('https://api.example.com/clothes') 
  //     .then((response) => response.json())
  //     .then((data) => setClothes(data))
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  
  return (
   
    <div>

{/* slider */}
      <div>
        <Slider/>
      </div>

     

        {/* try */}
        <div>
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Shop Our Latest Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clothesData.map((item) => (
          <HomeClothesCard key={item.id} item={item} />
        ))}
      </div>
    </div>

      <div className='text-1xl  text-center text-gray-800 mb-8'>
      <Link to={'/collection'} className='bg-transparent hover:bg-green-300 text-black font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' >
          View More
        </Link>
      </div>
        </div>


      {/* 2d cart */}

      {/* <div>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Shop Our Latest Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {clothes.map((item) => (
          <ClothesCard key={item.id} item={item} />
        ))}
      </div>
    </div>
      </div> */}

      {/* Banner Image */}
      <div className="my-8 flex justify-center">
        <Link to="#">
          <img
            src="https://nilsonline.lk/image/catalog/nils/product/0823/KOKO_homepage_2308.gif"
            alt="Discount deal"
            className="w-full max-w-screen-lg"
          />
        </Link>
      </div>


      {/* 3d models */}
      <div>
      <h1 className="text-4xl font-bold text-center my-8">Top Customize Clothes</h1>
      </div>

      <div className='flex justify-center items-start flex-wrap gap-6 p-6'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
       {clothes.slice(3,7).map((item) => (
      <ClothesCard key={item.id} item={item} />
       ))}
       </div>
      </div>

      {/* <div className="flex justify-center items-start flex-wrap gap-6 p-6">
      {products_3d.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div> */}

        {/* Top Categories Section */}
        <div className="my-12">
      <h2 className="text-4xl font-semibold text-center mb-8">TOP CATEGORIES:</h2>
      <div className="flex justify-center">
        <table className="w-full max-w-screen-lg text-center">
          <tbody>
            <tr>
              <td className="px-4 py-2">Women`s maxi dresses</td>
              <td className="px-4 py-2">Women`s floral dresses</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Women`s crop tops</td>
              <td className="px-4 py-2">Women`s Sandals</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Women`s bags & Handbags</td>
              <td className="px-4 py-2">Women`s bras</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Women`s dresses</td>
              <td className="px-4 py-2">Kids wear</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Cosmetics</td>
              <td className="px-4 py-2">Sexy lingerie</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    {/* Descriptive Text */}
          <div className="my-12">
          <p className="text-center text-base leading-loose max-w-4xl mx-auto px-5 text-gray-700">
            Hey there, welcome to DreamFit.LK - the ultimate fashion destination for every occasion! Whether you're looking for casual wear, office wear, or party wear, we have a wide range of options to choose from, including maxi dresses, short dresses, crop tops, printed tees, office blouses, and office pants.
            <br/><br/>
            And we don't just stop there! We also offer stylish footwear, accessories, and beauty products to help you complete your look. Plus, we now have a range of quality, modern kids wear that we're sure moms will love!
            <br/><br/>
            But wait, there's more! We have seven branches located islandwide, so you can shop with us in-store or online, no matter where you are. And with our worldwide delivery option, you can shop with us from anywhere in the world and get your items delivered right to your doorstep.
            <br/><br/>
            So why wait? Shop with us today and take your fashion game to the next level.
          </p>
        </div>


    
    </div>
  )
}
