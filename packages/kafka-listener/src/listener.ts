import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "admin",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "Prisma-group" });
main();
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
