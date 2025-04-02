// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';
import { slugify } from '@/components/Slug';

export const dynamic = 'force-dynamic';

async function getSitemapData() {
    try {
        const [offresRes, categoryRes, articlesRes] = await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?cat=chocolats`, { cache: 'no-store' }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`, { cache: 'no-store' }),
            fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`, { cache: 'no-store' }),
        ]);

        if (!offresRes.ok || !categoryRes.ok || !articlesRes.ok) {
            throw new Error('Erreur lors de la récupération des données API');
        }

        const offresData = await offresRes.json();
        const categories = await categoryRes.json();
        const articles = await articlesRes.json();
        const offres = offresData.offres || offresData;

        const staticPages = [
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/chocolats`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily',
                priority: 0.8,
            },
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/tech`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily',
                priority: 0.8,
            },
            {
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/mode`,
                lastModified: new Date().toISOString(),
                changeFrequency: 'daily',
                priority: 0.8,
            },
        ];

        const dynamicPagesClassement = categories?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/chocolats/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.6,
        })) || [];

        const dynamicPagesOffres = offres?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slugify(item.category)}/${slugify(item.subcategory)}/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.5,
        })) || [];

        const dynamicPagesBlog = articles?.map((item) => ({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${item.slug}`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.4,
        })) || [];

        return [
            ...staticPages,
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
