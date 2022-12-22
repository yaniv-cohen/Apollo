/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `institute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instituteName` to the `Diploma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diploma" ADD COLUMN     "instituteName" TEXT NOT NULL,
ALTER COLUMN "diplomaType" DROP NOT NULL,
ALTER COLUMN "diplomaType" DROP DEFAULT;

-- CreateTable
CREATE TABLE "_UserToinstitute" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToinstitute_AB_unique" ON "_UserToinstitute"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToinstitute_B_index" ON "_UserToinstitute"("B");

-- CreateIndex
CREATE UNIQUE INDEX "institute_name_key" ON "institute"("name");

-- AddForeignKey
ALTER TABLE "Diploma" ADD CONSTRAINT "Diploma_instituteName_fkey" FOREIGN KEY ("instituteName") REFERENCES "institute"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToinstitute" ADD CONSTRAINT "_UserToinstitute_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToinstitute" ADD CONSTRAINT "_UserToinstitute_B_fkey" FOREIGN KEY ("B") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
