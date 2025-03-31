'use client'
// components/SearchProducts.jsx
import React, { useState } from 'react';
import Pagination from './Pagination';
import { slugify } from './Slug';

const SearchProducts = ({ chocolats, type }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrer les produits selon le terme de recherche (en minuscule pour une comparaison insensible à la casse)
    const filteredProducts = chocolats.filter((product) => {
        const lowerTerm = searchTerm.toLowerCase();
        return (
            type ?
                product.nom.toLowerCase().includes(lowerTerm) && type == slugify(product.sous_category.nom) ||
                product.description.toLowerCase().includes(lowerTerm) && type == slugify(product.sous_category.nom) ||
                product.features.some((feature) => feature.toLowerCase().includes(lowerTerm) && type == slugify(product.sous_category.nom))
                : product.nom.toLowerCase().includes(lowerTerm) ||
                product.description.toLowerCase().includes(lowerTerm) ||
                product.Features.some((feature) => feature.toLowerCase().includes(lowerTerm))
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Barre de recherche */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher un produit..."
                        className="w-full p-3 border rounded dark:bg-gray-800 dark:text-white"
                    />
                </div>
                {/* Affichage des produits filtrés */}
                {filteredProducts.length > 0 ? (
                    <Pagination chocolats={filteredProducts} />
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-300">
                        Aucun produit ne correspond à votre recherche.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchProducts;