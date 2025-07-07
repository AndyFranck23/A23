// import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import '../globals.css';
import Header from '@/components/Header';
import { safeFetch } from '@/components/composants';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Les 3 Merveilles',
  description: "Découvrez notre sélection exclusive de chocolats artisanaux, d'appareils technologiques de pointe (téléphones, casques audio, écouteurs) et de vêtements tendance pour un style inégalé. Profitez de notre produits de qualité supérieure pour satisfaire toutes vos envies.",
  robots: 'index, follow',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/`,
  },
};

export default async function RootLayout({ children }) {
  const produit = [
    { nom: 'Chocolats', slug: 'chocolats' },
    { nom: 'Technologie', slug: 'technologie' },
    { nom: 'La mode', slug: 'la-mode' },
  ]
  const categories = await safeFetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?xml=df`)

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Se1vDnap2z_kfKlGSWxpmWTH56WFkIaVTr2w5ecKVSQ" />
        <link href="../globals.css" rel="stylesheet" />
      </head>
      <body>          {/*  className={inter.className} */}
        <Header produits={produit} category={categories} />
        {children}
        <Footer produits={produit} />
      </body>
    </html>
  );
}
