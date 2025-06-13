// app/sitemaps-pages.xml/route.js
export async function GET() {
    const host = process.env.NEXT_PUBLIC_SITE_URL;
    const pages = ['', 'about'];
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(p => `
    <url>
      <loc>${host}/${p}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.3</priority>
    </url>
  `).join('')}
</urlset>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
