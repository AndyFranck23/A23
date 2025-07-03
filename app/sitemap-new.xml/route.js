import prisma from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

// app/sitemap.xml/route.js
export async function GET() {
  try {
    // Récupère la date du dernier offre ajouté
    const lastOffres = await prisma.offre.findFirst({
      where: {
        updated_at: { not: null },
      },
      orderBy: { updated_at: 'desc' },
      select: { updated_at: true }
    })
    // Récupère la date du dernier category ajouté
    const lastCategory = await prisma.category.findFirst({
      where: {
        updated_at: { not: null },
      },
      orderBy: { updated_at: 'desc' },
      select: { updated_at: true }
    })
    // Récupère la date du dernier produit ajouté
    const lastProduit = await prisma.produit.findFirst({
      where: {
        updated_at: { not: null },
      },
      orderBy: { updated_at: 'desc' },
      select: { updated_at: true }
    })
    // Récupère la date du dernier article ajouté
    const lastBlog = await prisma.article.findFirst({
      where: {
        updated_at: { not: null },
      },
      orderBy: { updated_at: 'desc' },
      select: { updated_at: true }
    })
    // Récupère la date du dernier page ajouté
    const lastPage = await prisma.page.findFirst({
      where: {
        updated_at: { not: null },
      },
      orderBy: { updated_at: 'desc' },
      select: { updated_at: true }
    })

    // Fonction pour convertir une date en ISO ou donner la date actuelle par défaut
    const formatDate = (date) =>
      date ? new Date(date).toISOString() : new Date().toISOString();
    // console.log(formatDate(lastOffres?.updated_at))

    const host = process.env.NEXT_PUBLIC_SITE_URL;
    const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${host}/sitemap-offres.xml</loc>
    <lastmod>${formatDate(lastOffres?.updated_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-categories.xml</loc>
    <lastmod>${formatDate(lastCategory?.updated_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-produit.xml</loc>
    <lastmod>${formatDate(lastProduit?.updated_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-blog.xml</loc>
    <lastmod>${formatDate(lastBlog?.updated_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${host}/sitemap-pages.xml</loc>
    <lastmod>${formatDate(lastPage?.updated_at)}</lastmod>
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
