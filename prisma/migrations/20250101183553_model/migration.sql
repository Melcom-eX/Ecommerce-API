/*
  Warnings:

  - Made the column `comment` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "comment" SET NOT NULL;
