export const categories = {
    chocolats: {
        name: "Chocolats Premium",
        affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
        subcategories: [
            {
                slug: "tablette",
                name: "Tablette",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "Découvrez notre tablette de chocolat, alliant la finesse d’un chocolat noir riche et équilibré à une texture fondante en bouche. Parfaite pour les puristes en quête d’une expérience authentique."
            },
            {
                slug: "barre",
                name: "Barre",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "Nos barres de chocolat offrent une alternative pratique et gourmande pour une pause chocolatée. Leur format compact et leur saveur intense en font le compagnon idéal de votre quotidien actif."
            },
            {
                slug: "bonbon",
                name: "Bonbon",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "Les bonbons au chocolat apportent une touche ludique à votre dégustation. Ces petites bouchées, aux textures variées, surprennent et ravissent vos papilles à chaque instant."
            },
            {
                slug: "coffrets-cadeaux",
                name: "Coffrets cadeaux",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "Conçus pour émerveiller, nos coffrets cadeaux rassemblent une sélection raffinée de chocolats. Présentés avec élégance, ils sont parfaits pour offrir et marquer les moments précieux."
            },
            {
                slug: "fete",
                name: "Fête",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "La catégorie Fête réunit des créations chocolatées spécialement imaginées pour célébrer vos occasions spéciales. Laissez-vous séduire par des recettes festives et originales qui égayeront vos moments de convivialité."
            },
            {
                slug: "tartinable",
                name: "Tartinable",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "Découvrez notre sélection de chocolats tartinables, onctueux et savoureux, idéale pour agrémenter vos petits-déjeuners ou vos encas gourmands. Une douceur à étaler et à partager."
            },
            {
                slug: "boisson",
                name: "Boisson",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "Nos boissons chocolatées invitent à savourer un instant de réconfort. Chaudes ou rafraîchissantes, elles offrent une expérience riche et veloutée, idéale pour combler les amateurs de cacao."
            },
            {
                slug: "patisserie",
                name: "Pâtisserie",
                affiliatePrograms: ["Lindt", "Côte d'or", "Robert"],
                description: "La gamme pâtisserie est conçue pour sublimer vos créations culinaires. Parfaite pour les chefs et les amateurs de desserts, elle apporte une touche d’excellence et de raffinement à chaque recette."
            },
        ]
    },
    tech: {
        name: "Tech & Gadgets",
        subcategories: [
            {
                slug: "audio",
                name: "Audio",
                affiliatePrograms: ["Amazon", "Apple", "Best Buy"]
            },
            {
                slug: "wearables",
                name: "Santé Connectée",
                affiliatePrograms: ["Fitbit", "Amazon"]
            }
        ]
    },
    beauty: {
        name: "Beauté Naturelle",
        subcategories: [
            {
                slug: "skincare",
                name: "Skincare Coréen",
                affiliatePrograms: ["Sephora", "YesStyle"]
            },
            {
                slug: "aromathérapie",
                name: "Aromathérapie",
                affiliatePrograms: ["Dermstore", "Amazon"]
            }
        ]
    }
};

export const affiliatePrograms = {
    Godiva: { rate: "4-8%", min: 50 },
    Lindt: { rate: "5%", min: 30 },
    "Amazon Gourmet": { rate: "10%", min: 0 },
    Apple: { rate: "8%", min: 100 },
    Fitbit: { rate: "6%", min: 50 },
    Sephora: { rate: "15%", min: 0 }
};