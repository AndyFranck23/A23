// app/beaute/page.js
import { categories } from '@/data/categories';
import BeautyProductCard from '@/components/BeautyProductCard';
import { beautyProducts } from '@/data/beauty';

export default function BeautePage() {
    const categoryInfo = categories.beauty;

    // Offres spéciales avec réduction
    const featuredProducts = beautyProducts.filter(p => p.discount);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-pink-600 dark:text-pink-400 mb-4">
                        Beauté Naturelle & Soins
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Découvrez des produits de beauté éthiques et naturels sélectionnés avec soin
                    </p>
                </div>

                {/* Navigation sous-catégories */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {categoryInfo.subcategories.map((subcat) => (
                        <a
                            key={subcat.slug}
                            href={`/mode/${subcat.slug}`}
                            className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center group"
                        >
                            <span className="mr-2 text-gray-700 dark:text-gray-200 group-hover:text-pink-600">
                                {subcat.name}
                            </span>
                            <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full dark:bg-pink-900 dark:text-pink-200">
                                {subcat.affiliatePrograms.length} marques
                            </span>
                        </a>
                    ))}
                </div>

                {/* Offres avec réduction */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        💎 Offres Exclusives
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="relative">
                                <BeautyProductCard product={product} />
                                <div className="absolute top-4 right-4 bg-white dark:bg-pink-600 text-pink-600 dark:text-white px-3 py-1 rounded-full text-sm shadow-lg">
                                    Économisez {product.discount}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tous les produits */}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Notre sélection complète
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beautyProducts.map((product) => (
                        <BeautyProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Bannière affiliation */}
                <div className="mt-16 p-8 bg-gradient-to-r from-pink-500 to-pink-400 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Jusqu'à 20% de commission
                    </h2>
                    <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
                        Rejoignez notre programme beauté et bénéficiez des commissions les plus élevées du marché
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition">
                            Devenir affilié
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-pink-600 transition">
                            Voir les marques
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}