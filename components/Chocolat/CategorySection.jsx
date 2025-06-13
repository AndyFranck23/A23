"use client";
import { useState } from 'react';
import Link from 'next/link';
import { slugify } from '../Slug';

export default function CategorySection({ categoryInfo }) {
    const [openIndex, setOpenIndex] = useState(null);

    // Données exemple pour les sous-menus
    const dropdownItems = [
        [
            { name: 'Sous-option 1', slug: 'sous-option-1' },
            { name: 'Sous-option 2', slug: 'sous-option-2' }
        ],
        [
            { name: 'Variante A', slug: 'variante-a' },
            { name: 'Variante B', slug: 'variante-b' }
        ]
    ];

    return (
        <section className="py-12 px-4 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
                    Explorez par Catégorie
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {categoryInfo?.map((subcat, index) => (
                        <Link
                            key={index}
                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/categorie/${slugify(subcat.nom)}`}
                            className="px-6 py-3 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors"
                        >
                            {subcat.nom}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}