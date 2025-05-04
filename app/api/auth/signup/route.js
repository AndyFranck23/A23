import prisma from '@/lib/PrismaClient';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { nom, email, password } = await request.json();

        // Vérification existance utilisateur
        const users = await prisma.admin.findFirst({
            where: {
                email: email
            }
        })
        // const users = await queryDB('SELECT email FROM users WHERE email = ?', [email]);
        if (users) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash du mot de passe
        const hashedPassword = await hash(password, 10);
        await prisma.admin.create({
            data: {
                nom: nom,
                email: email,
                password: hashedPassword
            }
        })
        // await queryDB('INSERT INTO users (nom, email, password) VALUES (?, ?, ?)', [nom, email, hashedPassword]);

        return NextResponse.json({ error: "User created" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}