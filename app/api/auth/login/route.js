import prisma from '@/lib/PrismaClient';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// export async function GET() {
//     try {
//         const users = await prisma.admin.findFirst({
//             where: { email: "andy@gmail.com" }
//         })
//         return NextResponse.json(users)
//     } catch (error) {
//         console.log(error)
//     }
// }

export async function POST(request) {
    try {
        const session = 5; // temps de session en heure
        const { email, password } = await request.json();

        // Récupération utilisateur
        const users = await prisma.admin.findFirst({
            where: {
                email: email
            }
        })
        // const users = await queryDB('SELECT * FROM users WHERE email = ?', [email]);

        if (!users) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Vérification mot de passe
        const user = users;

        const isValid = await compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Génération JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: session + 'h' });
        const cookiesT = await cookies()
        cookiesT.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600 * session
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}