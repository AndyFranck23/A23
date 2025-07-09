// app/produit/chocolat-premium/page.js

import { safeFetch } from "../composants";
import TechProductCard from "../tech/TechProductCard";
import ProductCard from "./ProductCard";

export const dynamic = 'force-dynamic';

export default async function Alternative({ type, produit }) {
    const { offres } = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?category_id=${type}&limit=6`)
    const chocolats = offres?.map(item => ({
        ...item,
        features: item.features.split(',').map(f => f.trim()),
        image: item.image == "" ? [] : JSON.parse(item.image)
    }))
    // Données des alternatives
    const alternatives = [
        {
            title: "Chocolat Lait Noisettes",
            price: "€8,90",
            image: "/images/alt1.jpg",
            link: "[LIEN_AFFILIATION_1]",
            desc: "Aux noisettes torréfiées de Piémont"
        },
        {
            title: "Chocolat Blanc Vanille",
            price: "€7,50",
            image: "/images/alt2.jpg",
            link: "[LIEN_AFFILIATION_2]",
            desc: "Vanille Bourbon naturelle"
        },
        {
            title: "Tablette Mix 3 Saveurs",
            price: "€12,90",
            image: "/images/alt3.jpg",
            link: "[LIEN_AFFILIATION_3]",
            desc: "Pack découverte noir/lait/blanc"
        }
    ];

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 mx-auto mb-10">
            {/* ... (le reste du code précédent reste identique jusqu'à la section FAQ) */}

            {/* Section Alternatives */}
            <section className="mt-10 py-5">
                <h2 className="md:text-4xl text-3xl font-bold text-indigo-600 pb-10 text-center">
                    Alternatives populaires
                </h2>
                <div className=" flex justify-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {chocolats?.map((product, index) =>
                            produit == 'chocolats' ?
                                <ProductCard
                                    key={index}
                                    product={product}
                                /> : <TechProductCard key={index} product={product} />
                        )}
                    </div>
                </div>
                {/* <ProductCard2 {...product} /> */}

                {/* <p className="mt-6 text-center text-sm text-gray-500">
                    Ces suggestions sont basées sur les préférences de nos clients
                </p> */}
            </section>

        </main >
    );
}


