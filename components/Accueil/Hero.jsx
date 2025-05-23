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
                <p className="text-4xl md:text-6xl font-bold text-white">
                    Bienvenue sur Les 3 Merveilles
                </p>
                <h1 className="mt-4 text-lg md:text-xl text-gray-300 lg:w-[1000px]">
                    Découvrez l'univers sur Les 3 Merveilles où se mêlent gourmandise, innovation et style.
                    Laissez-vous tenter par nos chocolats artisanaux, véritables délices pour les papilles,
                    ainsi que par notre sélection technologique (téléphones, casques audio, écouteurs, etc) alliant performance et design.
                    Enfin, affirmez votre personnalité avec notre collection mode tendance, conçue pour sublimer chaque look.
                </h1>
                <button className="mt-6 px-6 py-3 bg-tech hover:bg-amber-200 hover:text-gray-900 text-white rounded-full font-semibold transition">
                    Explorer
                </button>
            </div>
        </section>
    );
}
