import React from 'react'
import Link from 'next/link'
import TechProductCard from '../tech/TechProductCard'
import ProductCard from '../Chocolat/ProductCard'

const OffreSection = ({ chocolats, technologie, mode }) => {
    return (
        <>
            <section id='offreSection' className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold dark:text-white">Chocolats d'Exception</h2>
                        <Link href="/chocolats" className="text-purple-600 dark:text-purple-400 hover:underline">
                            Voir tout →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {chocolats?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Products */}
            <section className="bg-gray-100 dark:bg-gray-800 py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold dark:text-white">Nouveautés Tech</h2>
                        <Link href="/technologie" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Explorer →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {technologie?.map((product) => (
                            <TechProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Beauty Products */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold dark:text-white">La Mode d'Aujourd'hui</h2>
                        <Link href="/la-mode" className="text-pink-700 dark:text-pink-300 hover:underline">
                            Découvrir →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {mode?.map((product) => (
                            <TechProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default OffreSection