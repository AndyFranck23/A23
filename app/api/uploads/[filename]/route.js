import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { filename } = await params; // Récupère le nom du fichier depuis l'URL
    const filePath = path.join(process.cwd(), "uploads", filename); // Chemin du fichier

    try {
        // Lire le fichier
        const file = await fs.readFile(filePath);

        // Détecter le type MIME
        const ext = path.extname(filename).toLowerCase();
        let contentType = "image/png"; // Type par défaut
        if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
        else if (ext === ".gif") contentType = "image/gif";
        else if (ext === ".webp") contentType = "image/webp";

        // Retourner l'image avec le bon Content-Type
        return new Response(file, {
            headers: { "Content-Type": contentType },
        });

    } catch (error) {
        return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
    }
}

export async function DELETE(request, { params }) {
    // On récupère le nom de l'image depuis les paramètres d'URL
    const { filename } = await params;
    const filePath = path.join(process.cwd(), 'uploads', filename);

    try {
        // Supprime le fichier
        await fs.unlink(filePath);
        return NextResponse.json({ message: 'Image supprimée avec succès' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Erreur lors de la suppression de l\'image' }, { status: 500 });
    }
}
