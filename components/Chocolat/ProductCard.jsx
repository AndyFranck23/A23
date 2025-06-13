'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { isValidImage } from '../composants';

export default function ProductCard({ product }) {
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const features = product?.features || [];
    const visibleFeatures = showAllFeatures ? features : features.slice(0, 4);

    return (
        <div className="hover:scale-102 bg-white border-2 border-green-600 dark:bg-gray-800 shadow-xl hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative">
                <div className="w-full h-48 rounded-t-xl ">
                    <Image
                        src={isValidImage(product.image[0]) ? product.image[0] : '/agentIA.png'}
                        alt={'image'}
                        className='object-contain'
                        fill
                        quality={10}
                    // unoptimized={false}
                    />
                </div>
                {product.remise && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        -{product.remise}%
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 dark:text-white line-clamp-2">{product.name}</h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {product.description}
                </p>

                {/* Caractéristiques */}
                <div className="grid grid-cols-2 gap-2 mb-4 flex-grow">
                    {visibleFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start">
                            <svg className="w-4 h-4 mr-1 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                            </svg>
                            <span className="text-sm dark:text-gray-300 line-clamp-2">{feature}</span>
                        </div>
                    ))}
                </div>
                {features.length > 4 &&
                    <button className='text-sm text-blue-500' onClick={() => setShowAllFeatures(!showAllFeatures)}>
                        {
                            showAllFeatures ? 'voir moins' : 'voir plus'
                        }
                    </button>
                }

                {/* Contrôles */}
                <div className="mt-auto space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            {product.originalPrice && (
                                <span className="text-gray-400 line-through mr-2 text-sm">
                                    {product.originalPrice}
                                </span>
                            )}
                            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {product.price}
                            </span>
                        </div>
                        <div className="text-xl text-amber-600 font-bold">
                            {product.poids} g
                        </div>
                        {/* <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200">
                            Comm. {product.commission}
                        </span> */}
                    </div>

                    <Link
                        href={`${process.env.NEXT_PUBLIC_SITE_URL}/${product.produit.slug}/${product.slug}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full text-center block"
                        rel="nofollow sponsored"
                    >
                        Voir l'offre
                    </Link>
                </div>
            </div>
        </div>
    );
}