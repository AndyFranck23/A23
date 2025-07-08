/*
  Warnings:

  - You are about to drop the column `affiliateLink` on the `Offre` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Offre` table. All the data in the column will be lost.
  - You are about to drop the column `program` on the `Offre` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Offre" DROP COLUMN "affiliateLink",
DROP COLUMN "originalPrice",
DROP COLUMN "program";
