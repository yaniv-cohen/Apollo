import { kafka } from "../kafkaInstance";

export async function createKafkaTopic(topicName: string) {
  const admin = kafka.admin();

  await admin.connect();
  await admin.createTopics({ topics: [{ topic: "actionsTopic" }] });
  await admin.disconnect();
}

export const actionsProducer = kafka.producer();
