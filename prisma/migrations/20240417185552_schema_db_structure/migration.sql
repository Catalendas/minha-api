-- CreateTable
CREATE TABLE "Games" (
    "game_id" SERIAL NOT NULL,
    "game_name" TEXT NOT NULL,
    "game_image_url" TEXT NOT NULL,
    "game_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "Games_price" (
    "game_price_id" SERIAL NOT NULL,
    "game_price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "game_eneba_url" TEXT NOT NULL,
    "game_isActive" BOOLEAN NOT NULL DEFAULT true,
    "country_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "timeframe_id" INTEGER NOT NULL,

    CONSTRAINT "Games_price_pkey" PRIMARY KEY ("game_price_id")
);

-- CreateTable
CREATE TABLE "Games_timeframe" (
    "timeframe_id" SERIAL NOT NULL,
    "timeframe_description" TEXT NOT NULL,

    CONSTRAINT "Games_timeframe_pkey" PRIMARY KEY ("timeframe_id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "category_id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,
    "category_isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Games_categories" (
    "games_categories_id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "categorye_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Games_categories_pkey" PRIMARY KEY ("games_categories_id")
);

-- CreateTable
CREATE TABLE "Country" (
    "country_id" SERIAL NOT NULL,
    "country_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("country_id")
);

-- AddForeignKey
ALTER TABLE "Games_price" ADD CONSTRAINT "Games_price_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("country_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games_price" ADD CONSTRAINT "Games_price_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games_price" ADD CONSTRAINT "Games_price_timeframe_id_fkey" FOREIGN KEY ("timeframe_id") REFERENCES "Games_timeframe"("timeframe_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games_categories" ADD CONSTRAINT "Games_categories_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("game_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games_categories" ADD CONSTRAINT "Games_categories_categorye_id_fkey" FOREIGN KEY ("categorye_id") REFERENCES "Categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
