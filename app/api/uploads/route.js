import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file || typeof file === 'string') {
            return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
        }

        // Définir le dossier de destination (créé s'il n'existe pas)
        const uploadDir = path.join(process.cwd(), "uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        // Générer un nom de fichier unique
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        // Convertir le fichier en buffer et l'écrire sur le disque
        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        return NextResponse.json(
            { message: "Image uploadée avec succès", filename: fileName },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Erreur lors de l'upload de l'image" },
            { status: 500 }
        );
    }
}
