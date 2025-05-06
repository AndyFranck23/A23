'use client'
import React from 'react'
import ProductCard from './Chocolat/ProductCard';
import Link from 'next/link';
import TechProductCard from './tech/TechProductCard';

const Pagination = ({ chocolats, currentPage, totalPages, produit }) => {
    const generatePageNumbers = () => {
        const pages = new Set();

        // Ajoute toujours la première page
        pages.add(1);

        // Ajoute les pages autour de la page actuelle
        for (let i = Math.max(1, currentPage); i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.add(i);
        }

        // Ajoute la dernière page
        // pages.add(totalPages);

        // Trie les pages et ajoute les ellipses
        const sortedPages = Array.from(pages).sort((a, b) => a - b);
        const result = [];

        for (let i = 0; i < sortedPages.length; i++) {
            const page = sortedPages[i];
            if (i > 0 && page - sortedPages[i - 1] > 1) {
                result.push('...');
            }
            result.push(page);
        }

        return result;
    };

    const stylePagination = produit == "chocolats" ? "bg-amber-600 hover:bg-amber-700" : "bg-tech hover:bg-blue-700"

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {chocolats.map((product) =>
                    produit == "chocolats" ?
                        <ProductCard
                            key={product.id}
                            product={product}
                        /> : <TechProductCard key={product.id} product={product} />
                )}
            </div>

            <div className="flex flex-wrap justify-center items-center mt-20 gap-2">
                {currentPage > 1 && (
                    <Link
                        href={`?page=${currentPage - 1}`}
                        className={`px-4 py-2 ${stylePagination} text-white rounded-lg transition-colors`}
                    >
                        Page Précédente
                    </Link>
                )}

                <div className="flex flex-wrap items-center gap-2">
                    {generatePageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="py-2 text-gray-500 dark:text-gray-400"
                                >
                                    . . .
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={page}
                                href={`?page=${page}`}
                                className={`px-4 py-2 rounded-lg transition-colors ${currentPage === page
                                    ? ' text-white ' + stylePagination
                                    : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                                    }`}
                            >
                                {page}
                            </Link>
                        );
                    })}
                </div>

                {currentPage < totalPages && (
                    <Link
                        href={`?page=${currentPage + 1}`}
                        className={`px-4 py-2 ${stylePagination} text-white rounded-lg transition-colors`}
                    >
                        Page Suivante
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Pagination;