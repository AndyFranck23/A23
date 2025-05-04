'use client'
// components/Carousel.jsx
import { useState, useEffect } from 'react';

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
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    return (
        <div className="relative w-full overflow-hidden">
            {/* Container des slides */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides?.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        <img
                            src={slide}
                            // alt={slide.caption || ''}
                            className="w-full h-64 object-cover dark:object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                            {/* <h3 className="text-xl">{slide.caption || ''}</h3> */}
                        </div>
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

            {/* Indicateurs de navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides?.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-500'
                            } focus:outline-none`}
                        aria-label={`Aller à la diapositive ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
