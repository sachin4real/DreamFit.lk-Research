import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Button, Label,TextInput,Alert,Spinner} from 'flowbite-react';
import { useState } from "react";
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData,[e.target.id]: e.target.value.trim()});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill all the fields');
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };


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
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label  value='Your username'/>
            <TextInput type = 'text' placeholder='Username'   id= 'username'  onChange={handleChange } />
          </div>
          <div>
            <Label  value='Your email'/>
            <TextInput type = 'email'  placeholder='Email' id= 'email'  onChange={handleChange } />
          </div>
          <div>
            <Label  value='Your password'/>
            <TextInput type = 'password' placeholder='Password'id= 'password'  onChange={handleChange } />
          </div>
          <Button gradientDuoTone='greenToBlue' type='submit' disabled={loading} > 
          {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                  </>

                ): ('Sign Up')
              }
            
          </Button>
          <OAuth />
        </form>
        <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account? </span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
        </div>
        {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
      </div>
    </div>
  </div>
  )
}
