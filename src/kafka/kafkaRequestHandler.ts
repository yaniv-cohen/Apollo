import { KafkaMessage } from "kafkajs";

import { AddDiplomaToUserById } from "../diploma/diploma";
import { usersLogic } from "../user/user";
import { actionsProducer } from "../utils/kafkaUtils";
import { sendActionMessage } from "./sendActionMessage";

export async function kafkaRequestHandler(message: KafkaMessage) {
  const value = message.value;
  console.log(message.value, ":", value);

  console.log("valJSON:");
  const valJSON = JSON.parse(message.value.toString());
  console.log(valJSON);
  switch (valJSON.action) {
    case "delete:user":
      console.log("kafka delete:user", valJSON);
      if ("id" in valJSON) {
        console.group(`OMG!!!! I need to delete user of id:${valJSON.id} `);
        const response = await usersLogic.DeleteUser(valJSON.id);
        console.log(response);
        if (response === "success") {
          sendActionMessage(valJSON.id, "deleted user " + valJSON.id);
        }
        console.groupEnd();
      }
      break;
    case "delete:diploma":
      if ("id" in valJSON) {
        console.log(`OMG!!!! I need to delete diploma of id:${valJSON.id} `);
        const response = await usersLogic.DeleteDiploma(valJSON.id);
        console.log(response);
        if (response === "success") {
          sendActionMessage(valJSON.id, "deleted diploma " + valJSON.id);
        }
      }
      break;
    case "update:user":
      console.log("update:user");
      if ("id" in valJSON) {
        console.log(
          `OMG!!!! I need to update ${valJSON.inputData.columnName} of user id:${valJSON.id} to ${valJSON.inputData.newValue} `
        );
        const response = await usersLogic.UpdateUserColumn(
          valJSON.id,
          valJSON.inputData.columnName,
          valJSON.inputData.newValue
        );
        console.log(response);
        if (response === "success") {
          sendActionMessage(
            valJSON.id,
            "updated user " +
              valJSON.id +
              " column: " +
              valJSON.inputData.columnName +
              " to " +
              valJSON.inputData.newValue
          );
        }
      }
      break;
    case "create:diplomaToUserId":
      console.log("creation", valJSON);

      if (valJSON.id && valJSON.inputData && valJSON.inputData.title) {
        console.group(
          `OMG!!!! I need to create diploma ${{
            title: valJSON.inputData.title,
            diplomaType: valJSON.inputData.diplomaType,
            diplomaCode: valJSON.inputData.diplomaCode,
          }} user of id:${valJSON.id} `
        );
        const response = await AddDiplomaToUserById(valJSON.id, {
          ...valJSON.inputData,
        });
        console.log(response);
        if (response === "success") {
          sendActionMessage(
            valJSON.id,
            "user " +
              valJSON.id +
              " now has  diplomaCode: " +
              valJSON.diplomaCode +
              " title " +
              valJSON.diplomaTitle +
              " type " +
              valJSON.diplomaType
          );
        }
        console.groupEnd();
      }

      break;
    case "update:user":
      console.log("update", valJSON);

      if (valJSON.id && valJSON.columnName) {
        console.group("OMG!!!! I need to update %o user of id:${valJSON.id} ", {
          title: valJSON.columnName,
          diplomaType: valJSON.newValue,
        });
        const response = await usersLogic.updateColumnInUserById(
          valJSON.id,
          valJSON.body.columnName,
          valJSON.body.newValue
        );
        if (response === "success") {
          sendActionMessage(
            valJSON.id,
            "update user " +
              valJSON.id +
              " column: " +
              valJSON.diplomaCode +
              " title " +
              valJSON.body.columnName +
              " new value " +
              valJSON.body.newValue
          );
        }
        console.log(response);
        console.groupEnd();
      }

      break;
    default:
      console.log(
        "unknown kafka alert: " +
          {
            key: message.key.toString(),
            value: message.value.toString(),
          }
      );
  }
}
