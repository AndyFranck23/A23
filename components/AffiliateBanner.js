'use client'; // Nécessaire pour les interactions client

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AffiliateBanner() {
    const [isVisible, setIsVisible] = useState(true);

    // Vérifier le localStorage au montage
    useEffect(() => {
        const dismissed = localStorage.getItem('bannerDismissed');
        if (dismissed) setIsVisible(false);
    }, []);

    const dismissBanner = () => {
        localStorage.setItem('bannerDismissed', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 relative">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex-1 text-center md:text-left">
                        <p className="font-medium">
                            🎯 Découvrez nos partenaires ! Profitez de nos offres exclusives sur
                            <Link
                                // href="https://www.amazon.fr/?tag=votreIDaffiliation"
                                href="#"
                                // target="_blank"
                                rel="noopener noreferrer"
                                className="underline ml-1 hover:text-yellow-300 transition-colors"
                            >
                                Amazon
                            </Link>
                        </p>
                    </div>

                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                        <Link
                            href="/blog/meilleures-offres"
                            className="bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-100"
                        >
                            Voir les offres
                        </Link>
                    </div>
                </div>

                <button
                    onClick={dismissBanner}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-100 hover:text-white"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}