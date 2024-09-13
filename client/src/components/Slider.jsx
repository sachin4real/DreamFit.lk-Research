import React, { useState, useEffect } from 'react';

export default function Slider() {
    const items = [
        {
            id: 1,
            image: 'https://cms.sriyanidresspoint.lk/storage/home/slider/Frame%201%20(1).png',
            title: 'Stylish T-Shirt',
        },
        {
            id: 2,
            image: 'https://zigzag.lk/cdn/shop/files/FB_Cover_20240802_dresses_3589x.progressive.jpg?v=1722853062',
            title: 'Stylish T-Shirt',
        },
        {
            id: 3,
            image: 'https://cms.sriyanidresspoint.lk/storage/home/slider/Frame-24dgdfg.jpg',
            title: 'Stylish T-Shirt',
        },
        {
            id: 4,
            image: 'https://cms.sriyanidresspoint.lk/storage/home/slider/Sriyani%20dresspoint%20banner%2006%20(1).png',
            title: 'Elegant Dress',
          },
        {
            id: 5,
            image: 'https://cms.sriyanidresspoint.lk/storage/home_banner/ban.jpg',
            title: 'Elegant Dress',
          },
        
          
       
        {
          id: 6,
          image: 'https://lurreli.lk/cdn/shop/files/407628410_853755096758627_114433338369019373_n.jpg?v=1704255729&width=1920',
          title: 'Elegant Dress',
         },
       
       
        
          {
            id: 7,
            image: 'https://cms.sriyanidresspoint.lk/storage/home/slider/Sriyani%20dresspoint%20banner%2006%20(1).png',
            title: 'Elegant Dress',
          },
        // Add more items as needed
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === items.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const autoSlide = setInterval(() => {
            nextSlide();
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(autoSlide); // Cleanup interval on component unmount
    }, [currentIndex]); // Re-run the effect whenever currentIndex changes

    return (
        <div className="w-screen overflow-hidden">
            <div className="relative w-full">
                <img
                    src={items[currentIndex].image}
                    alt={items[currentIndex].title}
                    className="w-full h-[555px] object-cover"
                />
                {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between px-4">
                    <button
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                        onClick={prevSlide}
                    >
                        &#10094;
                    </button>
                    <button
                        className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                        onClick={nextSlide}
                    >
                        &#10095;
                    </button>
                </div> */}
            </div>
            <div className="text-center mt-4">
                {/* <h2 className="text-lg font-bold">{items[currentIndex].title}</h2> */}
            </div>
        </div>
    );
}
