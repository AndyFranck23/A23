import { slugify } from "@/components/Slug";
import prisma from "@/lib/PrismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const produit_id = searchParams.get('produit_id');
        const id = parseInt(searchParams.get('id'));
        const meta = searchParams.get('meta');
        const slug = searchParams.get('slug');
        const xml = searchParams.get('xml');

        // const querysql = `SELECT 
        // categories.*, 
        // produits.slug AS category 
        // FROM categories
        // LEFT JOIN produits ON categories.produit_id = produits.id`
        const querysql = {
            include: { produit: { select: { slug: true } } }
        }

        // let sql = `${querysql}`
        let sql = querysql
        // let params = []

        if (xml) {
            // sql = `SELECT 
            //     categories.slug, 
            //     categories.nom, 
            //     produits.slug AS category 
            //     FROM categories
            //     LEFT JOIN produits ON categories.produit_id = produits.id`
            // params = []
            sql = {
                select: {
                    slug: true,
                    nom: true,
                    created_at: true,
                    updated_at: true,
                    produit: { select: { slug: true } }
                }
            }
        }

        if (produit_id) {
            // sql = `${querysql} ${!isNaN(Number(produit_id)) ? 'WHERE categories.produit_id = ?' : 'WHERE produits.slug = ?'}`
            // params = [produit_id]
            let where = !isNaN(Number(produit_id)) ? { produit_id: JSON.parse(produit_id) } : { produit: { slug: produit_id } }
            sql = {
                where,
                include: { produit: { select: { slug: true, nom: true, description: true } } },
            }
        }
        if (id) {
            // sql = `${querysql} WHERE categories.id = ?`
            // params = [id]
            sql = {
                where: { id: id },
                include: { produit: { select: { slug: true } } }
            }
        }
        if (slug) {
            // sql = `SELECT ${meta ? 'status,meta_title,meta_description' : '*'} FROM categories WHERE slug = ?`
            // params = [slug]
            sql = meta ? {
                where: { slug: slug },
                select: {
                    status: true,
                    meta_title: true,
                    meta_description: true
                }
            } : {
                where: { slug: slug },
                include: { produit: { select: { slug: true, nom: true } } }
            }
        }

        // const categories = await queryDB(sql, params)
        const categories = await prisma.category.findMany(sql)

        return NextResponse.json(categories)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur du serveur" })
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const form = Object.fromEntries(formData);
        // console.log(form)
        // const sql = `INSERT INTO categories (
        //     nom,
        //     slug,
        //     produit_id,
        //     description,
        //     status,
        //     meta_title,
        //     meta_description
        // ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        // const values = [
        //     form.name,
        //     slugify(form.name),
        //     form.produit_id,
        //     form.description,
        //     form.status,
        //     form.meta_title || '',
        //     form.mate_description || ''
        // ]
        // await queryDB(sql, values)

        await prisma.category.create({
            data: {
                produit_id: JSON.parse(form.produit_id),
                nom: form.name,
                slug: slugify(form.name),
                description: form.description,
                status: JSON.parse(form.status),
                meta_title: form.meta_title,
                meta_description: form.meta_description
            }
        })
        return NextResponse.json({ message: "Catégorie ajouté avec succès" })
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
        // const sql = `UPDATE categories SET
        //     nom = ?,
        //     slug= ?,
        //     produit_id = ?,
        //     description = ?,
        //     status = ?,
        //     meta_title = ?,
        //     meta_description = ?
        //     WHERE id = ?`
        // const values = [
        //     form.name,
        //     slugify(form.name),
        //     form.produit_id,
        //     form.description,
        //     form.status,
        //     form.meta_title || '',
        //     form.mate_description || '',
        //     id
        // ]
        // await queryDB(sql, values)

        await prisma.category.update({
            where: { id: id },
            data: {
                produit_id: JSON.parse(form.produit_id),
                nom: form.name,
                slug: slugify(form.name),
                description: form.description,
                status: JSON.parse(form.status),
                meta_title: form.meta_title,
                meta_description: form.meta_description
            }
        })
        return NextResponse.json({ message: "Catégorie modifié avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        // const sql = `DELETE FROM categories WHERE id = ?`
        // const values = [id]
        // await queryDB(sql, values)
        await prisma.category.delete({
            where: { id: id },
        })
        return NextResponse.json({ message: "Catégorie supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}