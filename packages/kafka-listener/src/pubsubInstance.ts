import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import { KafkaMessage } from "kafkajs";

let _pubSub: KafkaPubSub | undefined = undefined;

export const registerPubSub = (pubSub: KafkaPubSub) => {
  _pubSub = pubSub;
};

export const getGraphqlPubSub = () => _pubSub;

export const graphqlPublish = async (
  channel: string,
  payload: any,
  headers?: any,
  sendOptions?: any
) => _pubSub?.publish(channel, JSON.stringify(payload), headers, sendOptions);

export const extractPayload = (kafkaMessage: KafkaMessage) => {
  if (!Buffer.isBuffer(kafkaMessage.value)) {
    return kafkaMessage;
  }
  return JSON.parse(kafkaMessage.value.toString("utf-8"));
};
