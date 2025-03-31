// app/page.js
'use client'
import Link from 'next/link';
import { useState } from 'react';
import { StarIcon, BookOpenIcon, VideoCameraIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function test() {
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const featuredPosts = []; // Gardez les mêmes données que précédemment

    const popularPosts = [
        {
            id: 3,
            title: "Les secrets du CSS moderne",
            category: "Développement",
            comments: 28,
            likes: 142
        },
        {
            id: 4,
            title: "Optimiser les performances web",
            category: "Performance",
            comments: 45,
            likes: 210
        }
    ];

    const categories = [
        { name: "Technologie", count: 15 },
        { name: "Design", count: 8 },
        { name: "SEO", count: 12 },
        { name: "Astuces", count: 23 }
    ];

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
            {/* Navigation améliorée */}
            <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                <nav className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-2xl font-bold text-blue-600">
                                TechBlog
                            </Link>

                            <div className="hidden lg:flex space-x-6">
                                <Link href="/categories" className="hover:text-blue-600 flex items-center">
                                    <BookOpenIcon className="h-5 w-5 mr-1" />
                                    Catégories
                                </Link>
                                <Link href="/video" className="hover:text-blue-600 flex items-center">
                                    <VideoCameraIcon className="h-5 w-5 mr-1" />
                                    Vidéos
                                </Link>
                                <Link href="/community" className="hover:text-blue-600 flex items-center">
                                    <UserGroupIcon className="h-5 w-5 mr-1" />
                                    Communauté
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Rechercher des articles..."
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {darkMode ? '🌞' : '🌙'}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Section Statistiques */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-16`}>
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
                    <div className="p-6">
                        <div className="text-3xl font-bold text-blue-600">1K+</div>
                        <div className="text-gray-600 dark:text-gray-300">Articles publiés</div>
                    </div>
                    <div className="p-6">
                        <div className="text-3xl font-bold text-blue-600">50K+</div>
                        <div className="text-gray-600 dark:text-gray-300">Lecteurs mensuels</div>
                    </div>
                    <div className="p-6">
                        <div className="text-3xl font-bold text-blue-600">200+</div>
                        <div className="text-gray-600 dark:text-gray-300">Tutoriels vidéo</div>
                    </div>
                    <div className="p-6">
                        <div className="text-3xl font-bold text-blue-600">98%</div>
                        <div className="text-gray-600 dark:text-gray-300">Satisfaction</div>
                    </div>
                </div>
            </div>

            {/* Section Articles Populaires */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-8">🔥 Articles populaires</h2>
                <div className="grid lg:grid-cols-2 gap-6">
                    {popularPosts.map(post => (
                        <div
                            key={post.id}
                            className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md hover:shadow-lg transition-shadow`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        {post.category}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        <StarIcon className="h-4 w-4 text-yellow-500" />
                                        <span>{post.likes} votes</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {post.comments} commentaires
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section Catégories */}
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-16`}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">📚 Catégories</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {categories.map((category) => (
                            <Link
                                href={`/categories/${category.name.toLowerCase()}`}
                                key={category.name}
                                className={`p-6 rounded-lg flex justify-between items-center transition-colors 
                  ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'}`}
                            >
                                <span className="font-medium">{category.name}</span>
                                <span className={`px-2 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                    {category.count}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Auteur Vedette */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <img
                            src="https://i.pravatar.cc/150?img=5"
                            alt="Auteur vedette"
                            className="w-32 h-32 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-4">Auteur du mois : Marie Dubois</h3>
                            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                Développeuse fullstack passionnée par les technologies modernes.
                                Auteur de plus de 50 articles techniques sur React et Next.js.
                            </p>
                            <div className="flex space-x-4">
                                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                    Suivre
                                </button>
                                <button className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                                    Voir les articles
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Tutoriel Vidéo */}
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} py-16`}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">🎥 Dernier tutoriel</h2>
                    <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Section FAQ */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-8">❓ Questions fréquentes</h2>
                <div className="space-y-4">
                    {[
                        {
                            question: "Comment commencer avec Next.js ?",
                            answer: "Consultez notre guide complet pour débutants..."
                        },
                        {
                            question: "Quelles sont les bonnes pratiques SEO ?",
                            answer: "Découvrez nos 10 conseils essentiels..."
                        }
                    ].map((faq, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
                        >
                            <details className="group">
                                <summary className="flex justify-between items-center cursor-pointer">
                                    <span className="font-medium text-lg">{faq.question}</span>
                                    <span className="transition-transform group-open:rotate-180">▼</span>
                                </summary>
                                <p className="mt-4 text-gray-600 dark:text-gray-300">
                                    {faq.answer}
                                </p>
                            </details>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer amélioré */}
            <footer className={`${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-gray-300 py-12`}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-5 gap-8">
                        {/* Colonnes de contenu supplémentaires */}
                        <div className="md:col-span-2">
                            <h3 className="text-white text-xl font-bold mb-4">TechBlog</h3>
                            <p className="text-sm">
                                La référence francophone pour les développeurs passionnés
                                par les technologies modernes et les bonnes pratiques.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Guides</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/guides/nextjs">Next.js</Link></li>
                                <li><Link href="/guides/react">React</Link></li>
                                <li><Link href="/guides/seo">SEO</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Ressources</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/outils">Outils</Link></li>
                                <li><Link href="/ebooks">Ebooks</Link></li>
                                <li><Link href="/podcasts">Podcasts</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-medium mb-4">Légal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/confidentialite">Confidentialité</Link></li>
                                <li><Link href="/conditions">Conditions</Link></li>
                                <li><Link href="/cookies">Cookies</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
                        © 2024 TechBlog - Tous droits réservés - Made with ❤️ in France
                    </div>
                </div>
            </footer>
        </div>
    );
}