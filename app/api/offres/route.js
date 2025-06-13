import { nombrePage, slugify } from "@/components/Slug";
import { NextResponse } from "next/server";
import prisma from "@/lib/PrismaClient";
import { supabase } from "@/lib/supabase";

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
        const nbreOffre2 = searchParams.get('total2');
        const admin = searchParams.get('admin');
        const meta = searchParams.get('meta');
        const xml = searchParams.get('xml');
        const offset = (page - 1) * limit;

        let total = {
            where: { status: true }
        }

        let sql = {
            orderBy: { id: 'desc' },
            where: { status: admin ? undefined : true },
            include: {
                produit: { select: { slug: true } },
                categorie: { select: { slug: true } }
            }
        }

        if (xml) {
            sql = {
                select: {
                    slug: true,
                    created_at: true,
                    produit: { select: { slug: true } },
                    categorie: { select: { slug: true } }
                }
            }
        }

        // Pour la page / et admin
        if (produit_id) {
            const produits = await prisma.produit.findMany({ select: { id: true, slug: true, nom: true } })
            let where = !isNaN(Number(produit_id)) ?
                {
                    produit_id: admin ?
                        JSON.parse(produit_id) :
                        { in: produits.map(item => item.id) },
                    status: admin ? undefined : true
                } :
                {
                    produit: { slug: produit_id },
                    status: admin ? undefined : true
                }
            sql = {
                orderBy: { id: 'desc' },
                where,
                include: {
                    produit: { select: { slug: true, nom: true } },
                    categorie: { select: { slug: true, nom: true } }
                },
                take: limit ? JSON.parse(limit) : undefined
                // ...(limit ? { take: JSON.parse(limit) } : {})
            }
            total = {
                where,
            }
        }

        // Pour le update dans l'admin
        if (id) {
            sql = {
                orderBy: { id: 'desc' },
                where: { id: JSON.parse(id) },
                include: {
                    produit: { select: { slug: true, nom: true } },
                    categorie: { select: { slug: true, nom: true } }
                }
            }
            total = {
                where: { id: JSON.parse(id) }
            }
        }

        // Pour la page url: /chocolats
        if (limit && pagination && produit_id) {
            let where = !isNaN(Number(produit_id)) ? { produit_id: JSON.parse(produit_id), status: true } : { produit: { slug: produit_id }, status: true }
            sql = {
                where,
                orderBy: { id: 'desc' },
                include: {
                    produit: { select: { slug: true, nom: true } },
                    categorie: { select: { slug: true, nom: true } }
                },
                skip: offset, // OFFSET
                take: JSON.parse(limit), // LIMIT
            }
            total = {
                where,
            }
        }

        // Pour la page url: chocolats/bonbonOU...
        if (limit && pagination && category_id) {
            sql = {
                where: { categorie: { slug: category_id }, status: true },
                orderBy: { id: 'desc' },
                include: {
                    produit: { select: { slug: true, nom: true } },
                    categorie: { select: { slug: true, nom: true } }
                },
                skip: offset, // OFFSET
                take: JSON.parse(limit), // LIMIT
            }
            total = {
                where: { categorie: { slug: category_id }, status: true }
            }
        }

        // Pour la page de fiche-produit
        if (slug) {
            // sql = `SELECT ${meta ? 'offres.status,offres.meta_title,offres.meta_description,' : 'offres.*,'}
            // produits.nom AS produit,
            // categories.nom AS category 
            // FROM offres
            // LEFT JOIN produits ON offres.produit_id = produits.id
            // LEFT JOIN categories ON offres.category_id = categories.id 
            // WHERE offres.slug = ? AND offres.status = ?`
            sql = {
                where: { slug: slug },
                select: meta ? {
                    status: true,
                    meta_title: true,
                    meta_description: true,
                    produit: { select: { nom: true, slug: true } },
                    categorie: { select: { nom: true, slug: true } }
                } : undefined,
                include: meta ? undefined : {
                    produit: { select: { nom: true, slug: true } },
                    categorie: { select: { nom: true, slug: true } }
                }
            }
            // params = [slug, 1]
            // total = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE slug = ? AND status = ?`, [slug, 1]);
            total = {
                where: { slug: slug, status: true }
            }
        }

        // Pour les alternatives
        if (category_id) {
            // sql = `${querysql}
            // ${!isNaN(Number(category_id)) ? 'WHERE offres.category_id = ?' : 'WHERE categories.slug = ?'}
            // AND offres.status = ? ORDER BY offres.id DESC ${limit ? 'LIMIT ?' : ''}`
            sql = !isNaN(Number(category_id)) ? {
                where: { category_id: category_id, status: true },
                orderBy: { id: 'desc' },
                include: {
                    produit: { select: { slug: true, nom: true } },
                    categorie: { select: { slug: true, nom: true } },
                },
                take: limit ? JSON.parse(limit) : undefined, // LIMIT
            } : {
                where: { categorie: { slug: category_id }, status: true },
                orderBy: { id: 'desc' },
                include: {
                    produit: { select: { slug: true, nom: true } },
                    categorie: { select: { slug: true, nom: true } },
                },
                take: limit ? JSON.parse(limit) : undefined, // LIMIT
            }
            // params = limit ? [category_id, 1, limit] : [category_id, 1]
            // total = await queryDB(`SELECT COUNT(*) AS total,
            //     categories.nom AS category
            //     FROM offres 
            //     LEFT JOIN categories ON offres.category_id = categories.id
            //     ${!isNaN(Number(category_id)) ? 'WHERE offres.category_id = ?' : 'WHERE categories.slug = ?'} 
            //     AND offres.status = ? ORDER BY offres.id DESC`, [category_id, 1]);
            total = {
                where: { categorie: { slug: category_id }, status: true }
            }
        }

        // Pour les nombres d'offres dans le page / pour chaque produits
        if (nbreOffre) {
            // const produits = await queryDB(`SELECT id FROM produits`)
            let tab = []
            const produits = await prisma.produit.findMany({ select: { id: true } })
            for (let i = 0; i < produits.length; i++) {
                // let [test] = await queryDB(`SELECT COUNT(*) as total FROM offres WHERE produit_id = ? AND status = ? ORDER BY id DESC`, [produits[i].id, 1]);
                // tab.push(test)
                let test = await prisma.offre.count({
                    where: { produit_id: produits[i].id, status: true },
                    orderBy: { id: 'desc' }
                })
                tab.push(test)
            }
            return NextResponse.json(tab)
        }
        if (nbreOffre2) {
            // const produits = await queryDB(`SELECT id FROM produits`)
            let tab = []
            const test = await prisma.offre.count({
                where: { categorie: { slug: nbreOffre2 } }
            })
            return NextResponse.json(test)
        }

        // const offres = await queryDB(sql, params)
        const totals = await prisma.offre.count(total)
        const offres = await prisma.offre.findMany(sql)
        return NextResponse.json({
            offres, pagination: {
                pageCount: (totals % nombrePage != 0) ? parseInt(totals / nombrePage) + 1 : parseInt(totals / nombrePage),
                // currentPage: 1,
                total: totals
            }
        })
    } catch (error) {
        console.log(error)
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
            for (const ele of file) {
                const fileExt = ele.name.split(".").pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `${fileName}`
                let { error } = await supabase.storage
                    .from("images")
                    .upload(filePath, ele)

                if (error) {
                    throw error
                }
                const { data: url } = await supabase.storage
                    .from("images")
                    .getPublicUrl(filePath)
                imagePublicPath.push(url.publicUrl);
            }
            // console.log(imagePublicPath)
        }
        image.forEach(element => {
            imagePublicPath.push(element)
        });

        await prisma.offre.create({
            data: {
                produit_id: JSON.parse(form.produit_id),
                category_id: JSON.parse(form.category_id),
                name: form.name,
                slug: slugify(form.name),
                price: form.price,
                originalPrice: form.originalPrice,
                remise: form.remise,
                program: form.program,
                image: JSON.stringify(imagePublicPath),
                description: form.description,
                poids: form.poids,
                features: form.features,
                affiliateLink: form.affiliateLink,
                status: JSON.parse(form.status),
                content: form.content,
                meta_title: form.meta_title,
                meta_description: form.meta_description
            }
        })
        return NextResponse.json({ message: "Offre ajouté avec succès" })
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
        const file = formData.getAll('file')
        const image = formData.getAll('image')
        const form = Object.fromEntries(formData);

        let imagePublicPath = []
        if (file.length > 0) {
            for (const ele of file) {
                const fileExt = ele.name.split(".").pop()
                const fileName = `${Date.now()}.${fileExt}`
                const filePath = `${fileName}`
                let { error } = await supabase.storage
                    .from("images")
                    .upload(filePath, ele)

                if (error) {
                    throw error
                }
                const { data: url } = await supabase.storage
                    .from("images")
                    .getPublicUrl(filePath)
                imagePublicPath.push(url.publicUrl);
            }
            // console.log(imagePublicPath)
        }

        const allImages = [...image, ...imagePublicPath]

        await prisma.offre.update({
            where: { id: id },
            data: {
                produit_id: JSON.parse(form.produit_id),
                category_id: JSON.parse(form.category_id),
                name: form.name,
                slug: slugify(form.name),
                price: form.price,
                originalPrice: form.originalPrice,
                remise: form.remise,
                program: form.program,
                image: JSON.stringify(allImages),
                description: form.description,
                poids: form.poids,
                features: form.features,
                affiliateLink: form.affiliateLink,
                status: JSON.parse(form.status),
                content: form.content,
                meta_title: form.meta_title,
                meta_description: form.meta_description
            }
        })
        return NextResponse.json({ message: "Offre modifié avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = parseInt(searchParams.get('id')) || '';

        // const sql = `DELETE FROM offres WHERE id = ?`
        // const values = [id]
        // await queryDB(sql, values)
        await prisma.offre.delete({ where: { id: id } })
        return NextResponse.json({ message: "Offre supprimé avec succès" })
    } catch (error) {
        return NextResponse.json({ message: "Erreur de serveur" })
    }
}