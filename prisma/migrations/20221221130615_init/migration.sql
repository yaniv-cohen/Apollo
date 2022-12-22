-- CreateEnum
CREATE TYPE "AcoountType" AS ENUM ('Basic', 'Admin', 'Premium');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL DEFAULT 'default first name',
    "last_name" TEXT NOT NULL DEFAULT 'default last name',
    "email" TEXT NOT NULL,
    "country" TEXT,
    "gender" TEXT NOT NULL DEFAULT 'None',
    "acoountType" "AcoountType" NOT NULL DEFAULT 'Basic',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diploma" (
    "id" SERIAL NOT NULL,
    "diplomaCode" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "diplomaType" TEXT NOT NULL DEFAULT 'B.A',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Diploma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "expereience" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SkillToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Diploma_diplomaCode_userId_key" ON "Diploma"("diplomaCode", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_SkillToUser_AB_unique" ON "_SkillToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SkillToUser_B_index" ON "_SkillToUser"("B");

-- AddForeignKey
ALTER TABLE "Diploma" ADD CONSTRAINT "Diploma_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SkillToUser" ADD CONSTRAINT "_SkillToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
