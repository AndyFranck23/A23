// import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import '../globals.css';
import Header from '@/components/Header';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Les 3 Merveilles',
  description: "Découvrez notre sélection exclusive de chocolats artisanaux, d'appareils technologiques de pointe (téléphones, casques audio, écouteurs) et de vêtements tendance pour un style inégalé. Profitez de notre produits de qualité supérieure pour satisfaire toutes vos envies.",
  robots: 'index, follow'
};

export default async function RootLayout({ children }) {
  try {
    const [categoryRes, produitRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category?xml=df`),
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/produit?xml=df`)
    ])
    const [categories, produit] = await Promise.all([
      categoryRes.json(),
      produitRes.json()
    ])

    return (
      <html lang="fr" suppressHydrationWarning>
        <head>
          <meta name="google-site-verification" content="Se1vDnap2z_kfKlGSWxpmWTH56WFkIaVTr2w5ecKVSQ" />
        </head>
        <body>          {/*  className={inter.className} */}
          <Header produits={produit} category={categories} />
          {children}
          <Footer produits={produit} />
        </body>
      </html>
    );
  } catch (error) {
    console.log(error)
  }
}