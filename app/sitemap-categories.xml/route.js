import { safeFetch } from "@/components/composants";

// app/sitemaps-products.xml/route.js
export async function GET() {
  const host = process.env.NEXT_PUBLIC_SITE_URL;
  const categories = await safeFetch(`${host}/api/category?xml=jj`)
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categories.map(item => `
    <url>
      <loc>${host}/categorie/${item.slug}</loc>
      <lastmod>${new Date(item.updated_at || item.created_at).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
  `).join('')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
