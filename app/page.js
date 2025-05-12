"use client"
import React, { useEffect } from 'react';
import { googleSignUp, handleRedirectResult } from '../firebase';
import { Button } from '@mui/material';

const GoogleSignUp = () => {
  useEffect(() => {
    handleRedirectResult();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-3xl font-extrabold mb-9'>Sign Up with Google</h1>
      <Button variant="contained" onClick={googleSignUp}>
        Sign Up with Google
      </Button>
    </div>
  );
};

export default GoogleSignUp;
