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
exports.sendActionMessage = void 0;
const kafkaUtils_1 = require("../utils/kafkaUtils");
const ACTIONS_TOPIC = process.env.ACTIONS_TOPIC;
const sendActionMessage = (key, value) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("create message:");
    console.log([key, value]);
    yield kafkaUtils_1.actionsProducer.send({
        topic: ACTIONS_TOPIC,
        messages: [{ key: key.toString(), value: value.toString() }],
    });
    console.log("send reqest to ", ACTIONS_TOPIC);
});
exports.sendActionMessage = sendActionMessage;
//# sourceMappingURL=sendActionMessage.js.map