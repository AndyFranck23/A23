-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Offre" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "updated_at" TIMESTAMP(3);
