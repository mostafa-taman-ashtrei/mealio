/*
  Warnings:

  - You are about to drop the column `deletedd` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `deletedd` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `deletedd` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `deletedd` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `deletedd` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `deletedd` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "deletedd",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "deletedd",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "deletedd",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "deletedd",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "deletedd",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deletedd",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
