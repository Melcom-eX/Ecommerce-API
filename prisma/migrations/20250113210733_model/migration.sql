-- CreateEnum
CREATE TYPE "SellerType" AS ENUM ('FOODSECTOR', 'MARKETPLACE');

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "sellerType" "SellerType" NOT NULL DEFAULT 'MARKETPLACE';
