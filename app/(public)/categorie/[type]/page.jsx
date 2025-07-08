import { categories } from '@/data/categories';
import Link from 'next/link';
import React from 'react'
import Pagination from '@/components/Pagination';
import { nombrePage } from '@/components/Slug';
import { safeFetch } from '@/components/composants';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params, searchParams }) {
    const searchParam = await searchParams
    const currentPage = parseInt(searchParam.page) || 1
    const { type } = await params
    const [data] = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?meta=sdfs&slug=${type}`)
    const image = data ? JSON.parse(data?.offres[0].image) : ''

    return {
        title: data?.meta_title || 'Les 3 Merveilles',
        description: data?.meta_description || 'Découvrez notre sélection exclusive de chocolats, technologie et la mode(vêtements, chaussure, casquete,...) d\'aujourd\'hui d\'affiliation de qualité',
        robots: currentPage == 1 ? 'index, follow' : 'noindex, follow',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/categorie/${type}`,
        },
        openGraph: {
            title: data?.meta_title || 'Les 3 Merveilles',
            description: data?.meta_description || 'Découvrez notre sélection exclusive de chocolats, technologie et la mode d\'aujourd\'hui d\'affiliation de qualité',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/categorie/${type}`,
            // Fiche produit:	product
            // Page catégorie:	website
            // Page article (blog):	article
            // Page d’accueil:	website
            type: 'website',
            siteName: 'Les 3 Merveilles',
            images: [{
                url: image[0] == undefined ? undefined : image[0],
                width: 1200,
                height: 630,
                alt: data?.meta_title || 'les 3 merveilles'
            }],
            other: {
                'fb:app_id': '978066750965088',
            },
        },
    };
}

const page = async ({ params, searchParams }) => {
    const searchParam = await searchParams
    const currentPage = parseInt(searchParam.page) || 1

    const { type } = await params
    const [{ offres, pagination }, [category]] = await Promise.all([
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?page=${currentPage}&limit=${nombrePage}&category_id=${type}`),
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?slug=${type}`)
    ])

    const chocolats = offres?.map(item => ({
        ...item,
        features: item.features.split(',').map(f => f.trim()),
        image: item.image == "" ? [] : JSON.parse(item.image)
    }))

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className={`bg-gradient-to-r ${category?.produit.slug == 'chocolats' ? 'from-amber-700 to-amber-600' : 'from-tech to-tech'} text-white py-16 px-4`}>
                <div className="max-w-7xl mx-auto">
                    <Link
                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/${category?.produit.slug}`}
                        className="inline-block mb-4 text-amber-100 hover:text-white transition-colors"
                    >
                        ← Retour aux {category?.produit.nom}
                    </Link>
                    <p className="text-4xl font-bold mb-4">{category?.nom}</p>
                    <h1 className="text-lg max-w-2xl">{category?.description}</h1>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-2xl font-bold dark:text-white">
                            {pagination.total} produits trouvés
                        </p>
                        {category?.produit.slug == 'chocolats' && <div className="flex gap-2">
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
                    <Pagination produit={category?.produit.slug} chocolats={chocolats} currentPage={currentPage} totalPages={pagination.pageCount} />
                </div>
            </section>

            {/* Affiliate Disclaimer
            <section className="bg-amber-50 dark:bg-gray-800 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                        *Nous percevons une commission sur les achats effectués via ces liens.
                        Les prix indiqués sont TTC et susceptibles de varier.
                    </p>
                </div>
            </section> */}
        </div>
    )
}

export default page