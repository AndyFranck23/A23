import { slugify } from "@/components/Slug";
import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";
import prisma from "@/lib/PrismaClient";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));
        const slug = searchParams.get('slug');
        const footer = searchParams.get('footer');
        const meta = searchParams.get('meta');
        const xml = searchParams.get('xml');

        // let sql = `SELECT ${footer ? 'title,slug' : '*'} FROM pages ORDER BY id DESC`
        let sql = {
            select: footer ? { title: true, slug: true } : undefined,
            orderBy: { id: 'desc' }
        }
        // let params = []

        if (id) {
            // sql = `SELECT * FROM pages WHERE id = ?`
            sql = { where: { id: id } }
            // params = [id]
        }
        if (slug) {
            // sql = `SELECT ${meta ? 'meta_title,meta_description,status' : '*'} FROM pages WHERE slug = ?`
            sql = {
                select: meta ? { metaTitle: true, metaDescription: true, status: true } : undefined,
                where: { slug: slug }
            }
            // params = [slug]
        }
        if (xml) {
            // sql = `SELECT slug FROM pages`
            sql = {}
            // params = []
        }
        // const pages = await queryDB(sql, params)
        const pages = await prisma.page.findMany(sql)
        return NextResponse.json(pages)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur du serveur" })
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const file = formData.get('file')
        const form = Object.fromEntries(formData);
        // console.log(form)

        let imagePublicPath = ''
        if (file) {
            // Vérifier si file est bien un objet File
            if (!(file instanceof File)) {
                return NextResponse.json(
                    { message: "Le fichier est invalide" },
                    { status: 401 }
                );
            }
            // Définition du dossier d'upload (en dehors de /public/)
            const uploadDir = path.join(process.cwd(), "uploads"); // Stocke dans un dossier hors `public`
            await fs.mkdir(uploadDir, { recursive: true }); // Création du dossier si inexistant

            // Génération d'un nom unique pour l'image
            const imageName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
            const filePath = path.join(uploadDir, imageName);

            // Sauvegarde de l'image
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            // Construction du chemin pour servir l'image via une API
            imagePublicPath = `/api/uploads/${imageName}`
        }

        await prisma.page.create({
            data: {
                title: form.title,
                slug: slugify(form.title),
                description: form.description,
                content: form.content,
                image: imagePublicPath == '' ? form.image : imagePublicPath,
                metaTitle: form.meta_title,
                metaDescription: form.meta_description,
                status: JSON.parse(form.status)
            }
        })

        return NextResponse.json({ message: "Page ajouté avec succès" })
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
        const file = formData.get('file')
        const form = Object.fromEntries(formData);

        let imagePublicPath = []
        if (file) {
            // Vérifier si file est bien un objet File
            if (!(file instanceof File)) {
                return NextResponse.json(
                    { message: "Le fichier est invalide" },
                    { status: 401 }
                );
            }
            // Définition du dossier d'upload (en dehors de /public/)
            const uploadDir = path.join(process.cwd(), "uploads"); // Stocke dans un dossier hors `public`
            await fs.mkdir(uploadDir, { recursive: true }); // Création du dossier si inexistant

            // Génération d'un nom unique pour l'image
            const imageName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
            const filePath = path.join(uploadDir, imageName);

            // Sauvegarde de l'image
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.writeFile(filePath, buffer);

            // Construction du chemin pour servir l'image via une API
            imagePublicPath = `/api/uploads/${imageName}`
        }

        await prisma.page.update({
            where: { id: id },
            data: {
                title: form.title,
                slug: slugify(form.title),
                description: form.description,
                content: form.content,
                image: imagePublicPath == '' ? form.image : imagePublicPath,
                metaTitle: form.meta_title,
                metaDescription: form.meta_description,
                status: JSON.parse(form.status)
            }
        })

        return NextResponse.json({ message: "Pages modifié avec succès" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        // const sql = `DELETE FROM pages WHERE id = ?`
        // const values = [id]
        // await queryDB(sql, values)
        await prisma.page.delete({ where: { id: id } })
        return NextResponse.json({ message: "Page supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}