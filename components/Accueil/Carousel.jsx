'use client'
// components/Carousel.jsx
import { useState, useEffect } from 'react';
import { isValidImage, scrollToSection } from '../composants';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Carousel({ slides }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () =>
        setCurrentSlide((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );

    const prevSlide = () =>
        setCurrentSlide((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );

    const goToSlide = (index) => setCurrentSlide(index);

    // Changement automatique toutes les 5 secondes
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         nextSlide();
    //     }, 5000);
    //     return () => clearInterval(timer);
    // }, [currentSlide]);

    return (
        <>
            <div className="relative w-full overflow-hidden">
                {/* Container des slides */}
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {slides?.map((slide, index) => (
                        <div key={index} className="w-full flex-shrink-0 relative">
                            {
                                isValidImage(slide) &&
                                <div className="relative w-full h-[400px]">
                                    <Image
                                        src={slide}
                                        alt={'imageP' + index}
                                        className='object-contain'
                                        fill
                                        quality={10}
                                    // unoptimized={false}
                                    />
                                </div>
                            }
                            {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                <h3 className="text-xl">{slide.caption || ''}</h3>
                            </div> */}
                        </div>
                    ))}
                </div>

                {/* Bouton Précédent */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Diapositive précédente"
                >
                    &larr;
                </button>

                {/* Bouton Suivant */}
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Diapositive suivante"
                >
                    &rarr;
                </button>

            </div>
            {/* Indicateurs de navigation */}
            <div className="flex w-full items-center p-1 mt-4 space-x-5 overflow-x-auto">
                {slides?.map((slide, index) => (
                    <button
                        onClick={() => goToSlide(index)}
                        key={index}
                        className={`w-20 h-20 border-2 border-gray-200
                                `}
                        // ${currentSlide === index ? 'bg-white' : 'bg-gray-500'} focus:outline-none
                        aria-label={`Aller à la diapositive ${index + 1}`}
                    >
                        {
                            isValidImage(slide) &&
                            (<div className="relative w-20 h-20">
                                <Image
                                    src={slide}
                                    alt={'image' + index}
                                    className='object-cover'
                                    fill
                                    quality={10}
                                // unoptimized={false}
                                />
                            </div>)
                        }
                    </button>
                ))}
            </div>
            <div className="flex w-full justify-center">
                <button onClick={() => scrollToSection("caractéristique")}
                    className='w-md flex items-center justify-center text-white text-lg shadow-lg font-bold bg-indigo-800 p-2 rounded-full mt-5 hover:bg-white hover:border-2 hover:border-black hover:text-black transition-all duration-400'>
                    Voir toutes les caractéristiques <ChevronDownIcon className='ml-5 w-5 h-5 font-bold' />
                </button>
            </div>
        </>
    );
}
