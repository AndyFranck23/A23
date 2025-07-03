import { slugify } from "@/components/Slug";
import prisma from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));
        const meta = searchParams.get('meta');
        const slug = searchParams.get('slug');
        const menu = searchParams.get('menu');
        const xml = searchParams.get('xml');

        // let sql = `SELECT ${menu ? 'id, nom' : '*'} FROM produits`
        let sql = menu ? {
            select: {
                nom: true,
                id: true
            }
        } : {}

        // let params = []

        if (xml) {
            // sql = `SELECT slug,nom FROM produits`
            sql = {
                select: { nom: true, slug: true, updated_at: true, created_at: true }
            }
            // params = []
        }

        if (id) {
            // sql = `SELECT * FROM produits WHERE id = ?`
            sql = { where: { id: id } }
            // params = [id]
        }
        if (slug) {
            // sql = `SELECT ${meta ? 'status,meta_title,meta_description' : '*'} FROM produits WHERE slug = ?`
            sql = meta ? {
                where: { slug: slug },
                select: { status: true, meta_title: true, meta_description: true }
            } : {}
            // params = [slug]
        }

        // const produits = await queryDB(sql, params)
        const produits = await prisma.produit.findMany(sql)
        return NextResponse.json(produits)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur du serveur" })
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const form = Object.fromEntries(formData);
        await prisma.produit.create({
            data: {
                nom: form.nom,
                slug: slugify(form.nom),
                description: form.description,
                status: JSON.parse(form.status),
                meta_title: form.meta_title,
                meta_description: form.meta_description
            }
        })
        return NextResponse.json({ message: "Produit ajouté avec succès" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));

        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const form = Object.fromEntries(formData);
        await prisma.produit.update({
            where: { id: id },
            data: {
                nom: form.nom,
                slug: slugify(form.nom),
                description: form.description,
                status: JSON.parse(form.status),
                meta_title: form.meta_title,
                meta_description: form.meta_description
            }
        })
        return NextResponse.json({ message: "Produit modifié avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';
        await prisma.produit.delete({
            where: { id: id },
        })
        return NextResponse.json({ message: "Produit supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}