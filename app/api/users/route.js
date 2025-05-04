// app/api/users/route.js
import prisma from '@/lib/PrismaClient'
import { NextResponse } from 'next/server'

// GET /api/users -> Lire tous les utilisateurs
export async function GET() {
    const offre = await prisma.offre.findFirst({
        where: {
            produit: {
                nom: "Chocolats"
            },
            // categorie: {
            //     nom: "tablette"
            // }
        },
        include: {
            produit: {
                select: {
                    nom: true
                }
            },
            // categorie: {
            //     select: {
            //         nom: true
            //     }
            // }
        },
        // Inclure tout les donnée du produit concerné
        // include: {
        //     produit: true
        // }
    });
    return NextResponse.json(offre)
}

// const offres = await prisma.offre.findMany({
//     orderBy: {
//         id: 'desc',
//     },
//     skip: 10, // OFFSET
//     take: 10, // LIMIT
// })


// const total = await prisma.offres.count({
//     where: {
//       slug: "votre-slug",
//       status: 1,
//     },
//   });
//   :contentReference[oaicite:8]{index=8}
//   console.log(`Total des offres correspondantes : ${total}`);

// const offre = await prisma.offre.findUnique({
//     where: {
//         id: 5,
//     },
//     include: {
//         produit: {
//             select: {
//                 nom: true,
//             },
//         },
//         categorie: {
//             select: {
//                 nom: true,
//             },
//         },
//     },
// });



// POST /api/users -> Créer un nouvel utilisateur
export async function POST(req) {
    const data = await req.json()

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
        },
    })

    return NextResponse.json(user)
}

// PUT /api/users -> Modifier un utilisateur
export async function PUT(req) {
    const data = await req.json()

    const user = await prisma.user.update({
        where: { id: data.id },
        data: {
            name: data.name,
            email: data.email,
        },
    })

    return NextResponse.json(user)
}

// DELETE /api/users?id=1 -> Supprimer un utilisateur
export async function DELETE(req) {
    const { searchParams } = new URL(req.url)
    const id = parseInt(searchParams.get('id'))

    await prisma.user.delete({
        where: { id: id },
    })

    return NextResponse.json({ message: 'User deleted' })
}
