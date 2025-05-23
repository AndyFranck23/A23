import { slugify } from "@/components/Slug";
import { queryDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const produit_id = searchParams.get('produit_id');
        const id = parseInt(searchParams.get('id'));
        const meta = searchParams.get('meta');
        const slug = searchParams.get('slug');
        const xml = searchParams.get('xml');

        const querysql = `SELECT 
        categories.*, 
        produits.slug AS category 
        FROM categories
        LEFT JOIN produits ON categories.produit_id = produits.id
        `

        let sql = `${querysql}`
        let params = []

        if (xml) {
            sql = `SELECT 
                categories.slug, 
                categories.nom, 
                produits.slug AS category 
                FROM categories
                LEFT JOIN produits ON categories.produit_id = produits.id`
            params = []
        }

        if (produit_id) {
            sql = `${querysql} ${!isNaN(Number(produit_id)) ? 'WHERE categories.produit_id = ?' : 'WHERE produits.slug = ?'}`
            params = [produit_id]
        }
        if (id) {
            sql = `${querysql} WHERE categories.id = ?`
            params = [id]
        }
        if (slug) {
            sql = `SELECT ${meta ? 'status,meta_title,meta_description' : '*'} FROM categories WHERE slug = ?`
            params = [slug]
        }

        const categories = await queryDB(sql, params)
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ message: "Erreur du serveur" })
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const form = Object.fromEntries(formData);
        // console.log(form)
        const sql = `INSERT INTO categories (
            nom,
            slug,
            produit_id,
            description,
            status,
            meta_title,
            meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const values = [
            form.name,
            slugify(form.name),
            form.produit_id,
            form.description,
            form.status,
            form.meta_title || '',
            form.mate_description || ''
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Catégorie ajouté avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}

export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));

        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const form = Object.fromEntries(formData);
        const sql = `UPDATE categories SET
            nom = ?,
            slug= ?,
            produit_id = ?,
            description = ?,
            status = ?,
            meta_title = ?,
            meta_description = ?
            WHERE id = ?`
        const values = [
            form.name,
            slugify(form.name),
            form.produit_id,
            form.description,
            form.status,
            form.meta_title || '',
            form.mate_description || '',
            id
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Catégorie modifié avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        const sql = `DELETE FROM categories WHERE id = ?`
        const values = [id]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Catégorie supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}