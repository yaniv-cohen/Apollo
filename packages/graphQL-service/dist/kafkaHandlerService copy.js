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
const kafkajs_1 = require("kafkajs");
const graphql_kafkajs_subscriptions_1 = require("graphql-kafkajs-subscriptions");
const rxjs_1 = require("rxjs");
const extractPayload = (kafkaMessage) => {
    if (!Buffer.isBuffer(kafkaMessage.value)) {
        return kafkaMessage;
    }
    return JSON.parse(kafkaMessage.value.toString("utf-8"));
};
class KafkaHandlerService {
    constructor() { }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let ssl = false;
            this.pubSub = yield graphql_kafkajs_subscriptions_1.KafkaPubSub.create({
                topic: "someTopic",
                kafka: new kafkajs_1.Kafka({
                    brokers: [`localhost:8799`],
                    ssl,
                }),
                groupIdPrefix: "groupIdPrefix",
                consumerConfig: {
                    maxBytesPerPartition: 5000000,
                    maxBytes: 5000000,
                    heartbeatInterval: 1000,
                    sessionTimeout: 100000,
                },
            });
            this.subject = new rxjs_1.Subject();
            this.subject
                .pipe((0, rxjs_1.tap)((payloads) => __awaiter(this, void 0, void 0, function* () {
                if (!Array.isArray(payloads)) {
                    payloads = [payloads];
                }
                if (!payloads.length) {
                    return;
                }
                console.log("payloads", JSON.stringify(payloads));
            })))
                .subscribe();
            this.subscription = yield this.pubSub.subscribe("someTopic", this.onMessage.bind(this));
        });
    }
    onMessage(message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const payload = extractPayload(message);
            console.log("Incoming Kafka Message ", payload);
            (_a = this.subject) === null || _a === void 0 ? void 0 : _a.next({ payload });
        });
    }
}
exports.default = new KafkaHandlerService();
