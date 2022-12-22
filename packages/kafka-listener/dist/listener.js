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
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
exports.kafka = new kafkajs_1.Kafka({
    clientId: "admin",
    brokers: ["localhost:9092"],
});
const consumer = exports.kafka.consumer({ groupId: "Prisma-group" });
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield consumer.connect();
        yield consumer.subscribe({
            topics: ["DbActions", "Requests"],
            fromBeginning: true,
        });
        yield consumer.run({
            eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                console.log(`${topic}: key: ${message.key}   value: ${message.value}`);
            }),
        });
    });
}
