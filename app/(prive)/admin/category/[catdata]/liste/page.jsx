'use client'; // Nécessaire car nous utilisons des hooks et des événements

import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListeOffres() {
    const params = useParams()
    const category = params.catdata

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fonction pour récupérer les categories depuis l'API
        const fetchOffres = async () => {
            try {
                // Remplacez cette URL par votre endpoint API réel
                const response = await fetch(`/api/category?cat=${category}`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOffres();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erreur ! </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        );
    }

    return (
        <div className="px-4 py-8 dark:text-gray-200 dark:bg-gray-700 w-full h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Gestion des catégories</h1>
                <Link
                    href={`/admin/category/${category}/add`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                    Ajouter une catégorie
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 dark:divide-gray-600 dark:bg-transparent">
                    <thead className="bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Titre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Catégorie
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-500 dark:bg-transparent">
                        {categories.length > 0 ? (
                            categories.map((elt, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{elt.nom}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{elt.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${elt.status === 1
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {elt.status == 1 ? 'Publier' : 'Broullion'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(elt.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={`/admin/category/${elt.category}/update/${elt.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            Éditer
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(elt.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                    Aucune donnée disponible
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    async function handleDelete(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette élément ?')) {
            try {
                const response = await axios.delete(`/api/category?id=${id}`);

                if (!response.statusText) {
                    throw new Error('Échec de la suppression');
                }

                // Mettre à jour la liste des categories après suppression
                setCategories(categories.filter(elt => elt.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    }
}