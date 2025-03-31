import { nombrePage, slugify } from "@/components/Slug";
import { queryDB } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const category = searchParams.get('cat');
        const slug = searchParams.get('slug');
        const type = searchParams.get('type');
        const id = searchParams.get('id');
        const limit = searchParams.get('limit');
        const nbreOffre = searchParams.get('total');
        const admin = searchParams.get('admin');
        const meta = searchParams.get('meta');
        const offset = (page - 1) * limit;

        let total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE status = ?`, [1]);

        let sql = `SELECT * FROM offres WHERE status = ? ORDER BY id DESC `
        let params = [1]

        if (limit) {
            sql = `SELECT * FROM offres WHERE status = ? AND category = ? ORDER BY id DESC LIMIT ?`
            params = [1, category, limit]
        }
        if (category) {
            sql = `SELECT * FROM offres WHERE category = ? ${admin ? '' : 'AND status = ?'} ORDER BY id DESC`
            params = admin ? [category] : [category, 1]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE category = ? AND status = ?`, [category, 1]);
        }
        if (id) {
            sql = `SELECT * FROM offres WHERE id = ? ORDER BY id DESC`
            params = [id]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE id = ?`, [id]);
        }
        if (limit && page && category) {
            sql = `SELECT * FROM offres WHERE category = ? AND status = ? ORDER BY id DESC LIMIT ? OFFSET ?`
            params = [category, 1, limit, offset]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE category = ? AND status = ?`, [category, 1]);
        }
        if (limit && page && category && type) {
            sql = `SELECT * FROM offres WHERE category = ? AND subcategory = ? AND status = ? ORDER BY id DESC LIMIT ? OFFSET ?`
            params = [category, type, 1, limit, offset]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE category = ? AND subcategory = ? AND status = ?`, [category, type, 1]);
        }
        if (slug) {
            sql = `SELECT ${meta ? 'status,meta_title,meta_description' : '*'} FROM offres WHERE slug = ? AND status = ?`
            params = [slug, 1]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE slug = ? AND status = ?`, [slug, 1]);
        }
        if (type) {
            sql = `SELECT * FROM offres WHERE subcategory = ? AND status = ? ORDER BY id DESC ${limit ? 'LIMIT ?' : ''}`
            params = limit ? [type, 1, limit] : [type, 1]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE subcategory = ? AND status = ? ORDER BY id DESC`, [type, 1]);
        }
        if (nbreOffre) {
            const [nbreChoco] = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE category = ? AND status = ? ORDER BY id DESC`, ['chocolats', 1]);
            const [nbreTech] = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE category = ? AND status = ? ORDER BY id DESC`, ['technologie', 1]);
            const [nbreMode] = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE category = ? AND status = ? ORDER BY id DESC`, ['mode', 1]);
            return NextResponse.json([nbreChoco, nbreTech, nbreMode])
        }

        const offres = await queryDB(sql, params)
        return NextResponse.json({
            offres, pagination: {
                pageCount: (total[0].total / nombrePage) % 2 != 0 ? parseInt(total[0].total / nombrePage) + 1 : parseInt(total[0].total / nombrePage),
                // currentPage: 1,
                total: total[0].total
            }
        })
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
            // console.log(imagePublicPath)
        }
        image.forEach(element => {
            imagePublicPath.push(element)
        });

        const sql = `INSERT INTO offres (
            name,
            slug,
            category,
            subcategory,
            price,
            originalPrice,
            remise, 
            program,
            image,
            description,
            poids,
            features,
            affiliateLink,
            status,
            meta_title,
            meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [
            form.name,
            slugify(form.name),
            form.category,
            form.subcategory,
            form.price,
            form.originalPrice,
            form.remise,
            form.program,
            imagePublicPath,
            form.description,
            form.poids,
            form.features,
            form.affiliateLink,
            form.status,
            form.meta_title,
            form.meta_description
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Offre ajouté avec succès" })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

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

        const sql = `UPDATE offres SET
            name = ?,
            slug = ?,
            category = ?,
            subcategory = ?,
            price = ?,
            originalPrice = ?,
            remise = ?, 
            program = ?,
            image = ?,
            description = ?,
            poids = ?,
            features = ?,
            affiliateLink = ?,
            status = ?,
            meta_title = ?,
            meta_description = ?
        WHERE id = ?`
        const values = [
            form.name,
            slugify(form.name),
            form.category,
            form.subcategory,
            form.price,
            form.originalPrice,
            form.remise,
            form.program,
            allImages,
            form.description,
            form.poids,
            form.features,
            form.affiliateLink,
            form.status,
            form.meta_title,
            form.meta_description,
            id
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Offre modifié avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        const sql = `DELETE FROM offres WHERE id = ?`
        const values = [id]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Offre supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}