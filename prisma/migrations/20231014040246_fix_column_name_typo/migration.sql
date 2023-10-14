/*
  Warnings:

  - You are about to drop the column `reaward` on the `JobPosting` table. All the data in the column will be lost.
  - Added the required column `reward` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPosting" DROP COLUMN "reaward",
ADD COLUMN     "reward" INTEGER NOT NULL;
