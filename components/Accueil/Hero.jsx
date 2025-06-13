"use client"

import { scrollToSection } from "../composants";

// components/Hero.jsx
export default function Hero() {

    return (
        <section
            className="relative bg-cover bg-center h-auto dark:bg-gray-800 p-10 md:p-0 md:h-[500px]"
            style={{ backgroundImage: "url('/hero.webp')" }}
        >
            {/* Overlay pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Bienvenue sur Les 3 Merveilles
                </h1>
                <h2 className="mt-4 text-lg md:text-xl text-gray-300 lg:w-[1000px]">
                    Les 3 Merveilles : chocolats artisanaux, technologie alliant performance et design, mode tendance pour sublimer chaque look.
                </h2>
                <button onClick={() => scrollToSection("offreSection")} className="mt-6 px-6 py-3 bg-tech hover:bg-amber-200 hover:text-gray-900 text-white rounded-full font-semibold transition">
                    Explorer
                </button>
            </div>
        </section>
    );
}
