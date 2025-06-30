export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // Pour bloquer certains dossiers, par exemple :
            disallow: ['/admin/', '/login/', '/signup/']
        },
        sitemap: [
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-new.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-offres.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-categories.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-produit.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-static.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-blog.xml`,
            `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap-pages.xml`,
        ]
    }
}
