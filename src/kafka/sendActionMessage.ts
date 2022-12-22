import { actionsProducer } from "../utils/kafkaUtils";
const ACTIONS_TOPIC = process.env.ACTIONS_TOPIC;
export const sendActionMessage = async (key: string, value: string) => {
  console.log("create message:");
  console.log([key, value]);

  await actionsProducer.send({
    topic: ACTIONS_TOPIC,
    messages: [{ key: key.toString(), value: value.toString() }],
  });
  console.log("send reqest to ", ACTIONS_TOPIC);
};
