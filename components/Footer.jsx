import Link from "next/link";

export default async function Footer({ produits }) {
    try {
        const [articlesRes, pagesRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?footer=true`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/page?footer=true`)
        ])
        const [articles, pages] = await Promise.all([
            articlesRes.json(),
            pagesRes.json()
        ])

        return (
            <footer className="bg-black/90 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 py-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">Les 3 Merveilles</h3>
                            {
                                articles?.length > 0 &&
                                articles.map((item, index) =>
                                    <div key={index} className=" text-gray-400">
                                        <li>
                                            <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${item.slug}`} className="hover:text-white">{item.title}</Link>
                                        </li>
                                    </div>
                                )
                            }
                            {/* <p className="text-gray-400">Votre guide ultime pour les produits tech et les meilleures affaires.</p> */}
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Produits</h4>
                            <div className="space-y-2 text-gray-400">
                                {
                                    produits?.length > 0 &&
                                    <>
                                        {produits?.map((item, index) =>
                                            <li key={index}><Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/${item.slug}`} className="hover:text-white">{item.nom} </Link></li>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Légal</h4>
                            <div className="space-y-2 text-gray-400">
                                {
                                    pages?.length > 0 &&
                                    <>
                                        {pages?.map((item, index) =>
                                            <li key={index} className="list-desc">
                                                <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/page/${item.slug}`} className="hover:text-white">{item.title} </Link>
                                            </li>
                                        )}
                                    </>
                                }
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Contact</h4>
                            <p className="text-gray-400">contact@les3merveilles.com</p>
                            <div className="flex space-x-6 mt-4 text-xl">
                                <a href="#" target="_blank" className="hover:text-blue-400"><i className="fa-brands fa-facebook"></i> </a>
                                <a href="#" target="_blank" className="hover:text-blue-400"><i className="fa-brands fa-instagram"></i> </a>
                                <a href="#" target="_blank" className="hover:text-blue-400"><i className="fa-brands fa-linkedin"></i> </a>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 py-5 text-center text-gray-400">
                        <p>© 2025 Les 3 Merveilles. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.log(error)
    }
}