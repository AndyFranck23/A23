// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getSitemapData() {
    try {
        const [offresRes, categoryRes, articlesRes, produitsRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?xml=ss`, { cache: 'no-store' }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?xml=ss`, { cache: 'no-store' }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`, { cache: 'no-store' }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/produit?xml=ss`, { cache: 'no-store' }),
        ]);

        if (!offresRes.ok || !categoryRes.ok || !articlesRes.ok || !produitsRes) {
            throw new Error('Erreur lors de la récupération des données API');
        }

        const offresData = await offresRes.json();
        const categories = await categoryRes.json();
        const articles = await articlesRes.json();
        const produits = await produitsRes.json();
        const offres = offresData.offres || offresData;

        const staticPages = [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
        ];

        const dynamicPagesProduits = produits?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.2,
        })) || [];

        const dynamicPagesClassement = categories?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.category}/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.3,
        })) || [];

        const dynamicPagesOffres = offres?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.produit}/${item.category}/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.4,
        })) || [];

        const dynamicPagesBlog = articles?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.5,
        })) || [];

        return [
            ...staticPages,
            ...dynamicPagesProduits,
            ...dynamicPagesClassement,
            ...dynamicPagesOffres,
            ...dynamicPagesBlog,
        ];
    } catch (error) {
        console.error('Fetch failed for posts in sitemap:', error);
        return [];
    }
}

export async function GET() {
    const urls = await getSitemapData();

    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
            .map(
                (url) => `<url>
    <loc>${url.url}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <changefreq>${url.changeFrequency}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
            )
            .join('')}
</urlset>`;

    return new NextResponse(sitemapXML, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
