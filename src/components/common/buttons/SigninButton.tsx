'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const SigninButton = () => {
    const router = useRouter();
    const handleLogin = () => {
        router.push('/auth/login');
    };

    return (
        <button onClick={handleLogin} className="py-2 px-4 rounded hover:bg-gray-200 focus:outline-none">
            Sign In
        </button>
    );
};

export default SigninButton;