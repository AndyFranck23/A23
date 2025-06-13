'use client';
import Image from 'next/image';
import { useState } from 'react';
import { isValidImage } from '../composants';
import Link from 'next/link';

// export default function TechProductCard({ product }) {
//     const [showAllFeatures, setShowAllFeatures] = useState(false);
//     const features = product?.features || [];
//     const visibleFeatures = showAllFeatures ? features : features.slice(0, 4);

//     return (
//         <div className="hover:scale-102 bg-white border-2 border-blue-600 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
//             <div className="relative">
//                 <div className="w-full h-48 rounded-t-xl ">
//                     <Image
//                         src={isValidImage(product.image[0]) ? product.image[0] : '/agentIA.png'}
//                         alt={product.name || 'image'}
//                         className='object-cover'
//                         fill
//                         quality={50}
//                     // unoptimized={false}
//                     />
//                 </div>
//                 <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
//                     {product.categorie.nom}
//                 </div>
//                 {product?.remise && (
//                     <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
//                         -{product?.remise}%
//                     </div>
//                 )}
//             </div>

//             <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-xl font-bold mb-2 dark:text-white line-clamp-2">{product?.name}</h3>

//                 {/* Description */}
//                 <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
//                     {product?.description}
//                 </p>

//                 {/* Spécifications */}
//                 <div className="grid grid-cols-2 gap-2 mb-4 flex-grow">
//                     {visibleFeatures.map((feature, index) => (
//                         <div key={index} className="flex items-start">
//                             <svg className="w-4 h-4 mr-1 mt-0.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                             </svg>
//                             <span className="text-sm dark:text-gray-300 line-clamp-2">{feature}</span>
//                         </div>
//                     ))}
//                 </div>
//                 {features.length > 4 &&
//                     <button className='text-sm text-blue-500' onClick={() => setShowAllFeatures(!showAllFeatures)}>
//                         {
//                             showAllFeatures ? 'voir moins' : 'voir plus'
//                         }
//                     </button>
//                 }

//                 <div className="mt-auto space-y-2 pt-4">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             {product?.originalPrice && (
//                                 <span className="text-gray-400 line-through mr-2 text-sm">
//                                     {product?.originalPrice}
//                                 </span>
//                             )}
//                             <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                                 {product?.price}
//                             </span>
//                         </div>
//                         {/* <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full dark:bg-purple-900 dark:text-purple-200">
//                             Note : {product?.rating}/5
//                         </span> */}
//                     </div>

//                     <Link
//                         href={`${process.env.NEXT_PUBLIC_SITE_URL}/${product.produit.slug}/${product.categorie.slug}/${product.slug}`}
//                         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full text-center block"
//                         rel="nofollow sponsored"
//                     >
//                         Voir l' offres
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

// components/ProductCard.js
export default function TechProductCard({ product }) {
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const features = product?.features || [];
    const visibleFeatures = showAllFeatures ? features : features.slice(0, 4);

    return (
        <div className="max-w-sm bg-white hover:scale-102 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative">
                <div className="w-full h-48 bg-white">
                    <Image
                        src={isValidImage(product.image[0]) ? product.image[0] : '/agentIA.png'}
                        alt={product.name || 'image'}
                        className='object-contain'
                        fill
                        quality={10}
                    // unoptimized={false}
                    />
                </div>
                <Link href={`/categorie/${product.categorie.slug}`} className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs">
                    {product.categorie.nom}
                </Link>
                {product?.remise && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        -{product?.remise}%
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2 line-clamp-1">{product?.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">{product?.description}</p>

                <ul className="mb-2 grid grid-cols-2 flex-grow">
                    {visibleFeatures.map((feat, i) => (
                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-400 text-sm">
                            <svg
                                className="w-4 h-4 text-green-500 mr-2 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l7.879-7.879a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className='line-clamp-1'>{feat}</span>
                        </li>
                    ))}
                </ul>
                {features.length > 4 &&
                    <button className='text-sm text-blue-800' onClick={() => setShowAllFeatures(!showAllFeatures)}>
                        {
                            showAllFeatures ? 'voir moins' : 'voir plus'
                        }
                    </button>
                }
                <div className="mt-auto space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                        {/* <span className="text-lg font-bold text-indigo-600">{price}</span> */}
                        <div>
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-2">
                                {product?.price}
                            </span>
                            {product?.originalPrice && (
                                <span className="text-gray-400 line-through text-sm">
                                    {product?.originalPrice}
                                </span>
                            )}
                        </div>
                        <Link
                            href={`${process.env.NEXT_PUBLIC_SITE_URL}/${product.produit.slug}/${product.slug}`}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                            rel="nofollow sponsored"
                        >
                            En savoir plus
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}