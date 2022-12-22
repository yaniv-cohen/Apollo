-- AlterTable
CREATE SEQUENCE diploma_diplomacode_seq;
ALTER TABLE "Diploma" ALTER COLUMN "diplomaCode" SET DEFAULT nextval('diploma_diplomacode_seq');
ALTER SEQUENCE diploma_diplomacode_seq OWNED BY "Diploma"."diplomaCode";
