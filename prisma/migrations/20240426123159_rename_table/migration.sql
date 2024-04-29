/*
  Warnings:

  - You are about to drop the `Produt_plataform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Produt_plataform" DROP CONSTRAINT "Produt_plataform_plataform_id_fkey";

-- DropForeignKey
ALTER TABLE "Produt_plataform" DROP CONSTRAINT "Produt_plataform_product_id_fkey";

-- DropTable
DROP TABLE "Produt_plataform";

-- CreateTable
CREATE TABLE "Product_plataform" (
    "product_plataform_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "plataform_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_plataform_pkey" PRIMARY KEY ("product_plataform_id")
);

-- AddForeignKey
ALTER TABLE "Product_plataform" ADD CONSTRAINT "Product_plataform_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_plataform" ADD CONSTRAINT "Product_plataform_plataform_id_fkey" FOREIGN KEY ("plataform_id") REFERENCES "Plataform"("plataform_id") ON DELETE RESTRICT ON UPDATE CASCADE;
