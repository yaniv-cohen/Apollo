import { dbInstitutes, dbUsers } from "../data/datasheets";
import { sendActionMessage } from "../kafka/sendActionMessage";
import { prisma } from "../prismaInstance";
import { actionsProducer } from "./kafkaUtils";

export const resetDbData = async () => {
  console.log("resetting data");

  await prisma.user.deleteMany({});
  await prisma.diploma.deleteMany({});
  await prisma.skill.deleteMany({});

  await prisma.user.createMany({
    data: dbUsers,
  });
  dbInstitutes.forEach(async (inst) => {
    try {
      await prisma.institute.create({
        data: inst,
      });
    } catch (e) {
      console.log(inst, "problem");
      console.log(e.message);
    }
  });

  await sendActionMessage("EmptyDb", "Empty All DbB");
};
