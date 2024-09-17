import React, { useState, useEffect } from 'react';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0); // To store cart item count
  const path = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the cart items to get the count
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/cart'); // Assuming this endpoint returns cart items
        if (response.ok) {
          const cartItems = await response.json();
          setCartCount(cartItems.length); // Update the cart item count
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []); // Run only once when the component mounts

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-lg text-white">
          DreamFit
        </span>
        .LK
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      
      {/* Cart Icon with Badge */}
      <div className="flex gap-2 md:order-2 items-center">
      <Link to="/cart">
          <Button className="relative" color="gray" pill>
            <AiOutlineShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>
      </div>

      <div className="flex gap-2 md:order-2">
        <Link to='/sign-in'>
          <Button gradientDuoTone='greenToBlue' outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/collection'} as={'div'}>
          <Link to="/collection">Collection</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
