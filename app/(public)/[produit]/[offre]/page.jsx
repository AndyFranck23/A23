import Carousel from "@/components/Accueil/Carousel";
import Alternative from "@/components/Chocolat/Alternative";
import { safeFetch } from "@/components/composants";

// export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
    const { offre, produit } = await params
    const { offres } = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?meta=df&slug=${offre}`)

    return {
        title: offres[0]?.meta_title || 'Chocolats Premium - Notre Sélection',
        description: offres[0]?.meta_description || 'Découvrez notre sélection exclusive de chocolats fins et produits d\'affiliation de qualité',
        robots: 'index, follow',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${produit}/${offre}`,
        },
        // openGraph: {
        //     images: ['/og-chocolats.jpg'],
        // },
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": chocolats[0]?.name,
        "image": chocolats[0]?.image[0],
        "description": chocolats[0]?.description,
        "offers": {
            "@type": "Offer",
            "price": chocolats[0]?.price,
            "priceCurrency": "EUR"
        }
    };

    return (
        <>
            {/* <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            /> */}
            <main className="min-h-screen bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header avec image et prix */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                        {/* Galerie images */}
                        <div className="mb-8 lg:mb-0">
                            <div className="aspect-w-1 aspect-h-1 overflow-hidden">
                                <Carousel slides={chocolats[0]?.image} />
                            </div>
                        </div>

                        {/* Détails produit */}
                        <div className="lg:py-8">
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200 mb-4">
                                {chocolats[0]?.name || ''}
                            </h1>

                            {/* <div className="flex items-center gap-2 mb-6">
                                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Produit Bio
                                </span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                    Équitable
                                </span>
                            </div> */}

                            <div className="flex justify-between">
                                <h2 className="text-4xl font-bold text-blue-500 mb-4">
                                    {chocolats[0]?.price || ''}
                                    <span className="ml-3 text-gray-500 dark:text-gray-200 text-lg line-through">{chocolats[0]?.originalPrice || ''} </span>
                                </h2>
                                {produit == "chocolats" &&
                                    <h2 className="text-xl text-amber-600 font-bold mb-5">
                                        {chocolats[0]?.poids} g
                                    </h2>
                                }
                            </div>

                            <a
                                href={
                                    typeof chocolats[0]?.affiliateLink === "string" &&
                                        (chocolats[0]?.affiliateLink.startsWith("http://") || chocolats[0]?.affiliateLink.startsWith("https://"))
                                        ? chocolats[0]?.affiliateLink
                                        : '#'
                                }
                                className={`inline-block w-full text-2xl font-bold ${produit == "chocolats" ? 'bg-amber-600 hover:bg-amber-700' : 'bg-tech hover:bg-blue-600'} text-white text-center py-4 px-8 rounded-lg font-medium transition-colors duration-200`}
                                target="_blank"
                                rel="nofollow noopener"
                            >
                                Acheter ⇨
                                {/* Prix: {chocolats[0]?.price || ''} */}
                            </a>
                            {/* Description détaillée */}
                            <section className="mt-16 max-w-3xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-6">Description du produit</h2>
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

                        </div>
                    </div>

                </div>

                <div className="">
                    {chocolats[0]?.content ? (
                        <section className='bg-gray-100 dark:bg-gray-900 dark:text-gray-200 p-5 w-full flex justify-center'>
                            <div className="overflow-x-auto lg:w-[800px]">
                                <div className="no-tailwind" dangerouslySetInnerHTML={{ __html: JSON.parse(chocolats[0].content) }} />
                            </div>
                        </section>
                    ) : (
                        <p></p>
                    )}

                    {/* Caractéristiques rapides */}
                    <div id="caractéristique" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-8 border-t border-gray-200 lg:w-[800px]">
                        <h2 className="text-4xl font-bold text-blue-500 mb-4">Les caractéristiques</h2>
                        <h3 className="text-xl font-semibold text-blue-800 mb-4 line-clamp-1">{chocolats[0]?.name}</h3>
                        <div className="w-full">
                            {chocolats[0]?.features.map((value, index) => {
                                const [titre, text] = value.split("=");
                                const elements = !text ? titre.split(',').map(f => f.trim()) : text.split(',').map(f => f.trim())
                                return (
                                    <div className="" key={index}>
                                        {!text ? '' : <h3 className="text-xl font-semibold text-red-400 my-4">{titre}</h3>}
                                        {elements?.map((test, i) => {
                                            const [label, element] = test.split(":");
                                            return (
                                                <div key={i} className={`${i % 2 == 0 ? 'bg-gray-100 dark:bg-gray-800' : ''} grid grid-cols-2 p-4 px-10`}>
                                                    <span className="font-semibold text-xl text-gray-800 dark:text-gray-200">{label}</span>
                                                    {/* <svg className="w-4 h-4 mr-1 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                    </svg> */}
                                                    <span className="flex-1 text-gray-600 dark:text-gray-400 text-lg">{element}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <Alternative type={chocolats[0]?.categorie.slug} produit={produit} />

                    {/* Section avantages */}
                    {produit == 'chocolats' &&
                        <div className="px-4 mt-16 bg-amber-50 dark:bg-gray-700 rounded-2xl p-8 sm:p-12">
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
                        <div className="px-4 mt-16 max-w-3xl mx-auto">
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
                    <p className="mt-12 text-center text-sm text-gray-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        *En tant que Partenaire {chocolats[0]?.program}, je réalise un bénéfice sur les achats remplissant les conditions requises.
                    </p>
                </div>
            </main>
        </>
    )
}
