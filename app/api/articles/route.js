import { slugify } from "@/components/Slug";
import { NextResponse } from "next/server";
import fs from 'fs/promises'
import path from "path";
import prisma from "@/lib/PrismaClient";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id'));
        const slug = searchParams.get('slug');
        const footer = searchParams.get('footer');
        const meta = searchParams.get('meta');
        const xml = searchParams.get('xml');

        let sql = {
            select: footer ? { title: true, slug: true } : undefined,
            orderBy: { id: 'desc' }
        }

        if (id) {
            sql = { where: { id: id } }
        }
        if (slug) {
            sql = {
                where: { slug: slug },
                select: meta ? { metaTitle: true, metaDescription: true, status: true } : undefined,
            }
        }
        if (xml) {
            sql = {
                select: { title: true, slug: true, createdAt: true, updated_at: true }
            }
        }
        const articles = await prisma.article.findMany(sql)

        return NextResponse.json(articles)
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
            const fileExt = file.name.split(".").pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `${fileName}`
            let { error } = await supabase.storage
                .from("images")
                .upload(filePath, file)

            if (error) {
                throw error
            }

            const { data: url } = await supabase.storage
                .from("images")
                .getPublicUrl(filePath)

            // Construction du chemin pour servir l'image via une API
            imagePublicPath = `${url.publicUrl}`
        }

        await prisma.article.create({
            data: {
                title: form.title,
                slug: slugify(form.title),
                description: form.description,
                content: form.content,
                category: form.category,
                image: imagePublicPath == '' ? form.image : imagePublicPath,
                metaTitle: form.meta_title,
                metaDescription: form.meta_description,
                status: JSON.parse(form.status)
            }
        })

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
        const file = formData.get('file')
        const form = Object.fromEntries(formData);

        let imagePublicPath = []
        if (file) {
            const fileExt = file.name.split(".").pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `${fileName}`
            let { error } = await supabase.storage
                .from("images")
                .upload(filePath, file)

            if (error) {
                throw error
            }

            const { data: url } = await supabase.storage
                .from("images")
                .getPublicUrl(filePath)

            // Construction du chemin pour servir l'image via une API
            imagePublicPath = `${url.publicUrl}`
        }
        await prisma.article.update({
            where: { id: id },
            data: {
                title: form.title,
                slug: slugify(form.title),
                description: form.description,
                content: form.content,
                category: form.category,
                image: imagePublicPath == '' ? form.image : imagePublicPath,
                metaTitle: form.meta_title,
                metaDescription: form.meta_description,
                status: JSON.parse(form.status)
            }
        })

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

        // const sql = `DELETE FROM articles WHERE id = ?`
        // const values = [id]
        // await queryDB(sql, values)
        await prisma.article.delete({ where: { id: id } })

        return NextResponse.json({ message: "Article supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}