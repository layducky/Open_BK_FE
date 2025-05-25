"use client";
import React from "react";
import { useRouter } from "next/navigation";

const signupButton = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/register");
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
    >
      Sign Up
    </button>
  );
};

export default signupButton;
