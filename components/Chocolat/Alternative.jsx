// app/produit/chocolat-premium/page.js

import ProductCard from "./ProductCard";

export default async function Alternative({ type }) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?type=${type}&limit=6`)
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
                        {chocolats.map((product, index) => (
                            // <div key={index} className="group relative border rounded-xl p-4 hover:shadow-lg transition-shadow">
                            //     <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                            //         <img
                            //             src={product.image}
                            //             alt={product.title}
                            //             className="w-full h-full object-cover"
                            //         />
                            //     </div>

                            //     <div className="flex justify-between items-start mb-2">
                            //         <h3 className="font-medium text-gray-900">{product.title}</h3>
                            //         <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">Alternative</span>
                            //     </div>

                            //     <p className="text-sm text-gray-600 mb-2">{product.desc}</p>

                            //     <div className="flex justify-between items-center">
                            //         <span className="text-lg font-bold text-amber-600">{product.price}</span>
                            //         <a
                            //             href={product.link}
                            //             className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                            //             target="_blank"
                            //             rel="noopener noreferrer"
                            //         >
                            //             Voir l'offre →
                            //         </a>
                            //     </div>
                            // </div>
                            <ProductCard
                                key={index}
                                product={product}
                            />
                        ))}
                    </div>

                    {/* <p className="mt-6 text-center text-sm text-gray-500">
                    Ces suggestions sont basées sur les préférences de nos clients
                </p> */}
                </section>

                {/* Disclosure */}
                <p className="mt-12 text-center text-sm text-gray-500">
                    *En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.
                </p>
            </main>
        );
    } catch (error) {
        console.log(error)
    }
}