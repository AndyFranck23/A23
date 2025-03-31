import Link from 'next/link';
import CategorySection from '@/components/Chocolat/CategorySection';
// import SearchProducts from '@/components/SearchProducts';
import Pagination from '@/components/Pagination';
import { nombrePage } from '@/components/Slug';
import BeautePage from '@/components/Mode/BeautePage';
import TechPage from '@/components/tech/TechPage';

// export const generateMetadata = {
//     title: 'Chocolats Premium - Notre Sélection',
//     description: 'Découvrez notre sélection exclusive de chocolats fins et produits d\'affiliation de qualité',
//     robots: 'index, follow'
//     // openGraph: {
//     //     images: ['/og-chocolats.jpg'],
//     // },
// }

export default async function page({ params, searchParams }) {
    try {
        const { page } = await searchParams
        const { produit } = await params
        const currentPage = page ? parseInt(page) : 1; // Récupérer la page
        if (produit == 'mode') {
            return <BeautePage />
        }
        if (produit == 'tech') {
            return <TechPage />
        }

        // // Normalisation de la requête
        // const normalizeString = (str) => {
        //     return str
        //         .normalize("NFD")
        //         .replace(/[\u0300-\u036f]/g, "")
        //         .toLowerCase();
        // };

        // const searchTerm = normalizeString('Écrin');

        // // Si un terme de recherche est fourni, on construit une chaîne de filtres ($or)
        // let searchQuery = '';
        // if (searchTerm) {
        //     searchQuery =
        //         `&filters[$or][0][nom][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
        //         `&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
        //         `&filters[$or][2][categorie][nom][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
        //         `&filters[$or][3][sous_category][nom][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
        //         `&filters[$or][4][prix][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
        //         `&filters[$or][5][program][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
        //         `&filters[$or][6][features][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}`;
        // }

        const [chocoRes, subCatRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?page=${currentPage}&limit=${nombrePage}&cat=chocolats`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?cat=${produit}`) // récupère les sous-cat qui on le Nom du champs Type == Chocolats
        ])
        const [{ offres, pagination }, subCatData] = await Promise.all([
            chocoRes.json(),
            subCatRes.json(),
        ])

        const chocolats = offres?.map(item => ({
            ...item,
            features: item.features.split(',').map(f => f.trim()),
            image: item.image == "" ? [] : JSON.parse(item.image)
        }))

        const categoryInfo = subCatData;
        // const featuredProducts = chocolats?.filter(p => p.isFeatured);

        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-amber-800 to-amber-600 text-white py-24 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Chocolats d'Exception
                        </h1>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Découvrez notre curation de chocolats premium sélectionnés parmi les meilleurs artisans mondiaux
                        </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-800"></div>
                </section>

                {/* Avantages de Nos Produits */}
                <section className="bg-amber-50 dark:bg-gray-800 py-16 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg">
                            <h2 className="text-3xl font-bold mb-4 dark:text-white">
                                Pourquoi Choisir Nos Produits ?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                                Découvrez les raisons pour lesquelles nos chocolats premium sont le choix idéal pour les amateurs de saveurs authentiques.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mb-6">
                                {[
                                    'Ingrédients 100% naturels',
                                    'Fabriqué par des artisans chocolatiers renommés',
                                    'Emballages écologiques',
                                    'Livraison rapide et soignée',
                                ].map((benefit) => (
                                    <span
                                        key={benefit}
                                        className="px-4 py-2 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-100 rounded-full"
                                    >
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                            <Link href="/nos-avantages">
                                <p className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors">
                                    En savoir plus
                                </p>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Subcategories Navigation */}
                <CategorySection categoryInfo={categoryInfo} />

                {/* All Products Grid */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold dark:text-white">Toute Notre Sélection</h2>
                            <span className="text-amber-600 dark:text-amber-400">
                                {pagination.total} produits
                            </span>
                        </div>
                        <Pagination chocolats={chocolats} currentPage={currentPage} totalPages={pagination.pageCount} />
                        {/* <SearchProducts chocolats={chocolats} /> */}
                    </div>
                </section>

                {/* Section Offres Spéciales */}
                <section className="py-16 px-4 bg-amber-600 text-white">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8">
                            Offres Spéciales
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {chocolats.slice(0, 3).map((offre) => (
                                <div key={offre.id} className="bg-amber-700 p-6 rounded-lg shadow-md">
                                    <h3 className="text-2xl font-semibold mb-2">{offre.name}</h3>
                                    <p className="mb-4">{offre.description}</p>
                                    <span className="block text-2xl font-bold mb-4">{offre.price}</span>
                                    <button className="bg-white text-amber-600 px-6 py-2 rounded-lg">
                                        Profiter de l'offre
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Quality Guarantees */}
                <section className="py-16 px-4 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Sourcing Éthique',
                                content: 'Tous nos producteurs sont certifiés commerce équitable',
                                icon: '🌱'
                            },
                            {
                                title: 'Expertise',
                                content: 'Sélectionnés par nos maîtres chocolatiers',
                                icon: '👨🍳'
                            },
                            {
                                title: 'Livraison Rapide',
                                content: 'Expédition sous 24h en emballage sécurisé',
                                icon: '🚚'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="p-6 border border-amber-100 dark:border-gray-700 rounded-xl text-center"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.log(error)
    }
}
