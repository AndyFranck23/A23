// app/sitemap.xml/route.js
export async function GET() {
  const host = process.env.NEXT_PUBLIC_SITE_URL;
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${host}/sitemap-offres.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-categories.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-produit.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-pages.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-static.xml</loc>
  </sitemap>
</sitemapindex>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
