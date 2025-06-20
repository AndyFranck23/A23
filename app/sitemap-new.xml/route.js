import prisma from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

// app/sitemap.xml/route.js
export async function GET() {
  try {
    // Récupère la date du dernier offre ajouté
    const lastOffres = await prisma.offre.findFirst({
      orderBy: { created_at: 'desc' },
      select: { created_at: true }
    })
    // Récupère la date du dernier category ajouté
    const lastCategory = await prisma.category.findFirst({
      orderBy: { created_at: 'desc' },
      select: { created_at: true }
    })
    // Récupère la date du dernier produit ajouté
    const lastProduit = await prisma.produit.findFirst({
      orderBy: { created_at: 'desc' },
      select: { created_at: true }
    })
    // Récupère la date du dernier article ajouté
    const lastBlog = await prisma.article.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true }
    })
    // Récupère la date du dernier page ajouté
    const lastPage = await prisma.page.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true }
    })

    // Fonction pour convertir une date en ISO ou donner la date actuelle par défaut
    const formatDate = (date) =>
      date ? new Date(date).toISOString() : new Date().toISOString();
    console.log(formatDate(lastOffres?.created_at))

    const host = process.env.NEXT_PUBLIC_SITE_URL;
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${host}/sitemap-offres.xml</loc>
    <lastmod>${formatDate(lastOffres?.created_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-categories.xml</loc>
    <lastmod>${formatDate(lastCategory?.created_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-produit.xml</loc>
    <lastmod>${formatDate(lastProduit?.created_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-blog.xml</loc>
    <lastmod>${formatDate(lastBlog?.createdAt)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-pages.xml</loc>
    <lastmod>${formatDate(lastPage?.createdAt)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-static.xml</loc>
    <lastmod>2025-06-13T14:24:23.901Z</lastmod>
  </sitemap>
</sitemapindex>`;
    return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Erreur du serveur" })
  }
}
