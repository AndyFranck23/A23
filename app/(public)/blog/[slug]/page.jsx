import React from 'react'

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?meta=df&slug=${slug}`)
        const [article] = await response.json()

        return {
            title: article?.metaTitle || 'Les 3 Merveilles',
            description: article?.metaDescription || 'Découvrez notre sélection exclusive de chocolats fins et produits d\'affiliation de qualité',
            robots: article?.status == true ? 'index, follow' : 'noindex, nofollow'
            // openGraph: {
            //     images: ['/og-chocolats.jpg'],
            // },
        };
    } catch (error) {
        console.log(error)
    }
}

const page = async ({ params }) => {
    try {
        const { slug } = await params
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?slug=${slug}`)
        const [article] = await response.json()

        return (
            <div>
                <section
                    className="relative bg-cover bg-center h-auto dark:bg-gray-800 p-10 md:p-0 md:h-[500px]"
                    style={{ backgroundImage: `url('${article?.image}')` }}
                >
                    {/* Overlay pour améliorer la lisibilité */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white">
                            {article?.title}
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-gray-300 lg:w-[1000px]">
                            {article?.description}
                        </p>
                    </div>
                </section>
                <section className='bg-gray-50 dark:bg-gray-900 dark:text-gray-200 py-20'>
                    {article?.content ? (
                        <div className="overflow-x-auto max-w-none sm:mx-[100px] mx-5">
                            <div className="no-tailwind" dangerouslySetInnerHTML={{ __html: JSON.parse(article.content) }} />
                        </div>
                    ) : (
                        <p>Contenu indisponible.</p>
                    )}
                </section>
            </div>
        )
    } catch (error) {
        console.log(error)
    }
}

export default page