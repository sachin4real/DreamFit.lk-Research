import React from 'react'
import { useEffect, useState } from 'react';
import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'


export default function Header() {

  const [searchTerm, setSearchTerm] = useState('');
  const path = useLocation().pathname;
  const navigate = useNavigate();

  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };


    // const path = useLocation().pathname;
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
      {/* spm */}
    </Link>
    <form onSubmit={handleSearchSubmit} >
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
      <AiOutlineSearch/>
    </Button>
    <div className="flex gap-2 md:order-2">
     
      <Link to='/sign-in'>
        <Button gradientDuoTone='greenToBlue' outline >
          Sign In
       </Button>
      </Link>
      <Navbar.Toggle/>
    </div>
    <Navbar.Collapse>
        <Navbar.Link active = {path === "/"} as={'div'}>
          <Link to='/'>
            Home
          </Link>
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
