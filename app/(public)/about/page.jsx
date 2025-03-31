// import AffiliateBanner from '@/components/AffiliateBanner';
import { UserGroupIcon, BookOpenIcon, HeartIcon } from '@heroicons/react/24/outline';

export const metadata = {
    title: 'À propos - Mon Blog d\'Affiliation',
    description: 'Découvrez qui nous sommes et notre passion pour les bonnes affaires',
};

export default function page() {
    return (
        <>
            {/* <AffiliateBanner /> */}

            <div className="min-h-screen bg-gray-50">
                {/* Section Hero */}
                <section className="bg-blue-600 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Bien plus qu'un simple blog d'affiliation
                        </h1>
                        <p className="text-xl text-blue-100">
                            Notre mission : vous guider vers les meilleurs achats
                        </p>
                    </div>
                </section>

                {/* Section Notre histoire */}
                <section className="max-w-6xl mx-auto px-4 py-16">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-8 text-center">
                            <BookOpenIcon className="w-8 h-8 inline-block mr-2" />
                            Notre histoire
                        </h2>

                        <div className="prose lg:prose-xl mx-auto">
                            <p className="text-gray-600 mb-6">
                                Lancé en 2024, Mon Blog d'Affiliation est né d'une simple idée :
                                aider les consommateurs à faire des choix éclairés tout en découvrant
                                des produits exceptionnels.
                            </p>

                            <p className="text-gray-600 mb-6">
                                Nous combinons expertise technique et tests pratiques pour vous offrir
                                des revues détaillées et impartiales.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section Valeurs */}
                <section className="bg-white py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold mb-12 text-center">
                            <HeartIcon className="w-8 h-8 inline-block mr-2" />
                            Nos valeurs fondamentales
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Transparence absolue</h3>
                                <p className="text-gray-600">
                                    Chaque lien d'affiliation est clairement identifié. Nous ne recommandons
                                    que des produits que nous avons personnellement testés et approuvés.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Expertise technique</h3>
                                <p className="text-gray-600">
                                    Notre équipe analyse chaque produit sous tous les angles : performances,
                                    durabilité, rapport qualité-prix et expérience utilisateur.
                                </p>
                            </div>

                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">Indépendance éditoriale</h3>
                                <p className="text-gray-600">
                                    Aucun partenariat commercial n'influence nos recommandations.
                                    Notre seul objectif : votre satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Équipe */}
                <section className="max-w-6xl mx-auto px-4 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            <UserGroupIcon className="w-8 h-8 inline-block mr-2" />
                            Rencontrez notre équipe
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Une équipe passionnée dédiée à votre expérience d'achat
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Jean Dupont</h3>
                            <p className="text-gray-600 text-sm">Fondateur & Rédacteur en chef</p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Marie Leroy</h3>
                            <p className="text-gray-600 text-sm">Experte en produits tech</p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Paul Martin</h3>
                            <p className="text-gray-600 text-sm">Spécialiste mode & lifestyle</p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                            <h3 className="font-semibold mb-2">Sophie Lambert</h3>
                            <p className="text-gray-600 text-sm">Analyste qualité</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}