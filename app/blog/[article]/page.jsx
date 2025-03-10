import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import { slugify } from '@/components/Slug'
import React from 'react'

export async function generateMetadata({ params }) {
    const { article } = await params

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog?slug=${article}`)
    const data = await response.json()

    return {
        title: data[0].meta_title == '' ? data[0].title : data[0].meta_title,
        description: data[0].meta_description,
        // robots: data.indexation == 0 ? "noindex, nofollow" : "index, follow",
        robots: data[0].indexation == 0 ? "noindex, nofollow" : "index, follow"
    }
}

const page = async ({ params }) => {
    const { article } = await params
    const [typesRes, classementsRes, produitsRes, articlesRes, footerRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/types`, { cache: "no-store" }),
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/classements`, { cache: "no-store" }),
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/produit`, { cache: "no-store" }),
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog`),
        fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/footer`),
    ])

    const [types, classements, produits, blog, footers] = await Promise.all([typesRes.json(), classementsRes.json(), produitsRes.json(), articlesRes.json(), footerRes.json()])
    const classement = types.map(category => ({
        ...category,
        classement: classements.filter(item => item.type === category.title)
    }));

    const articles = blog?.filter(item => slugify(item.title) == article)

    return (
        <>
            <Header classement={classement} produits={produits} />
            <div className='text-black pt-20  mb-10'>
                <h1 className='text-2xl md:text-4xl text-black text-center font-bold mb-5'>{articles[0]?.title} </h1>
                <div className="xs:px-[5vw] px-[20px] w-full justify-center flex">
                    {articles[0]?.content ? (
                        <div className="overflow-x-auto max-w-none flex lg:mx-[180px] mt-10  bg-gray-100 p-5 rounded-xl shadow-xl">
                            <div className="no-tailwind" dangerouslySetInnerHTML={{ __html: articles[0].content }} />
                        </div>
                    ) : (
                        <p>Contenu indisponible.</p>
                    )}
                </div>
            </div>
            <Footer articles={blog} result={footers} classements={classement} />
        </>
    )
}

export default page