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
exports.REQUESTS_TOPIC = void 0;
const express_1 = __importDefault(require("express"));
const prismaInstance_1 = require("./prismaInstance");
const user_1 = require("./user/user");
const diploma_1 = require("./diploma/diploma");
const resetDb_1 = require("./utils/resetDb");
const kafkaInstance_1 = require("./kafkaInstance");
const kafkaUtils_1 = require("./utils/kafkaUtils");
// const producer = kafka.producer();
// const requestsConsumer = kafka.requestsConsumer({ groupId: "scenario" });
const dotenv_1 = __importDefault(require("dotenv"));
const kafkaRequestHandler_1 = require("./kafka/kafkaRequestHandler");
dotenv_1.default.config();
exports.REQUESTS_TOPIC = process.env.REQUESTS_TOPIC;
// console.log(REQUESTS_TOPIC, ACTIONS_TOPIC);
const app = (0, express_1.default)();
app.use(express_1.default.json());
function prismaSetUpActions() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(5555, () => {
            console.log("started express for the Prisma server , PORT: 5555");
        });
        /////KAFKA
        const requestsConsumer = kafkaInstance_1.kafka.consumer({ groupId: "Prisma-group" });
        // createKafkaTopic(ACTIONS_TOPIC);
        yield requestsConsumer.connect();
        yield kafkaUtils_1.actionsProducer.connect(); ///might be unnecesery
        yield requestsConsumer.subscribe({
            topic: exports.REQUESTS_TOPIC,
            fromBeginning: true,
        });
        yield requestsConsumer.run({
            eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                console.log("got message");
                (0, kafkaRequestHandler_1.kafkaRequestHandler)(message);
            }),
        });
        (0, resetDb_1.resetDbData)();
        console.log(yield prismaInstance_1.prisma.user.findFirst({}));
    });
}
prismaSetUpActions()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaInstance_1.prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prismaInstance_1.prisma.$disconnect();
    process.exit(1);
}));
app.get("/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllUsers request");
    const users = yield user_1.usersLogic.getAllUsers();
    console.log("Got users", users.length);
    res.json(users);
}));
app.get("/getUserById", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getUserById request params", req.query.id);
    const user = yield user_1.usersLogic.getUserById(parseInt(req.query.id));
    console.log("Got user", user);
    res.json(user);
}));
app.get("/getDiplomaById", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getDiplomaById request", req.query.id);
    const diploma = yield (0, diploma_1.getDiplomaById)(parseInt(req.query.id));
    console.log("Got diploma", diploma);
    res.json(diploma);
}));
app.get("/getAllUsersByColumn", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllUsersByColumn request", req.body.value.columnName, req.body.value.value);
    const users = yield user_1.usersLogic.getAllUsersByColumn(req.body.value.columnName, req.body.value.value);
    console.log(users);
    res.json(users);
}));
app.get("/getAllDiplomas", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllDiplomas request");
    const users = yield (0, diploma_1.getAllDiplomas)();
    console.log(users);
    res.json(users);
}));
app.get("/getUsersByDiplomaTitle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getUsersByDiplomaTitle request", req.query.diplomaTitle);
    const users = yield user_1.usersLogic.getUsersByDiplomaTitle(req.query.diplomaTitle.toString());
    console.log(users);
    res.json(users);
}));
//# sourceMappingURL=index.js.map