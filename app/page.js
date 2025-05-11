"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export default function LoginPage() {
  const [success, setSuccess] = useState(false);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-3xl">Login</h1>
      <div className="mt-7 ">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            setSuccess(true);
          }}
          onError={() => {
            console.log("Login Failed");
            setSuccess(false);
          }}
        />
      </div>
      {success && (
        <p className="mt-4 text-green-600 font-semibold">Login Successful!</p>
      )}
    </div>
  );
}
