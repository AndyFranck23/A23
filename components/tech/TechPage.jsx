// app/tech/page.js
import { categories } from '@/data/categories';
import { techProducts } from '@/data/tech';
import TechProductCard from '@/components/TechProductCard';

export default function TechPage() {
    const categoryInfo = categories.tech;

    // Offres spéciales en vedette
    const featuredProducts = techProducts.filter(p => p.isFeatured);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                        Tech & Gadgets Connectés
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Découvrez les dernières innovations tech sélectionnées par nos experts
                    </p>
                </div>

                {/* Navigation sous-catégories */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {categoryInfo.subcategories.map((subcat) => (
                        <a
                            key={subcat.slug}
                            href={`/tech/${subcat.slug}`}
                            className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center"
                        >
                            <span className="mr-2">{subcat.name}</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                {subcat.affiliatePrograms.length} programmes
                            </span>
                        </a>
                    ))}
                </div>

                {/* Offres en vedette */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        🔥 Offres Spéciales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="relative group">
                                <TechProductCard product={product} />
                                <div className="absolute -top-3 -right-3 bg-red-500 text-white px-4 py-1 rounded-full rotate-12 shadow-lg">
                                    Offre limitée !
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tous les produits */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Toute notre sélection tech
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {techProducts.map((product) => (
                        <TechProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bannière affiliation */}
                <div className="mt-16 p-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Gagnez jusqu'à 12% de commission
                    </h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Rejoignez notre programme d'affiliation tech et bénéficiez de commissions élevées sur les meilleures marques.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition">
                        Devenir partenaire
                    </button>
                </div>
            </div>
        </div>
    );
}