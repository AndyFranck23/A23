import { safeFetch } from '@/components/composants';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function getSitemapData() {
    const produits = [{ slug: 'chocolats' }, { slug: 'technologie' }, { slug: 'la-mode' }]
    const [offresData, categories, articles, pages] = await Promise.all([
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/offres?xml=ss`),
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?xml=ss`),
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?xml=dd`),
        safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/page?xml=dd`)
    ])
    const offres = offresData.offres || offresData;

    const staticPages = [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 0.6,
        }
    ];

    const dynamicPagesProduits = produits?.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.2,
    })) || [];

    const dynamicPagesClassement = categories?.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/categorie/${item.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.3,
    })) || [];

    const dynamicPagesOffres = offres?.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${item.produit.slug}/${item.slug}`,
        lastModified: item.created_at,
        changeFrequency: 'daily',
        priority: 0.4,
    })) || [];

    const dynamicPagesBlog = articles?.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${item.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.5,
    })) || [];

    const dynamicPagesPages = pages?.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/page/${item.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.7,
    })) || [];

    return [
        ...staticPages,
        ...dynamicPagesProduits,
        ...dynamicPagesClassement,
        ...dynamicPagesOffres,
        ...dynamicPagesBlog,
        ...dynamicPagesPages,
    ];
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
