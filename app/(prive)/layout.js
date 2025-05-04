// import { Inter } from 'next/font/google';
import '../globals.css';
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers';
import MyContextUser from '@/context/MyContextUser';
import Header from '@/components/Admin/Header';
import { Menu } from '@/components/Admin/Menu';
import { redirect } from 'next/navigation';
import prisma from '@/lib/PrismaClient';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'TechAffiliate Blog',
    description: 'Découvrez les meilleurs produits tech et nos conseils d\'experts',
    robots: 'noindex, nofollow, noarchive'
};

export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await queryDB('SELECT * FROM users WHERE id = ?', [decoded.userId]);
        const user = await prisma.admin.findMany({ where: { id: decoded.userId } })

        return (
            <html lang="fr" suppressHydrationWarning>
                <body className='dark:bg-gray-700'>
                    <MyContextUser userData={user[0]}>
                        <Header />
                        <Menu className={"hidden md:block"} />
                        <div className='md:pl-[180px]'>
                            {children}
                        </div>
                    </MyContextUser>
                </body>
            </html>
        );
    } catch (error) {
        console.error(error);
        redirect('/login');
    }
}