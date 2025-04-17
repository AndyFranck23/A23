import { nombrePage, slugify } from "@/components/Slug";
import { queryDB } from "@/lib/db";
import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const pagination = searchParams.get('page')
        const page = parseInt(pagination) || 1;
        const produit_id = searchParams.get('produit_id');
        const slug = searchParams.get('slug');
        const category_id = searchParams.get('category_id');
        const id = searchParams.get('id');
        const limit = searchParams.get('limit');
        const nbreOffre = searchParams.get('total');
        const admin = searchParams.get('admin');
        const meta = searchParams.get('meta');
        const xml = searchParams.get('xml');
        const offset = (page - 1) * limit;

        const querysql = `SELECT 
                offres.*, 
                produits.slug AS produit,
                categories.slug AS category 
            FROM offres
                LEFT JOIN produits ON offres.produit_id = produits.id
                LEFT JOIN categories ON offres.category_id = categories.id`

        let total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE status = ?`, [1]);

        let sql = `${querysql} WHERE offres.status = ? ORDER BY offres.id DESC `
        let params = [1]

        if (xml) {
            sql = `SELECT 
                offres.slug, 
                produits.slug AS produit,
                categories.slug AS category 
                FROM offres
                LEFT JOIN produits ON offres.produit_id = produits.id
                LEFT JOIN categories ON offres.category_id = categories.id`
            params = []
        }

        // Pour la page / et admin
        if (produit_id) {
            sql = `${querysql}
            ${!isNaN(Number(produit_id)) ? 'WHERE offres.produit_id = ?' : 'WHERE produits.slug = ?'}
            ${admin ? '' : 'AND offres.status = ?'} 
            ORDER BY offres.id DESC 
            ${limit ? 'LIMIT ?' : ''}`
            params = admin ? limit ? [produit_id, limit] : [produit_id] : limit ? [produit_id, 1, limit] : [produit_id, 1]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE produit_id = ? AND status = ?`, [produit_id, 1]);
        }

        // Pour le update dans l'admin
        if (id) {
            sql = `${querysql} WHERE offres.id = ? ORDER BY offres.id DESC`
            params = [id]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE id = ?`, [id]);
        }

        // Pour la page url: /chocolats
        if (limit && pagination && produit_id) {
            sql = `${querysql} ${!isNaN(Number(produit_id)) ? 'WHERE offres.produit_id = ?' : 'WHERE produits.slug = ?'} AND offres.status = ? ORDER BY offres.id DESC LIMIT ? OFFSET ?`
            params = [produit_id, 1, limit, offset]
            total = await queryDB(`SELECT COUNT(*) AS total,
                produits.nom
                FROM offres 
                LEFT JOIN produits ON offres.produit_id = produits.id
                ${!isNaN(Number(produit_id)) ? 'WHERE offres.produit_id = ?' : 'WHERE produits.slug = ?'}
                AND offres.status = ?`, [produit_id, 1]);
        }

        // Pour la page url: chocolats/bonbonOU...
        if (limit && pagination && produit_id && category_id) {
            sql = `${querysql} 
            ${!isNaN(Number(produit_id)) ? 'WHERE offres.produit_id = ?' : 'WHERE produits.slug = ?'} 
            ${!isNaN(Number(category_id)) ? 'AND offres.category_id = ?' : 'AND categories.slug = ?'} 
            AND offres.status = ? ORDER BY offres.id DESC LIMIT ? OFFSET ?`
            params = [produit_id, category_id, 1, limit, offset]
            total = await queryDB(`SELECT COUNT(*) AS total, 
                produits.nom,
                categories.nom
                FROM offres 
                LEFT JOIN produits ON offres.produit_id = produits.id
                LEFT JOIN categories ON offres.category_id = categories.id
                ${!isNaN(Number(produit_id)) ? 'WHERE offres.produit_id = ?' : 'WHERE produits.slug = ?'} 
                ${!isNaN(Number(category_id)) ? 'AND offres.category_id = ?' : 'AND categories.slug = ?'}
                AND offres.status = ?`,
                [produit_id, category_id, 1]);
        }

        // Pour la page de fiche-produit
        if (slug) {
            sql = `SELECT ${meta ? 'offres.status,offres.meta_title,offres.meta_description,' : 'offres.*,'}
            produits.nom AS produit,
            categories.nom AS category 
            FROM offres
            LEFT JOIN produits ON offres.produit_id = produits.id
            LEFT JOIN categories ON offres.category_id = categories.id 
            WHERE offres.slug = ? AND offres.status = ?`
            params = [slug, 1]
            total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE slug = ? AND status = ?`, [slug, 1]);
        }

        // Pour les alternatives
        if (category_id) {
            sql = `${querysql}
            ${!isNaN(Number(category_id)) ? 'WHERE offres.category_id = ?' : 'WHERE categories.slug = ?'}
            AND offres.status = ? ORDER BY offres.id DESC ${limit ? 'LIMIT ?' : ''}`
            params = limit ? [category_id, 1, limit] : [category_id, 1]
            total = await queryDB(`SELECT COUNT(*) AS total,
                categories.nom AS category
                FROM offres 
                LEFT JOIN categories ON offres.category_id = categories.id
                ${!isNaN(Number(category_id)) ? 'WHERE offres.category_id = ?' : 'WHERE categories.slug = ?'} 
                AND offres.status = ? ORDER BY offres.id DESC`, [category_id, 1]);
        }

        // Pour les nombres d'offres dans le page / pour chaque produits
        if (nbreOffre) {
            const produits = await queryDB(`SELECT id FROM produits`)
            let tab = []
            for (let i = 0; i < produits.length; i++) {
                let [test] = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE produit_id = ? AND status = ? ORDER BY id DESC`, [produits[i].id, 1]);
                tab.push(test)
            }
            return NextResponse.json(tab)
        }

        const offres = await queryDB(sql, params)
        return NextResponse.json({
            offres, pagination: {
                pageCount: (total[0].total % nombrePage != 0) ? parseInt(total[0].total / nombrePage) + 1 : parseInt(total[0].total / nombrePage),
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
            const uploadDir = path.join(process.cwd(), "/uploads"); // Stocke dans un dossier hors `public`
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
            produit_id,
            category_id,
            name,
            slug,
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
            form.produit_id,
            form.category_id,
            form.name,
            slugify(form.name),
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
            produit_id = ?,
            category_id = ?,
            name = ?,
            slug = ?,
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
            form.produit_id,
            form.category_id,
            form.name,
            slugify(form.name),
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