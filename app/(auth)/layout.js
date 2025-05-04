// import { Inter } from 'next/font/google';
import '../globals.css';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'TechAffiliate Blog',
    description: 'Découvrez les meilleurs produits tech et nos conseils d\'experts',
    robots: 'noindex, nofollow, noarchive'
};

export default function RootLayout({ children }) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body>
                {children}
            </body>
        </html>
    );
}