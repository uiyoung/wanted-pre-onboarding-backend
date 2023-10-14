/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `ApplicationHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationHistory" DROP CONSTRAINT "ApplicationHistory_jobPostingId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationHistory" DROP CONSTRAINT "ApplicationHistory_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";

-- DropTable
DROP TABLE "ApplicationHistory";
