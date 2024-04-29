/*
  Warnings:

  - You are about to drop the column `updateDate` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games_price` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games_timeframe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Games_categories" DROP CONSTRAINT "Games_categories_categorye_id_fkey";

-- DropForeignKey
ALTER TABLE "Games_categories" DROP CONSTRAINT "Games_categories_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Games_price" DROP CONSTRAINT "Games_price_country_id_fkey";

-- DropForeignKey
ALTER TABLE "Games_price" DROP CONSTRAINT "Games_price_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Games_price" DROP CONSTRAINT "Games_price_timeframe_id_fkey";

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "updateDate",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Games";

-- DropTable
DROP TABLE "Games_categories";

-- DropTable
DROP TABLE "Games_price";

-- DropTable
DROP TABLE "Games_timeframe";

-- CreateTable
CREATE TABLE "Products" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_image_url" TEXT NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Products_price" (
    "product_price_id" SERIAL NOT NULL,
    "product_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_url" TEXT NOT NULL,
    "product_isActive" BOOLEAN NOT NULL DEFAULT true,
    "country_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "timeframe_id" INTEGER NOT NULL,

    CONSTRAINT "Products_price_pkey" PRIMARY KEY ("product_price_id")
);

-- CreateTable
CREATE TABLE "Products_timeframe" (
    "timeframe_id" SERIAL NOT NULL,
    "timeframe_description" TEXT NOT NULL,

    CONSTRAINT "Products_timeframe_pkey" PRIMARY KEY ("timeframe_id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "gender_id" SERIAL NOT NULL,
    "gender_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gender_isActive" BOOLEAN NOT NULL DEFAULT true,
    "type_id" INTEGER NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("gender_id")
);

-- CreateTable
CREATE TABLE "Products_gender" (
    "products_categories_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "gender_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_gender_pkey" PRIMARY KEY ("products_categories_id")
);

-- CreateTable
CREATE TABLE "Product_type" (
    "type_id" SERIAL NOT NULL,
    "type_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_type_pkey" PRIMARY KEY ("type_id")
);

-- CreateTable
CREATE TABLE "Product_type_plataform" (
    "product_type_plataform" SERIAL NOT NULL,
    "product_type_id" INTEGER NOT NULL,
    "plataform_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_type_plataform_pkey" PRIMARY KEY ("product_type_plataform")
);

-- CreateTable
CREATE TABLE "Plataform" (
    "plataform_id" SERIAL NOT NULL,
    "plataform_description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plataform_pkey" PRIMARY KEY ("plataform_id")
);

-- CreateTable
CREATE TABLE "Produt_plataform" (
    "product_plataform_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "plataform_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produt_plataform_pkey" PRIMARY KEY ("product_plataform_id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Product_type"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_price" ADD CONSTRAINT "Products_price_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_price" ADD CONSTRAINT "Products_price_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_price" ADD CONSTRAINT "Products_price_timeframe_id_fkey" FOREIGN KEY ("timeframe_id") REFERENCES "Products_timeframe"("timeframe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gender" ADD CONSTRAINT "Gender_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Product_type"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_gender" ADD CONSTRAINT "Products_gender_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products_gender" ADD CONSTRAINT "Products_gender_gender_id_fkey" FOREIGN KEY ("gender_id") REFERENCES "Gender"("gender_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_type_plataform" ADD CONSTRAINT "Product_type_plataform_product_type_id_fkey" FOREIGN KEY ("product_type_id") REFERENCES "Product_type"("type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_type_plataform" ADD CONSTRAINT "Product_type_plataform_plataform_id_fkey" FOREIGN KEY ("plataform_id") REFERENCES "Plataform"("plataform_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produt_plataform" ADD CONSTRAINT "Produt_plataform_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produt_plataform" ADD CONSTRAINT "Produt_plataform_plataform_id_fkey" FOREIGN KEY ("plataform_id") REFERENCES "Plataform"("plataform_id") ON DELETE RESTRICT ON UPDATE CASCADE;
