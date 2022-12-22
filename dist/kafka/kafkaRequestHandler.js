"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaRequestHandler = void 0;
const diploma_1 = require("../diploma/diploma");
const user_1 = require("../user/user");
const sendActionMessage_1 = require("./sendActionMessage");
function kafkaRequestHandler(message) {
    return __awaiter(this, void 0, void 0, function* () {
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
                    const response = yield user_1.usersLogic.DeleteUser(valJSON.id);
                    console.log(response);
                    if (response === "success") {
                        (0, sendActionMessage_1.sendActionMessage)(valJSON.id, "deleted user " + valJSON.id);
                    }
                    console.groupEnd();
                }
                break;
            case "delete:diploma":
                if ("id" in valJSON) {
                    console.log(`OMG!!!! I need to delete diploma of id:${valJSON.id} `);
                    const response = yield user_1.usersLogic.DeleteDiploma(valJSON.id);
                    console.log(response);
                    if (response === "success") {
                        (0, sendActionMessage_1.sendActionMessage)(valJSON.id, "deleted diploma " + valJSON.id);
                    }
                }
                break;
            case "update:user":
                console.log("update:user");
                if ("id" in valJSON) {
                    console.log(`OMG!!!! I need to update ${valJSON.inputData.columnName} of user id:${valJSON.id} to ${valJSON.inputData.newValue} `);
                    const response = yield user_1.usersLogic.UpdateUserColumn(valJSON.id, valJSON.inputData.columnName, valJSON.inputData.newValue);
                    console.log(response);
                    if (response === "success") {
                        (0, sendActionMessage_1.sendActionMessage)(valJSON.id, "updated user " +
                            valJSON.id +
                            " column: " +
                            valJSON.inputData.columnName +
                            " to " +
                            valJSON.inputData.newValue);
                    }
                }
                break;
            case "create:diplomaToUserId":
                console.log("creation", valJSON);
                if (valJSON.id && valJSON.inputData && valJSON.inputData.title) {
                    console.group(`OMG!!!! I need to create diploma ${{
                        title: valJSON.inputData.title,
                        diplomaType: valJSON.inputData.diplomaType,
                        diplomaCode: valJSON.inputData.diplomaCode,
                    }} user of id:${valJSON.id} `);
                    const response = yield (0, diploma_1.AddDiplomaToUserById)(valJSON.id, Object.assign({}, valJSON.inputData));
                    console.log(response);
                    if (response === "success") {
                        (0, sendActionMessage_1.sendActionMessage)(valJSON.id, "user " +
                            valJSON.id +
                            " now has  diplomaCode: " +
                            valJSON.diplomaCode +
                            " title " +
                            valJSON.diplomaTitle +
                            " type " +
                            valJSON.diplomaType);
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
                    const response = yield user_1.usersLogic.updateColumnInUserById(valJSON.id, valJSON.body.columnName, valJSON.body.newValue);
                    if (response === "success") {
                        (0, sendActionMessage_1.sendActionMessage)(valJSON.id, "update user " +
                            valJSON.id +
                            " column: " +
                            valJSON.diplomaCode +
                            " title " +
                            valJSON.body.columnName +
                            " new value " +
                            valJSON.body.newValue);
                    }
                    console.log(response);
                    console.groupEnd();
                }
                break;
            default:
                console.log("unknown kafka alert: " +
                    {
                        key: message.key.toString(),
                        value: message.value.toString(),
                    });
        }
    });
}
exports.kafkaRequestHandler = kafkaRequestHandler;
//# sourceMappingURL=kafkaRequestHandler.js.map