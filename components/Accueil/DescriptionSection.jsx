import React from 'react';
import Image from 'next/image';

const DescriptionSection = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                {/* Zone Image */}
                <div className="md:w-1/2 p-4">
                    <div className="relative w-full h-80 md:h-96">
                        <Image
                            src="/engagement.png"
                            alt="Engagement Les 3 Merveilles"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
                {/* Zone Texte */}
                <div className="md:w-1/2 p-4">
                    <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
                        Notre Engagement
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                        Chez Les 3 Merveilles, nous nous engageons à vous offrir le meilleur de trois univers : des délices chocolatés, des innovations technologiques et une mode raffinée. Découvrez notre passion et notre savoir-faire à travers des produits uniques.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;
