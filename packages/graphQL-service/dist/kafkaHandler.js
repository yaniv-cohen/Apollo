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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestMessage = void 0;
const server_1 = require("./server");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("REQUESTS_TOPIC", process.env.REQUESTS_TOPIC);
const sendRequestMessage = (args) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("sendMessageToKafka", JSON.stringify(args));
    var _a;
    try {
        yield server_1.producer.send({
            topic: process.env.REQUESTS_TOPIC + "",
            messages: [
                {
                    key: (_a = args.id) === null || _a === void 0 ? void 0 : _a.toString(),
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
        console.log("posted " + args.action + " request to topic", process.env.REQUESTS_TOPIC + "");
        return "success";
    }
    catch (_b) {
        return "fail";
    }
});
exports.sendRequestMessage = sendRequestMessage;
