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
exports.actionsProducer = exports.createKafkaTopic = void 0;
const kafkaInstance_1 = require("../kafkaInstance");
function createKafkaTopic(topicName) {
    return __awaiter(this, void 0, void 0, function* () {
        const admin = kafkaInstance_1.kafka.admin();
        yield admin.connect();
        yield admin.createTopics({ topics: [{ topic: "actionsTopic" }] });
        yield admin.disconnect();
    });
}
exports.createKafkaTopic = createKafkaTopic;
exports.actionsProducer = kafkaInstance_1.kafka.producer();
//# sourceMappingURL=kafkaUtils.js.map