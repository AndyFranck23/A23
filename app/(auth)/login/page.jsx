"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyInput from '@/components/Admin/MyInput';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            setError((await res.json()).error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <MyInput
                    label={"Email"}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <MyInput
                    label={"Mot de passe"}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="mt-5 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Connect
                </button>
            </form>
        </div>
    );
}