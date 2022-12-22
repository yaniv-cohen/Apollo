/*
  Warnings:

  - A unique constraint covering the columns `[diplomaCode]` on the table `Diploma` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Diploma_diplomaCode_key" ON "Diploma"("diplomaCode");
