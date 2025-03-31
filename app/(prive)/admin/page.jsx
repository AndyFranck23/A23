'use client'
import { MyContext } from '@/context/MyContextUser';
import React, { useContext } from 'react'

const page = () => {
    const { userData } = useContext(MyContext);
    return (
        <div>
            dashboard {userData.nom}
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 bg-white rounded-lg shadow-md w-96 text-center">
                    {/* <h1 className="text-2xl font-bold mb-4">Welcome {user[0].email}</h1> */}
                    <form action="/api/auth/logout" method="POST">
                        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page