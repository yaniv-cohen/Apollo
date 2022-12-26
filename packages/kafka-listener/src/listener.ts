import { Kafka, KafkaMessage } from "kafkajs";
import express from "express";

export const kafka = new Kafka({
  clientId: "admin",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "Prisma-group" });
main();

// const subscriptions = {
//   users: [],
//   diplomas: [],
//   universities: [],
// };
async function main() {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["DbActions", "Requests"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`${topic}: key: ${message.key}   value: ${message.value}`);
    },
  });
}

async function startApolloServer() {
  const app = express();
  // app.use(cookieParser()); /// not my code
  // app.use(express.json({ limit: "50mb" })); /// not my code
  const EXPRESS_PORT = 9046;
  app.listen(EXPRESS_PORT, () => {
    console.log("listening on port ", EXPRESS_PORT);
  });
}
