'use client'

import { useState, useEffect } from 'react'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editingUser, setEditingUser] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    async function fetchUsers() {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data)
    }

    async function handleCreateOrUpdateUser(e) {
        e.preventDefault()

        if (editingUser) {
            // Update
            await fetch('/api/users', {
                method: 'PUT',
                body: JSON.stringify({
                    id: editingUser.id,
                    name,
                    email,
                }),
            })
            setEditingUser(null)
        } else {
            // Create
            await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ name, email }),
            })
        }

        setName('')
        setEmail('')
        fetchUsers()
    }

    function startEditing(user) {
        setEditingUser(user)
        setName(user.name)
        setEmail(user.email)
    }

    async function handleDeleteUser(id) {
        await fetch(`/api/users?id=${id}`, {
            method: 'DELETE',
        })
        fetchUsers()
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>

            <form onSubmit={handleCreateOrUpdateUser} className="mb-8 space-y-4">
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
                    {editingUser ? 'Modifier' : 'Ajouter'}
                </button>
                {editingUser && (
                    <button
                        type="button"
                        className="ml-4 text-gray-500 underline"
                        onClick={() => {
                            setEditingUser(null)
                            setName('')
                            setEmail('')
                        }}
                    >
                        Annuler
                    </button>
                )}
            </form>

            <ul className="space-y-2">
                {users.map((user) => (
                    <li key={user.id} className="flex justify-between items-center border-b py-2">
                        <div>
                            {user.name} ({user.email})
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => startEditing(user)}
                                className="text-green-500 hover:underline"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-500 hover:underline"
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
