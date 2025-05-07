import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isValidImage } from '../composants';

// const articles = [
//     {
//         id: 1,
//         title: "L'Art du Chocolat",
//         excerpt: "Découvrez les secrets de fabrication du chocolat artisanal et les tendances gourmandes de la saison.",
//         image: "/images/slide1.jpg",
//     },
//     {
//         id: 2,
//         title: "Les Innovations High-Tech",
//         excerpt: "Plongez dans l'univers des nouvelles technologies avec des gadgets et appareils électroniques révolutionnaires.",
//         image: "/images/slide2.jpg",
//     },
//     {
//         id: 3,
//         title: "Les Tendances de la Mode",
//         excerpt: "Explorez les dernières tendances mode et apprenez comment adopter un style unique et élégant.",
//         image: "/images/slide3.png",
//     },
// ];

export default function ArticlesSection({ articles }) {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200 mb-12">
                    Nos Articles
                </h2>
                <div className="flex flex-wrap gap-8 justify-center">
                    {articles?.map((article) => (
                        <div
                            key={article.id}
                            className="w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={isValidImage(article.image) ? article.image : '/agentIA.png'}
                                    alt={article.title}
                                    fill
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 pb-0">
                                <div className="">
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                                        {article.description}
                                    </p>
                                </div>
                            </div>
                            <div className="pb-6 pl-6">
                                <Link
                                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`}
                                    className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Lire la suite
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
