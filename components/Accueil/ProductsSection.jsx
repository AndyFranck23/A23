import Image from "next/image";
import Link from "next/link"

// components/ProductsSection.jsx
export default async function ProductsSection() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?total=total`)
        const total = await response.json()

        return (
            <section className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className=" px-4">
                    <div className="flex justify-center ">
                        <div className="lg:w-[1000px]">
                            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
                                Nos Produits
                            </h2>
                            <p className="text-center text-gray-600 text-lg mb-8 dark:text-gray-200">
                                Découvrez l'alliance parfaite du chocolat, de la technologie et de la mode.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-8 justify-center">
                        {/* Carte pour Chocolats */}
                        <Link href={`/chocolats`} className="hover:scale-105 duration-300 bg-white w-80 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                            <div className="relative w-full h-48 ">
                                <Image
                                    src="/chocolat.png"
                                    alt="Chocolats"
                                    className="object-cover"
                                    fill
                                    quality={50}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    Chocolats
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Découvrez notre sélection exquise de chocolats artisanaux.
                                </p>
                                <div className="mt-4">
                                    <span className="font-medium text-gray-800 bg-amber-300 p-1 px-2 rounded-2xl text-sm">
                                        {total[0].total} Offres
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {/* Carte pour Technologie Électronique */}
                        <Link href={`/tech`} className="hover:scale-105 duration-300 bg-white w-80 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                            <div className="relative w-full h-48 ">
                                <Image
                                    src="/tech.png"
                                    alt="Chocolats"
                                    className="object-cover"
                                    fill
                                    quality={50}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    Technologie Électronique
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Découvrez nos gadgets high-tech : casques audio, téléphones, écouteurs, etc.
                                </p>
                                <div className="mt-4">
                                    <span className="font-medium text-gray-200 bg-tech p-1 px-2 rounded-2xl text-sm">
                                        {total[1].total} Offres
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {/* Carte pour Mode */}
                        <Link href={`/mode`} className="hover:scale-105 duration-300 bg-white w-80 dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                            <div className="relative w-full h-48 ">
                                <Image
                                    src="/mode.png"
                                    alt="Chocolats"
                                    className="object-cover"
                                    fill
                                    quality={50}
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                                    Mode
                                </h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Explorez notre collection tendance de vêtements et accessoires.
                                </p>
                                <div className="mt-4">
                                    <span className="font-medium text-gray-800 bg-fashion p-1 px-2 rounded-2xl text-sm">
                                        {total[2].total} Offres
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        );
    } catch (error) {
        console.log(error)
    }
}
