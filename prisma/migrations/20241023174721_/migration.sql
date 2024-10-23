/*
  Warnings:

  - You are about to drop the column `percentage` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `name` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantId` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Made the column `startDate` on table `Discount` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Discount` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- DropForeignKey
ALTER TABLE "Discount" DROP CONSTRAINT "Discount_menuItemId_fkey";

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "percentage",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "restaurantId" TEXT NOT NULL,
ADD COLUMN     "type" "DiscountType" NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL;

-- CreateTable
CREATE TABLE "_DiscountToMenuItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiscountToMenuItem_AB_unique" ON "_DiscountToMenuItem"("A", "B");

-- CreateIndex
CREATE INDEX "_DiscountToMenuItem_B_index" ON "_DiscountToMenuItem"("B");

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToMenuItem" ADD CONSTRAINT "_DiscountToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToMenuItem" ADD CONSTRAINT "_DiscountToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
