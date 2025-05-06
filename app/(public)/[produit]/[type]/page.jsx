import { categories } from '@/data/categories';
import Link from 'next/link';
import React from 'react'
import Pagination from '@/components/Pagination';
import { nombrePage } from '@/components/Slug';

export async function generateMetadata({ params, searchParams }) {
    try {
        const searchParam = await searchParams
        const currentPage = parseInt(searchParam.page) || 1
        const { type } = await params
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?meta=sdfs&slug=${type}`)
        const [data] = await response.json()

        return {
            title: data?.meta_title || 'Les 3 Merveilles',
            description: data?.meta_description || 'Découvrez notre sélection exclusive de chocolats, technologie et la mode(vêtements, chaussure, casquete,...) d\'aujourd\'hui d\'affiliation de qualité',
            robots: data?.status == 1 ? currentPage == 1 ? 'index, follow' : 'noindex, follow' : 'noindex, nofollow'
            // openGraph: {
            //     images: ['/og-chocolats.jpg'],
            // },
        };
    } catch (error) {
        console.log(error)
    }
}

const page = async ({ params, searchParams }) => {
    try {
        const searchParam = await searchParams
        const currentPage = parseInt(searchParam.page) || 1

        const { type, produit } = await params
        const [offresRes, categoryRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?page=${currentPage}&limit=${nombrePage}&produit_id=${produit}&category_id=${type}`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?slug=${type}`)
        ])
        const [{ offres, pagination }, [category]] = await Promise.all([
            offresRes.json(),
            categoryRes.json()
        ])

        const chocolats = offres?.map(item => ({
            ...item,
            features: item.features.split(',').map(f => f.trim()),
            image: item.image == "" ? [] : JSON.parse(item.image)
        }))

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <section className={`bg-gradient-to-r ${produit == 'chocolats' ? 'from-amber-700 to-amber-600' : 'from-tech to-tech'} text-white py-16 px-4`}>
                    <div className="max-w-7xl mx-auto">
                        <Link
                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${produit}`}
                            className="inline-block mb-4 text-amber-100 hover:text-white transition-colors"
                        >
                            ← Retour aux {category?.produit.nom}
                        </Link>
                        <h1 className="text-4xl font-bold mb-4">{category?.nom}</h1>
                        <p className="text-lg max-w-2xl">{category?.description}</p>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold dark:text-white">
                                {pagination.total} produits trouvés
                            </h2>
                            {produit == 'chocolats' && <div className="flex gap-2">
                                {categories.chocolats.affiliatePrograms.map((program) => (
                                    <span
                                        key={program}
                                        className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 rounded-full text-sm"
                                    >
                                        {program}
                                    </span>
                                ))}
                            </div>}
                        </div>
                        {/* <SearchProducts chocolats={chocolats} type={type} /> */}
                        <Pagination produit={produit} chocolats={chocolats} currentPage={currentPage} totalPages={pagination.pageCount} />
                    </div>
                </section>

                {/* Affiliate Disclaimer */}
                <section className="bg-amber-50 dark:bg-gray-800 py-12 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                            *Nous percevons une commission sur les achats effectués via ces liens.
                            Les prix indiqués sont TTC et susceptibles de varier.
                        </p>
                    </div>
                </section>
            </div>
        )
    } catch (error) {
        console.log(error)
    }
}

export default page