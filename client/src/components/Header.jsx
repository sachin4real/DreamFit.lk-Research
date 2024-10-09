import React, { useState, useEffect } from 'react';
import {  Avatar, Button, Dropdown, Navbar, TextInput  } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector,useDispatch } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSlice"

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0); // To store cart item count
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

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

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
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
      
    

      <div className="flex gap-2 md:order-2">

        {currentUser && (
          <div className="flex items-center">
            {/* Cart Icon with Badge */}
            <Link to="/cart">
              <Button className="relative" color="gray" pill>
                <AiOutlineShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        )}
      
      {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
    
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='greenToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
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
