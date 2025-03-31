import React from 'react'
import BeautyProductCard from '../BeautyProductCard'
import Link from 'next/link'
import TechProductCard from '../TechProductCard'
import ProductCard from '../Chocolat/ProductCard'
// import { techProducts } from '@/data/tech'
// import { beautyProducts } from '@/data/beauty'
// import { chocolats } from '@/data/chocolats'

const OffreSection = async () => {
    try {
        const [chocoRes, techRes, modeRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?limit=3&cat=chocolats`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?limit=3&cat=technologie`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?limit=3&cat=mode`)
        ])
        const [dataChoco, dataTech, dataMode] = await Promise.all([
            chocoRes.json(),
            techRes.json(),
            modeRes.json()
        ])

        const chocolats = dataChoco?.offres.map(item => ({
            ...item,
            features: item.features.split(',').map(f => f.trim()),
            image: item.image == "" ? [] : JSON.parse(item.image)
        }))
        const technologie = dataTech?.offres.map(item => ({
            ...item,
            features: item.features.split(',').map(f => f.trim()),
            image: item.image == "" ? [] : JSON.parse(item.image)
        }))
        const mode = dataMode?.offres.map(item => ({
            ...item,
            features: item.features.split(',').map(f => f.trim()),
            image: item.image == "" ? [] : JSON.parse(item.image)
        }))

        // const technologie = techProducts.slice(0, 3);
        // const featuredBeauty = beautyProducts.slice(0, 3);
        return (
            <>
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold dark:text-white">Chocolats d'Exception</h2>
                            <Link href="/chocolats" className="text-purple-600 dark:text-purple-400 hover:underline">
                                Voir tout →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {chocolats.map((product) => (
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
                            {/* <Link href="/tech" className="text-blue-600 dark:text-blue-400 hover:underline">
                                Explorer →
                            </Link> */}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {technologie.map((product) => (
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
                            {/* <Link href="/beaute" className="text-pink-600 dark:text-pink-400 hover:underline">
                                Découvrir →
                            </Link> */}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {mode.map((product) => (
                                <BeautyProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            </>
        )
    } catch (error) {
        console.log(error)
    }
}

export default OffreSection