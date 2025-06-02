import Link from 'next/link';
import Pagination from '../Pagination';

export default function TechPage({ categoryInfo, technologie, pagination, currentPage, produit }) {
    // const categoryInfo = categories.tech;

    // Offres spéciales en vedette
    // const featuredProducts = techProducts.filter(p => p.isFeatured);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-tech to-tech text-white py-24 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        {categoryInfo[0].produit.nom}
                    </h1>
                    <h2 className="text-xl mb-8 max-w-2xl mx-auto">
                        {categoryInfo[0].produit.description}
                        {/* Découvrez les dernières innovations tech sélectionnées par nos experts */}
                    </h2>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-tech"></div>
            </section>

            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className="text-center mb-8">
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Explorer nos offres par catégorie
                    </p>
                </div>

                {/* Navigation sous-catégories */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {categoryInfo.map((subcat) => (
                        <Link
                            key={subcat.slug}
                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${subcat.produit.slug}/${subcat.slug}`}
                            className="px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center"
                        >
                            <span className="mr-2 dark:text-white">{subcat.nom}</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                {pagination.total} programmes
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Offres en vedette */}
                <div className="mb-16">
                    <Pagination produit={produit} chocolats={technologie} currentPage={currentPage} totalPages={pagination.pageCount} />
                </div>
            </div>
        </div>
    );
}