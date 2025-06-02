// import Link from 'next/link';
// import CategorySection from '@/components/Chocolat/CategorySection';
// import SearchProducts from '@/components/SearchProducts';
// import Pagination from '@/components/Pagination';
import { nombrePage } from '@/components/Slug';
import TechPage from '@/components/tech/TechPage';
import ChocolatPage from '@/components/Chocolat/ChocolatPage';

export async function generateMetadata({ params, searchParams }) {
    try {
        const searchParam = await searchParams
        const currentPage = parseInt(searchParam.page) || 1
        const { produit } = await params
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/produit?slug=${produit}&meta=hh`)
        const [meta] = await response.json()

        return {
            title: meta?.meta_title || 'Les 3 Merveilles',
            description: meta?.meta_description || 'Découvrez notre sélection exclusive de chocolats, technologie et la mode d\'aujourd\'hui d\'affiliation de qualité',
            robots: meta?.status == true ? currentPage == true ? 'index, follow' : 'noindex, follow' : 'noindex, nofollow',
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${produit}`,
            },
            // openGraph: {
            //     images: ['/og-chocolats.jpg'],
            // },
        }
    } catch (error) {
        console.log(error)
    }
}

export default async function page({ params, searchParams }) {
    try {
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

        const [chocoRes, subCatRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?page=${currentPage}&limit=${nombrePage}&produit_id=${produit}`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?produit_id=${produit}`) // récupère les sous-cat qui on le Nom du champs Type == Chocolats
        ])
        const [{ offres, pagination }, subCatData] = await Promise.all([
            chocoRes.json(),
            subCatRes.json(),
        ])

        const data = offres?.map(item => ({
            ...item,
            features: item.features.split(',').map(f => f.trim()),
            image: item.image == "" ? [] : JSON.parse(item.image)
        }))

        const categoryInfo = subCatData;
        // const featuredProducts = chocolats?.filter(p => p.isFeatured);
        if (produit == 'chocolats') {
            return <ChocolatPage currentPage={currentPage} produit={produit} categoryInfo={categoryInfo} chocolats={data} pagination={pagination} />
        }

        return (
            <TechPage currentPage={currentPage} produit={produit} categoryInfo={categoryInfo} technologie={data} pagination={pagination} />
        )
    } catch (error) {
        console.log(error)
    }
}
