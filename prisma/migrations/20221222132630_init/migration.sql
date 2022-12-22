-- CreateTable
CREATE TABLE "institute" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "mathRank" INTEGER,
    "artsRank" INTEGER,

    CONSTRAINT "institute_pkey" PRIMARY KEY ("id")
);
