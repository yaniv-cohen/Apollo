import express from "express";
import { prisma } from "./prismaInstance";
import { usersLogic } from "./user/user";
import {
  AddDiplomaToUserById,
  getAllDiplomas,
  getDiplomaById,
} from "./diploma/diploma";
import { CompressionTypes, ITopicConfig, Kafka } from "kafkajs";
import { resetDbData } from "./utils/resetDb";
import { kafka } from "./kafkaInstance";
import { createKafkaTopic, actionsProducer } from "./utils/kafkaUtils";

// const producer = kafka.producer();
// const requestsConsumer = kafka.requestsConsumer({ groupId: "scenario" });
import dotenv from "dotenv";
import { kafkaRequestHandler } from "./kafka/kafkaRequestHandler";
dotenv.config();
export const REQUESTS_TOPIC = process.env.REQUESTS_TOPIC;
// console.log(REQUESTS_TOPIC, ACTIONS_TOPIC);

const app = express();
app.use(express.json());

async function prismaSetUpActions() {
  app.listen(5555, () => {
    console.log("started express for the Prisma server , PORT: 5555");
  });
  /////KAFKA
  const requestsConsumer = kafka.consumer({ groupId: "Prisma-group" });
  // createKafkaTopic(ACTIONS_TOPIC);
  await requestsConsumer.connect();
  await actionsProducer.connect(); ///might be unnecesery

  await requestsConsumer.subscribe({
    topic: REQUESTS_TOPIC,
    fromBeginning: true,
  });
  await requestsConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("got message");

      kafkaRequestHandler(message);
    },
  });
  resetDbData();
  console.log(await prisma.user.findFirst({}));
}

prismaSetUpActions()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.get("/getAllUsers", async (req, res) => {
  console.log("getAllUsers request");
  const users = await usersLogic.getAllUsers();
  console.log("Got users", users.length);
  res.json(users);
});
app.get("/getUserById", async (req: any, res) => {
  console.log("getUserById request params", req.query.id);
  const user = await usersLogic.getUserById(parseInt(req.query.id));
  console.log("Got user", user);
  res.json(user);
});
app.get("/getDiplomaById", async (req: any, res) => {
  console.log("getDiplomaById request", req.query.id);
  const diploma = await getDiplomaById(parseInt(req.query.id));
  console.log("Got diploma", diploma);
  res.json(diploma);
});

app.get("/getAllUsersByColumn", async (req, res) => {
  console.log(
    "getAllUsersByColumn request",
    req.body.value.columnName,
    req.body.value.value
  );
  const users = await usersLogic.getAllUsersByColumn(
    req.body.value.columnName,
    req.body.value.value
  );
  console.log(users);
  res.json(users);
});
app.get("/getAllDiplomas", async (req, res) => {
  console.log("getAllDiplomas request");
  const users = await getAllDiplomas();
  console.log(users);

  res.json(users);
});
app.get("/getUsersByDiplomaTitle", async (req, res) => {
  console.log("getUsersByDiplomaTitle request", req.query.diplomaTitle);
  const users = await usersLogic.getUsersByDiplomaTitle(
    req.query.diplomaTitle.toString()
  );
  console.log(users);

  res.json(users);
});
