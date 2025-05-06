// app/produit/chocolat-premium/page.js

import { slugify } from "../Slug";
import TechProductCard from "../tech/TechProductCard";
import ProductCard from "./ProductCard";

export default async function Alternative({ type, produit }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?category_id=${type}&limit=6`)
        const { offres } = await response.json()
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
            <main className="min-h-screen bg-white dark:bg-transparent">
                {/* ... (le reste du code précédent reste identique jusqu'à la section FAQ) */}

                {/* Section Alternatives */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-8 text-center">
                        Alternatives populaires
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {chocolats.map((product, index) =>
                            produit == 'chocolats' ?
                                <ProductCard
                                    key={index}
                                    product={product}
                                /> : <TechProductCard key={index} product={product} />
                        )}
                    </div>

                    {/* <p className="mt-6 text-center text-sm text-gray-500">
                    Ces suggestions sont basées sur les préférences de nos clients
                </p> */}
                </section>

            </main >
        );
    } catch (error) {
        console.log(error)
    }
}