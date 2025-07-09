import Carousel from "@/components/Accueil/Carousel";
import Alternative from "@/components/Chocolat/Alternative";
import { safeFetch } from "@/components/composants";
import Features from "@/components/Features";
import Prices from "@/components/Prices";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { offre, produit } = await params
    const { offres } = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?meta=df&slug=${offre}`)
    const image = offres[0] ? JSON.parse(offres[0]?.image) : ''

    return {
        title: offres[0]?.meta_title || 'Chocolats Premium - Notre Sélection',
        description: offres[0]?.meta_description || 'Découvrez notre sélection exclusive de chocolats fins et produits d\'affiliation de qualité',
        robots: 'index, follow',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${produit}/${offre}`,
        },
        openGraph: {
            title: offres[0]?.meta_title || 'Les 3 Merveilles',
            description: offres[0]?.meta_description || 'Découvrez notre sélection exclusive de chocolats, technologie et la mode d\'aujourd\'hui d\'affiliation de qualité',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${produit}/${offre}`,
            // Fiche produit:	product (non supporter avec l'App router)
            // Page catégorie:	website
            // Page article (blog):	article
            // Page d’accueil:	website
            type: 'article',
            siteName: 'Les 3 Merveilles',
            images: [{
                url: image[0] == undefined ? undefined : image[0],
                width: 1200,
                height: 630,
                alt: offres[0]?.meta_title || 'les 3 merveilles'
            }],
            other: {
                'fb:app_id': '978066750965088',
            },
        },
    };
}

export default async function page({ params }) {
    const { offre, produit } = await params
    const { offres } = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?slug=${offre}`)
    const chocolats = offres?.map(item => ({
        ...item,
        features: item.features.split('|').map(f => f.trim()),
        image: item.image == "" ? [] : JSON.parse(item.image)
    }))
    let price = [];
    try {
        const raw = chocolats[0]?.price;

        if (typeof raw === "string") {
            const parsed = JSON.parse(raw);

            if (Array.isArray(parsed)) {
                price = parsed;
            }
        }
    } catch (error) {
        // Ignorer toute erreur de parsing
        price = [];
    }

    const prixArray = Array.isArray(price) ? price.map(item => item.prix) : []

    // Trouver le minimum et le maximum
    const prixMin = Math.min(...prixArray);
    const prixMax = Math.max(...prixArray);

    // const aggregateRating = {
    //     "@type": "AggregateRating",
    //     "ratingValue": "4.5", // nombre d'étoiles
    //     "reviewCount": "10" // nombre d'avis
    // };

    // const review = [
    //     {
    //         "@type": "Review",
    //         "author": {
    //             "@type": "Person",
    //             "name": "Alice"
    //         },
    //         "datePublished": "2024-06-01",
    //         "reviewBody": "Très bon produit.",
    //         "reviewRating": {
    //             "@type": "Rating",
    //             "ratingValue": "5", // nombre d'étoiles
    //             "bestRating": "5"  // meilleur avis
    //         }
    //     }
    // ];

    const offers =
        price.length === 1
            ? {
                "@type": "Offer",
                "price": price[0].prix,
                "priceCurrency": chocolats[0]?.devise,
                "availability": "https://schema.org/InStock",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${chocolats[0]?.produit.slug}/${chocolats[0]?.slug}`
            }
            : {
                "@type": "AggregateOffer",
                "lowPrice": prixMin,
                "highPrice": prixMax,
                "priceCurrency": chocolats[0]?.devise,
                "availability": "https://schema.org/InStock",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${chocolats[0]?.produit.slug}/${chocolats[0]?.slug}`
            };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": chocolats[0]?.name || '',
        "image": chocolats[0]?.image || [],
        "description": chocolats[0]?.meta_description || '',
        "brand": {
            "@type": "Brand",
            "name": "Les 3 Merveilles"
        },
        "offers": offers
    };



    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-12">
                    {/* Header avec image et prix */}
                    <div className="md:grid md:grid-cols-2 md:gap-16">
                        {/* Galerie images */}
                        <div className="mb-8 md:mb-0">
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                                <Carousel slides={chocolats[0]?.image} />
                            </div>
                        </div>

                        {/* Détails produit */}
                        <div className="md:py-8">
                            <h1 className="text-4xl text-center font-bold text-indigo-600 mb-5">
                                {chocolats[0]?.name || ''}
                            </h1>
                            <div className="w-full flex justify-center mb-4">
                                <div className="w-[50px] h-2 bg-gradient-to-r from-indigo-600 to-[#2E6B5E] rounded-4xl"></div>
                            </div>

                            {/* <div className="flex items-center gap-2 mb-6">
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Produit Bio
                                </span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Équitable
                                </span>
                            </div> */}
                            {produit == "chocolats" &&
                                <h2 className="text-xl text-amber-600 font-bold mb-5">
                                    {chocolats[0]?.poids} g
                                </h2>
                            }
                            <Prices price={price} chocolats={chocolats[0]} produit={produit} />
                        </div>
                    </div>

                </div>

                <div className="w-full flex justify-center">
                    <div className="max-w-3xl px-4 sm:px-6 md:px-8">
                        {/* Description détaillée */}
                        <section className="my-5 mx-auto">
                            <h2 className="md:text-4xl text-3xl text-center font-bold text-indigo-600 mb-6">Description</h2>
                            <div className="prose text-gray-600 dark:text-gray-400">
                                <p>
                                    {/* Découvrez notre chocolat noir d'exception élaboré par des maîtres chocolatiers.
                                Avec ses 90% de cacao pur origine Pérou, cette tablette offre une expérience
                                sensorielle unique caractérisée par : */}
                                    {chocolats[0]?.description || ''}
                                </p>
                                {/* <ul>
                                <li>Une amertume équilibrée et des notes fruitées</li>
                                <li>Une texture onctueuse et cassante à la fois</li>
                                <li>Un processus de fermentation naturel de 7 jours</li>
                                <li>Un emballage 100% recyclable</li>
                            </ul> */}
                            </div>
                        </section>
                        {chocolats[0]?.content ?
                            <section className=' dark:text-gray-200 p-5 flex justify-center'>
                                <div className="overflow-x-auto">
                                    <div className="no-tailwind" dangerouslySetInnerHTML={{ __html: JSON.parse(chocolats[0].content) }} />
                                </div>
                            </section>
                            : ''}

                        <Features chocolats={chocolats[0]} />
                        <div className="font-bold text-md md:text-lg text-center mb-5">
                            <h3 className="text-indigo-600">
                                {chocolats[0]?.name || ''} <span className="text-gray-700 dark:text-gray-200">au meilleur prix</span>
                            </h3>
                        </div>
                        <div className="w-full flex justify-center mb-10">
                            <div className="w-[50px] h-2 bg-gradient-to-r from-indigo-600 to-[#2E6B5E] rounded-4xl"></div>
                        </div>
                        <Prices price={price} chocolats={chocolats[0]} produit={produit} />

                    </div>
                </div>
                <Alternative type={chocolats[0]?.categorie.slug} produit={produit} />

                {/* Section avantages */}
                {produit == 'chocolats' &&
                    <div className="mt-16 bg-amber-50 dark:bg-gray-700 rounded-2xl py-8 sm:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-8 text-center">
                            Pourquoi choisir ce chocolat ?
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: '🌱',
                                    title: 'Agriculture durable',
                                    text: 'Cultivé sans pesticides dans le respect des écosystèmes'
                                },
                                {
                                    icon: '👩🌾',
                                    title: 'Commerce équitable',
                                    text: 'Rémunération juste pour les producteurs locaux'
                                },
                                {
                                    icon: '🍫',
                                    title: 'Qualité premium',
                                    text: 'Process de fabrication artisanal et contrôlé'
                                },
                            ].map((benefit, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl mb-4">{benefit.icon}</div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">{benefit.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {/* Section FAQ */}
                {produit == 'chocolats' &&
                    <div className="px-4 mt-16 max-w-3xl mx-auto mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">Questions fréquentes</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    question: 'Quelle différence avec un chocolat classique ?',
                                    answer: 'Notre chocolat utilise uniquement des fèves de criollo...'
                                },
                                {
                                    question: 'Livraison disponible où ?',
                                    answer: 'Livraison en Europe sous 3-5 jours ouvrés'
                                },
                            ].map((faq, index) => (
                                <div key={index} className="border rounded-lg p-4 dark:text-gray-200">
                                    <details className="group">
                                        <summary className="flex justify-between items-center font-medium cursor-pointer">
                                            <span>{faq.question}</span>
                                            <span className="transition group-open:rotate-180">▼</span>
                                        </summary>
                                        <p className="mt-3 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                }

                {/* Disclosure */}
                {/* <p className="mt-12 text-center text-sm text-gray-500 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
                    *En tant que Partenaire {chocolats[0]?.program}, je réalise un bénéfice sur les achats remplissant les conditions requises.
                </p> */}
            </main>
        </>
    )
}
