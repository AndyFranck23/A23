// import Link from 'next/link';
// import CategorySection from '@/components/Chocolat/CategorySection';
// import SearchProducts from '@/components/SearchProducts';
// import Pagination from '@/components/Pagination';
import { nombrePage } from '@/components/Slug';
import TechPage from '@/components/tech/TechPage';
import ChocolatPage from '@/components/Chocolat/ChocolatPage';
import { safeFetch } from '@/components/composants';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params, searchParams }) {
    const searchParam = await searchParams
    const currentPage = parseInt(searchParam.page) || 1
    const { produit } = await params
    let image = ''
    if (produit == 'technologie')
        image = '/public/tech.png'
    else if (produit == 'la-mode')
        image == '/public/mode.png'
    else if (produit == 'chocolats')
        image == '/public/chocolat.png'
    const [meta] = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/produit?slug=${produit}&meta=hh`)

    return {
        title: meta?.meta_title || 'Les 3 Merveilles',
        description: meta?.meta_description || 'Découvrez notre sélection exclusive de chocolats, technologie et la mode d\'aujourd\'hui d\'affiliation de qualité',
        robots: currentPage == 1 ? 'index, follow' : 'noindex, follow',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${produit}`,
        },
        openGraph: {
            images: [image],
        },
    }
}

export default async function page({ params, searchParams }) {
    const { page } = await searchParams
    const { produit } = await params
    const currentPage = page ? parseInt(page) : 1; // Récupérer la page

    // // Normalisation de la requête
    // const normalizeString = (str) => {
    //     return str
    //         .normalize("NFD")
    //         .replace(/[\u0300-\u036f]/g, "")
    //         .toLowerCase();
    // };

    // const searchTerm = normalizeString('Écrin');

    // // Si un terme de recherche est fourni, on construit une chaîne de filtres ($or)
    // let searchQuery = '';
    // if (searchTerm) {
    //     searchQuery =
    //         `&filters[$or][0][nom][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
    //         `&filters[$or][1][description][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
    //         `&filters[$or][2][categorie][nom][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
    //         `&filters[$or][3][sous_category][nom][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
    //         `&filters[$or][4][prix][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
    //         `&filters[$or][5][program][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}` +
    //         `&filters[$or][6][features][$containsi]=${encodeURIComponent(searchTerm.toLowerCase())}`;
    // }

    const [{ offres, pagination }, subCatData] = await Promise.all([
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?page=${currentPage}&limit=${nombrePage}&produit_id=${produit}`),
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?produit_id=${produit}`) // récupère les sous-cat qui on le Nom du champs Type == Chocolats
    ])

    const data = offres?.map(item => ({
        ...item,
        features: item.features.split(',').map(f => f.trim()),
        image: item.image == "" ? [] : JSON.parse(item.image)
    }))

    const categoryInfo = subCatData;
    // const featuredProducts = chocolats?.filter(p => p.isFeatured);
    let offreParCategory = []
    for (let i = 0; i < categoryInfo.length; i++) {
        const response = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?total2=${categoryInfo[i].slug}`)
        offreParCategory.push(response)
    }

    if (produit == 'chocolats') {
        return (
            <ChocolatPage currentPage={currentPage} produit={produit} categoryInfo={categoryInfo} chocolats={data} pagination={pagination} />
        )
    }

    return (
        <TechPage offreParCategory={offreParCategory} currentPage={currentPage} produit={produit} categoryInfo={categoryInfo} technologie={data} pagination={pagination} />
    )
}
