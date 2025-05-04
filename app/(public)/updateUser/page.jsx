'use client'
import React, { useState } from 'react'

const page = () => {
    const [users, setUsers] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>

            <form onSubmit={handleCreateUser} className="mb-8 space-y-4">
                <input
                    className="border p-2 w-full"
                    type="text"
                    placeholder="Nom"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="border p-2 w-full"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Ajouter
                </button>
            </form>
        </div>
    )
}

export default page