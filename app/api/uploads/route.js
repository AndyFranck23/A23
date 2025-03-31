import path from 'path';
import fs from 'fs/promises';
import fs2 from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const uploadsDir = path.join(process.cwd(), "uploads");

        if (!fs2.existsSync(uploadsDir)) {
            console.error("❌ Le dossier 'uploads' n'existe pas !");
            return NextResponse.json({ error: "Dossier 'uploads' non trouvé" }, { status: 500 });
        }

        const files = fs2.readdirSync(uploadsDir); // Utiliser la version synchrone
        console.log("✅ Images trouvées :", files);

        return NextResponse.json({ images: files }, { status: 200 });
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

        // Définir le dossier de destination (créé s'il n'existe pas)
        const uploadDir = path.join(process.cwd(), "uploads");
        await fs.mkdir(uploadDir, { recursive: true });

        // Générer un nom de fichier unique
        let fileName = ''
        for (const ele of file) {
            fileName = `${Date.now()}-${ele.name}`;
            const filePath = path.join(uploadDir, fileName);

            // Convertir le fichier en buffer et l'écrire sur le disque
            const buffer = Buffer.from(await ele.arrayBuffer());
            await fs.writeFile(filePath, buffer);
        }

        return NextResponse.json(
            { location: `/api/uploads/${fileName}` },
            { message: "Image uploadée avec succès" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Erreur lors de l'upload de l'image" },
            { status: 500 }
        );
    }
}
