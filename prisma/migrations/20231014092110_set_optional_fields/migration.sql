-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_jobPostingId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "jobPostingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_jobPostingId_fkey" FOREIGN KEY ("jobPostingId") REFERENCES "JobPosting"("id") ON DELETE SET NULL ON UPDATE CASCADE;
