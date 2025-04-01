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
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?footer=true`, { cache: "no-store" })
    const data = await response.json()

    return (
      <html lang="fr" suppressHydrationWarning>
        <body>          {/*  className={inter.className} */}
          <Header />
          {children}
          <Footer articles={data} />
        </body>
      </html>
    );
  } catch (error) {
    console.log(error)
  }
}