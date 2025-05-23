import ArticlesSection from '@/components/Accueil/ArticlesSection';
import DescriptionSection from '@/components/Accueil/DescriptionSection';
import Hero from '@/components/Accueil/Hero';
import ProductsSection from '@/components/Accueil/ProductsSection';
import OffreSection from '@/components/Accueil/OffreSection';
// import Carousel from '@/components/Accueil/Carousel';

export default async function page() {
  try {
    const [chocoRes, techRes, modeRes, articlesRes, totalRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?limit=3&produit_id=2`),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?limit=3&produit_id=3`),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?limit=3&produit_id=5`),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?total=total`)
    ])
    const [dataChoco, dataTech, dataMode, dataArticles, total] = await Promise.all([
      chocoRes.json(),
      techRes.json(),
      modeRes.json(),
      articlesRes.json(),
      totalRes.json()
    ])

    const articles = dataArticles?.map(item => ({
      ...item,
      image: item.image == "" ? [] : JSON.parse(item.image)
    }))

    const chocolats = dataChoco?.offres.map(item => ({
      ...item,
      features: item.features.split(',').map(f => f.trim()),
      image: item.image == "" ? [] : JSON.parse(item.image)
    }))
    const technologie = dataTech?.offres.map(item => ({
      ...item,
      features: item.features.split(',').map(f => f.trim()),
      image: item.image == "" ? [] : JSON.parse(item.image)
    }))
    const mode = dataMode?.offres.map(item => ({
      ...item,
      features: item.features.split(',').map(f => f.trim()),
      image: item.image == "" ? [] : JSON.parse(item.image)
    }))

    // const slides = [
    //   {
    //     id: 1,
    //     image: '/images/slide1.jpg',
    //     caption: 'Inspiration Chocolatée',
    //   },
    //   {
    //     id: 2,
    //     image: '/images/slide2.jpg',
    //     caption: 'Technologie Innovante',
    //   },
    //   {
    //     id: 3,
    //     image: '/images/slide3.png',
    //     caption: 'Style et Élégance',
    //   },
    // ];
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Hero />
        <ProductsSection total={total} />
        <DescriptionSection />
        <OffreSection chocolats={chocolats} technologie={technologie} mode={mode} />
        {/* <Carousel slides={slides} /> */}
        <ArticlesSection articles={articles} />
      </div>
    );
  } catch (error) {
    console.log(error)
  }
}
export const dynamic = 'force-dynamic';

{/* <div className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
  En-tête
  <div className="flex items-center gap-2 mb-4">
    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-200">
      🌱 Bio & Équitable
    </span>
    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-200">
      ⭐ Top Vente 2024
    </span>
  </div>

  Contenu principal
  <div className="grid md:grid-cols-2 gap-8">
    Colonne de gauche - Image
    <div className="relative group">
      <img
        src="https://picsum.photos/600/400?chocolate"
        alt="Tablette de chocolat noir 85% bio"
        className="rounded-lg w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
        📸 245 avis clients
      </div>
    </div>

    Colonne de droite - Détails
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Chocolat Noir Équitable 85% Cacao - Valrhona
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Découvrez l'intensité pure d'un cacao d'exception issu de l'agriculture durable au Ghana. Texture veloutée et notes torréfiées.
      </p>

      Caractéristiques
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">4.9/5 (1284 avis)</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">Livraison en 24h</span>
        </div>
      </div>

      Prix & CTA
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">6,40€</span>
          <span className="ml-2 text-gray-500 dark:text-gray-300 line-through">7,90€</span>
          <span className="ml-2 text-green-600 dark:text-green-400 font-medium">-19%</span>
        </div>

        <a
          href="https://affiliatelink.com/chocolat-valrhona"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center transition-all duration-300"
          rel="nofollow sponsored"
          target="_blank"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Commander maintenant
        </a>

        <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          ✅ 30 jours satisfait ou remboursé
        </p>
      </div>

      Garanties
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-green-500 font-bold">100%</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Bio</div>
        </div>
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-green-500 font-bold">2 ans</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Garantie</div>
        </div>
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="text-green-500 font-bold">⭐ 4.9/5</div>
          <div className="text-xs text-gray-600 dark:text-gray-300">Avis clients</div>
        </div>
      </div>
    </div>
  </div>

  Disclaimer
  <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
    *Ce site perçoit une commission sur les achats via ces liens. Prix TTC. Stock limité.
  </p>
</div> */}