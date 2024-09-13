import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Button, Label,TextInput,Alert,Spinner} from 'flowbite-react';

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
      {/* left side */}
      <div className='flex-1'>
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
    <p className='text-sm mt-5'>
    Welcome to DreamFit, your ultimate online destination for the latest trends and timeless fashion! 
    </p>
   
      </div>
      {/* right side */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' >
          <div>
            <Label  value='Your username'/>
            <TextInput type = 'text' placeholder='Username'   id= 'username'  />
          </div>
          <div>
            <Label  value='Your email'/>
            <TextInput type = 'email'  placeholder='Email' id= 'email'  />
          </div>
          <div>
            <Label  value='Your password'/>
            <TextInput type = 'password' placeholder='Password'id= 'password'  />
          </div>
          <Button gradientDuoTone='greenToBlue' type='submit' >
            
      Sign Up
            
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account? </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
        </div>
      
      </div>
    </div>
  </div>
  )
}
