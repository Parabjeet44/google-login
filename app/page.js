"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { auth, handleRedirectResult } from '../firebase'; 
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

const GoogleSignUp = () => {
  const [signup, setSignup] = useState(false);

  const handleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle the redirect result on component load
  useEffect(() => {
    handleRedirectResult();
  }, []);

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
