-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL,
    "meta_title" TEXT NOT NULL DEFAULT '',
    "meta_description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "produit_id" INTEGER NOT NULL,
    "nom" VARCHAR(255) NOT NULL DEFAULT '',
    "slug" VARCHAR(100) NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_title" TEXT NOT NULL DEFAULT '',
    "meta_description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offre" (
    "id" SERIAL NOT NULL,
    "produit_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "name" VARCHAR(255) NOT NULL DEFAULT '',
    "slug" VARCHAR(255) NOT NULL DEFAULT '',
    "price" VARCHAR(50) NOT NULL DEFAULT '',
    "originalPrice" VARCHAR(50) NOT NULL DEFAULT '',
    "remise" VARCHAR(50) NOT NULL DEFAULT '',
    "program" VARCHAR(100) NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "poids" VARCHAR(50) NOT NULL DEFAULT '',
    "features" TEXT NOT NULL DEFAULT '',
    "affiliateLink" TEXT NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL,
    "content" TEXT DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_title" TEXT NOT NULL DEFAULT '',
    "meta_description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Offre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nom" VARCHAR(255) NOT NULL DEFAULT '',
    "email" VARCHAR(255) NOT NULL DEFAULT '',
    "password" VARCHAR(255) NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "meta_title" TEXT NOT NULL DEFAULT '',
    "meta_description" TEXT NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "meta_title" TEXT NOT NULL DEFAULT '',
    "meta_description" TEXT NOT NULL DEFAULT '',
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offre" ADD CONSTRAINT "Offre_produit_id_fkey" FOREIGN KEY ("produit_id") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offre" ADD CONSTRAINT "Offre_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
