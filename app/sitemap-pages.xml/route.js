import { safeFetch } from "@/components/composants";

// app/sitemaps-products.xml/route.js
export async function GET() {
  const host = process.env.NEXT_PUBLIC_SITE_URL;
  const pages = await safeFetch(`${host}/api/page?xml=jj`)
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(item => `
    <url>
      <loc>${host}/page/${item.slug}</loc>
      <lastmod>${new Date(item.updated_at || item.createdAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.4</priority>
    </url>
  `).join('')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
