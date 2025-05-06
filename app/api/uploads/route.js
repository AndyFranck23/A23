import path from 'path';
import fs from 'fs/promises';
import fs2 from 'fs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { data: files, error } = await supabase
            .storage
            .from('images')
            .list('', {
                limit: 100,        // nombre max de fichiers
                offset: 0,         // pagination
                sortBy: { column: 'name', order: 'asc' }
            })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        const urls = files.map(file => {
            const { publicUrl } = supabase
                .storage
                .from('images')
                .getPublicUrl(file.name).data
            return { name: file.name, url: publicUrl }
        })

        return NextResponse.json({ images: urls }, { status: 200 });
    } catch (error) {
        console.error("🔥 Erreur serveur :", error);
        return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.getAll("file");

        if (file.length == 0) {
            return NextResponse.json({ message: "Aucun fichier fourni" }, { status: 400 });
        }

        // Générer un nom de fichier unique
        let fileTiny = ''
        for (const ele of file) {
            const fileExt = ele.name.split(".").pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `${fileName}`
            fileTiny = `${fileName}`
            let { error } = await supabase.storage
                .from("images")
                .upload(filePath, ele)

            if (error) {
                throw error
            }
        }

        const { publicUrl } = supabase
            .storage
            .from('images')
            .getPublicUrl(fileTiny).data

        return NextResponse.json({
            message: "Image uploadée avec succès",
            location: `${publicUrl}`,
            status: 200
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error.message || "Erreur lors de l'upload de l'image" },
            { status: 500 }
        );
    }
}
