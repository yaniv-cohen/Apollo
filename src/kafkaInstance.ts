import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "admin",
  brokers: ["localhost:9092"],
});
