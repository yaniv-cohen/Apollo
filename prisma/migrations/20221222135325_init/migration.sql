-- DropForeignKey
ALTER TABLE "Diploma" DROP CONSTRAINT "Diploma_instituteName_fkey";

-- AlterTable
ALTER TABLE "Diploma" ALTER COLUMN "instituteName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Diploma" ADD CONSTRAINT "Diploma_instituteName_fkey" FOREIGN KEY ("instituteName") REFERENCES "institute"("name") ON DELETE SET NULL ON UPDATE CASCADE;
