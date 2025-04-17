import { slugify } from "@/components/Slug";
import { queryDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));
        const meta = searchParams.get('meta');
        const slug = searchParams.get('slug');
        const menu = searchParams.get('menu');
        const xml = searchParams.get('xml');

        let sql = `SELECT ${menu ? 'id, nom' : '*'} FROM produits`
        let params = []

        if (xml) {
            sql = `SELECT slug,nom FROM produits`
            params = []
        }

        if (id) {
            sql = `SELECT * FROM produits WHERE id = ?`
            params = [id]
        }
        if (slug) {
            sql = `SELECT ${meta ? 'status,meta_title,meta_description' : '*'} FROM produits WHERE slug = ?`
            params = [slug]
        }

        const produits = await queryDB(sql, params)
        return NextResponse.json(produits)
    } catch (error) {
        return NextResponse.json({ message: "Erreur du serveur" })
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Utilise formData() pour récupérer les données du formulaire
        const form = Object.fromEntries(formData);
        // console.log(form)
        const sql = `INSERT INTO produits (
            nom,
            slug,
            description,
            status,
            meta_title,
            meta_description
        ) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [
            form.nom,
            slugify(form.nom),
            form.description,
            form.status,
            form.meta_title || '',
            form.mate_description || ''
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Produit ajouté avec succès" })
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
        const sql = `UPDATE produits SET
            nom = ?,
            slug= ?,
            description = ?,
            status = ?,
            meta_title = ?,
            meta_description = ?
            WHERE id = ?`
        const values = [
            form.nom,
            slugify(form.nom),
            form.description,
            form.status,
            form.meta_title || '',
            form.mate_description || '',
            id
        ]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Produit modifié avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        const sql = `DELETE FROM produits WHERE id = ?`
        const values = [id]
        await queryDB(sql, values)
        return NextResponse.json({ message: "Produit supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}