'use client'
import { MyContext } from '@/context/MyContextUser';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const page = () => {
    const router = useRouter();
    const { userData } = useContext(MyContext);
    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/logout`)
            router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            dashboard {userData.nom}
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 bg-white rounded-lg shadow-md w-96 text-center">
                    {/* <h1 className="text-2xl font-bold mb-4">Welcome {user[0].email}</h1> */}
                    {/* <form action="/api/auth/logout" method="POST"> */}
                    <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Logout
                    </button>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default page