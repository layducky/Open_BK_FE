"use client";
import google from '/public/images/google.png';
import { signIn } from 'next-auth/react';


export default function GoogleLoginButton() {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const handleGoogleLogin = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full border border-stone-400 rounded-lg py-2 flex items-center justify-center gap-3 hover:bg-gray-100"
    >
      <img
        src={google.src}
        alt="Google Logo"
        className="w-6 h-6"
      />
      <span className="text-sm font-medium text-gray-700">
        Continue with Google
      </span>
    </button>
  );
}
