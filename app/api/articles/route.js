import { slugify } from "@/components/Slug";
import { queryDB } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));
        const slug = searchParams.get('slug');
        const footer = searchParams.get('footer');
        const meta = searchParams.get('meta');

        let sql = `SELECT ${footer ? 'title,slug' : '*'} FROM articles ORDER BY id DESC`
        let params = []

        if (id) {
            sql = `SELECT * FROM articles WHERE id = ?`
            params = [id]
        }
        if (slug) {
            sql = `SELECT ${meta ? 'meta_title,meta_description,status' : '*'} FROM articles WHERE slug = ?`
            params = [slug]
        }
        const articles = await queryDB(sql, params)
        return NextResponse.json(articles)
    } catch (error) {
        return NextResponse.json({ message: "Erreur du serveur" })
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const file = formData.getAll('file')
        const image = formData.getAll('image')
        const form = Object.fromEntries(formData);
        // console.log(form)

        let imagePublicPath = []
        if (file.length > 0) {
            // Vérifier si file est bien un objet File
            file.forEach(element => {
                if (!(element instanceof File)) {
                    return NextResponse.json(
                        { message: "Le fichier est invalide" },
                        { status: 401 }
                    );
                }
            })
            // Définition du dossier d'upload (en dehors de /public/)
            const uploadDir = path.join(process.cwd(), "uploads"); // Stocke dans un dossier hors `public`
            await fs.mkdir(uploadDir, { recursive: true }); // Création du dossier si inexistant

            // Génération d'un nom unique pour l'image
            for (const element of file) {
                const imageName = `${Date.now()}-${element.name.replace(/\s/g, "_")}`;
                const filePath = path.join(uploadDir, imageName);

                // Sauvegarde de l'image
                const buffer = Buffer.from(await element.arrayBuffer());
                await fs.writeFile(filePath, buffer);

                // Construction du chemin pour servir l'image via une API
                imagePublicPath.push(`/api/uploads/${imageName}`);
            }
        }

        const allImages = [...image, ...imagePublicPath]


        const sql = `INSERT INTO articles (
            title,
            slug,
            description,
            content,
            category,
            image,
            meta_title,
            meta_description,
            status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [
            form.title,
            slugify(form.title),
            form.description,
            JSON.parse(form.content),
            form.category,
            allImages,
            form.meta_title || '',
            form.mate_description || '',
            form.status,
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Article ajouté avec succès" })
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
        const file = formData.getAll('file')
        const image = formData.getAll('image')
        const form = Object.fromEntries(formData);

        let imagePublicPath = []
        if (file.length > 0) {
            // Vérifier si file est bien un objet File
            file.forEach(element => {
                if (!(element instanceof File)) {
                    return NextResponse.json(
                        { message: "Le fichier est invalide" },
                        { status: 401 }
                    );
                }
            })
            // Définition du dossier d'upload (en dehors de /public/)
            const uploadDir = path.join(process.cwd(), "uploads"); // Stocke dans un dossier hors `public`
            await fs.mkdir(uploadDir, { recursive: true }); // Création du dossier si inexistant

            // Génération d'un nom unique pour l'image
            for (const element of file) {
                const imageName = `${Date.now()}-${element.name.replace(/\s/g, "_")}`;
                const filePath = path.join(uploadDir, imageName);

                // Sauvegarde de l'image
                const buffer = Buffer.from(await element.arrayBuffer());
                await fs.writeFile(filePath, buffer);

                // Construction du chemin pour servir l'image via une API
                imagePublicPath.push(`/api/uploads/${imageName}`);
            }
        }

        const allImages = [...image, ...imagePublicPath]

        const sql = `UPDATE articles SET
            title = ?,
            slug= ?,
            description = ?,
            content = ?,
            category = ?,
            image = ?,
            meta_title = ?,
            meta_description = ?,
            status = ?
            WHERE id = ?`
        const values = [
            form.title,
            slugify(form.title),
            form.description,
            JSON.parse(form.content),
            form.category,
            allImages,
            form.meta_title || '',
            form.mate_description || '',
            form.status,
            id
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Article modifié avec succès" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        const sql = `DELETE FROM articles WHERE id = ?`
        const values = [id]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Article supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}