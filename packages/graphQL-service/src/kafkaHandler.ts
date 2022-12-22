import { producer } from "./server";
import dotenv from "dotenv";
import { env } from "process";
dotenv.config();
console.log("REQUESTS_TOPIC", process.env.REQUESTS_TOPIC);

export const sendRequestMessage = async (args: {
  action: string;
  data?: Object;
  id?: number;
  itemType?: string;
  text?: string;
}) => {
  // console.log("sendMessageToKafka", JSON.stringify(args));

  try {
    await producer.send({
      topic: process.env.REQUESTS_TOPIC + "",
      messages: [
        {
          key: args.id?.toString(),
          value: JSON.stringify({
            action: args.action,
            itemType: args.itemType,
            id: args.id,
            inputData: args.data,
            text: args.text,
          }),
        },
      ],
    });
    console.log(
      "posted " + args.action + " request to topic",
      process.env.REQUESTS_TOPIC + ""
    );
    return "success";
  } catch {
    return "fail";
  }
};
