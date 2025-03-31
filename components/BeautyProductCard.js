'use client';
import { useState } from 'react';

export default function BeautyProductCard({ product }) {
    const [showAllFeatures, setShowAllFeatures] = useState(false);
    const [showAllIngredients, setShowAllIngredients] = useState(false);

    const features = product?.features || [];
    const visibleFeatures = showAllFeatures ? features : features.slice(0, 4);

    // const ingredients = product.ingredients || [];
    // const visibleIngredients = showAllIngredients ? ingredients : ingredients.slice(0, 2);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <div className="relative">
                <img
                    src={`/mode.png`}
                    alt={product?.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                />
                {product?.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        -{product?.discount}%
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{product?.name}</h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {product?.description}
                </p>

                {/* Bénéfices */}
                <div className="grid grid-cols-2 gap-2 mb-4 flex-grow">
                    {visibleFeatures.map((feature, index) => (
                        <div key={index} className="flex items-start">
                            <svg className="w-4 h-4 mr-1 mt-0.5 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-sm dark:text-gray-300 line-clamp-2">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Ingrédients avec gestion d'affichage */}
                {/* {ingredients.length > 0 && (
                    <div className="mt-2 border-t pt-3">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold dark:text-gray-300">Ingrédients :</span>
                            {ingredients.length > 2 && (
                                <button
                                    onClick={() => setShowAllIngredients(!showAllIngredients)}
                                    className="text-pink-600 dark:text-pink-400 text-xs hover:underline"
                                >
                                    {showAllIngredients ? 'Réduire' : 'Voir tout'}
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {visibleIngredients.map((ingredient, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-100 dark:text-gray-300 dark:bg-gray-700 rounded-full text-xs"
                                >
                                    {ingredient}
                                </span>
                            ))}
                        </div>
                    </div>
                )} */}

                <div className="mt-auto space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            {product?.originalPrice && (
                                <span className="text-gray-400 line-through mr-2 text-sm">
                                    {product?.originalPrice}
                                </span>
                            )}
                            <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                                {product?.price}
                            </span>
                        </div>
                        {/* {product?.isVegan && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                                🌿 Vegan
                            </span>
                        )} */}
                    </div>

                    <a
                        href={product?.affiliateLink}
                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors w-full text-center block"
                        rel="nofollow sponsored"
                    >
                        Essayer maintenant
                    </a>
                </div>
            </div>
        </div>
    );
}