import { slugify } from "@/components/Slug";

export default async function sitemap() {
    try {
        // Récupération des données depuis l'API via Promise.all
        const [offresRes, categoryRes, articlesRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?cat=chocolats`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`),
        ]);

        // Vérification que toutes les réponses sont correctes
        if (!offresRes.ok || !categoryRes.ok || !articlesRes.ok) {
            throw new Error("Erreur lors de la récupération des données API");
        }

        // Conversion des réponses en JSON
        const offresData = await offresRes.json();
        const categories = await categoryRes.json();
        const articles = await articlesRes.json();

        const offres = offresData.offres || offresData;

        // Définition des pages statiques de votre site
        const staticPages = [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
                lastModified: new Date().toISOString(),
                changeFrequency: "daily",
                priority: 1.0,
            },
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/chocolats`,
                lastModified: new Date().toISOString(),
                changeFrequency: "daily",
                priority: 0.8,
            },
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/tech`,
                lastModified: new Date().toISOString(),
                changeFrequency: "daily",
                priority: 0.8,
            },
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/mode`,
                lastModified: new Date().toISOString(),
                changeFrequency: "daily",
                priority: 0.8,
            },
        ];

        // Génération des entrées pour les pages dynamiques

        const dynamicPagesClassement = categories?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/chocolats/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.6,
        })) || [];

        const dynamicPagesOffres = offres?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slugify(item.category)}/${slugify(item.subcategory)}/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.5,
        })) || [];

        const dynamicPagesBlog = articles?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: "daily",
            priority: 0.4,
        })) || [];

        // Retourne la liste complète des URL
        return [
            "<?xml version='1.0' encoding='UTF-8'?>",
            ...staticPages,
            ...dynamicPagesClassement,
            ...dynamicPagesOffres,
            ...dynamicPagesBlog,
        ]
        // }
        // `;
    } catch (error) {
        console.error("Fetch failed for posts in sitemap:", error);
        // Retourner un tableau vide pour éviter de bloquer le build
        return [];
    }
}
export const dynamic = 'force-dynamic';