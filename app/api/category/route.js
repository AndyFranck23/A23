import { slugify } from "@/components/Slug";
import { queryDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('cat');
        const id = parseInt(searchParams.get('id'));
        const meta = searchParams.get('meta');
        const slug = searchParams.get('slug');

        let sql = `SELECT * FROM categories`
        let params = []

        if (category) {
            sql = `SELECT * FROM categories WHERE category = ?`
            params = [category]
        }
        if (id) {
            sql = `SELECT * FROM categories WHERE id = ?`
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
            category,
            description,
            status,
            meta_title,
            meta_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const values = [
            form.name,
            slugify(form.name),
            form.category,
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
            category = ?,
            description = ?,
            status = ?,
            meta_title = ?,
            meta_description = ?
            WHERE id = ?`
        const values = [
            form.name,
            slugify(form.name),
            form.category,
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