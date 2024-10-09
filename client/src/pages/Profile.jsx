import { Button , Avatar, TextInput,Label } from 'flowbite-react';
import { px } from 'framer-motion';
import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';


export default function Profile() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const { currentUser } = useSelector((state) => state.user);

    const handleUpdate = () => {
      // Add logic to update user details
      alert("Profile updated successfully!");
    };
  
    const handleDeleteAccount = () => {
      // Add logic for deleting the user account
      if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        alert("Account deleted.");
        // Redirect to login or home page after deletion
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
          <Avatar alt='user' size={"80px"} img={currentUser.profilePicture} rounded />
          <span className='block text-sm text-center'>{currentUser.username}</span>
       

          <div>
            <Label  value='Your username'/>
            <TextInput type = 'text' placeholder={currentUser.username}   id= 'username'  />
          </div>
          <div>
            <Label  value='Your email'/>
            <TextInput type = 'email'  placeholder={currentUser.email} id= 'email'  />
          </div>
  
        
  
          {/* Update Button */}
          <div className="flex justify-between items-center mt-6">
            <Button
             gradientDuoTone="greenToBlue"
              onClick={handleUpdate}
             
            >
              Update Profile
            </Button>
  
            {/* Delete Account Button */}
            <Button
              onClick={handleDeleteAccount}
            gradientDuoTone="pinkToOrange"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    );
}
