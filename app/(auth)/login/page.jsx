"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyInput from '@/components/Admin/MyInput';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [load, setLoad] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                setError((await res.json()).error);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoad(false)
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96">
                    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
                    <button disabled={load}
                        type="submit"
                        className="mt-5 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-2"
                    >
                        {
                            load ? "Connection en cours ..." : "Connecter"
                        }
                    </button>
                </form>
            </div>
            {/* {
                load && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
                            <div className="mb-5 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                            <h2 className="text-2xl font-bold dark:text-white">Ajout en cours ...</h2>
                        </div>
                    </div>
                )
            } */}
        </>
    );
}
