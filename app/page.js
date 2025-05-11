"use client";
import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

const GoogleSignUp = () => {
  const [signup,setSignup] = useState(false);
  const handleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setSignup(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-3xl font-extrabold mb-9'>Sign Up with Google</h1>
      <Button variant="contained" onClick={handleSignUp}>
        Sign Up with Google
      </Button>
      {signup && <p>Sign Up Successful!</p>}
    </div>
  );
};

export default GoogleSignUp;
