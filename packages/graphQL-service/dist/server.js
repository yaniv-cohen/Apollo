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
exports.producer = exports.kafka = void 0;
const typeDefs_1 = require("./typeDefs");
const resolvers_1 = require("./resolvers");
const apollo_server_express_1 = require("apollo-server-express");
const kafkajs_1 = require("kafkajs");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const http_2 = require("http");
// import { registerPubSub } from "./pubsubInstance";
// import kafkaHandlerService from "./kafkaHandlerService";
// import { registerPubSub } from "./graphqlPubSub/graphqlPubSub";
const WS_PORT = 5000;
// Create WebSocket listener server
const websocketServer = (0, http_2.createServer)((request, response) => {
    response.writeHead(404);
    response.end();
});
// Bind it to port and start listening
websocketServer.listen(WS_PORT, () => console.log(`Websocket Server is now running on ws://localhost:${WS_PORT}`));
// const extractSubscriptionContext = async (connectionParams) => {
//   // Mimic cookies structure
//   const input = { req: { cookies: connectionParams } };
//   const context = await extractApolloContext(input);
//   return context;
// };
// const schema = makeExecutableSchema({ typeDefs, resolvers });
// const subscriptionServer = SubscriptionServer.create(
//   {
//     schema,
//     execute,
//     subscribe,
//     // onConnect: extractSubscriptionContext,
//     onConnect: () => {
//       console.log("onConnect! 👌");
//     },
//   },
//   {
//     server: websocketServer,
//     path: "/graphql",
//   }
// );
const KafkaPort = "localhost:9092";
exports.kafka = new kafkajs_1.Kafka({
    brokers: [KafkaPort],
});
exports.producer = exports.kafka.producer();
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        ///// KAFKA
        yield exports.producer.connect();
        // await kafkaHandlerService.init();
        // registerPubSub(kafkaHandlerService.pubSub!);
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            csrfPrevention: true,
            cache: "bounded",
            // plugins: plugins,
        });
        // More required logic for integrating with Express
        yield server.start();
        server.applyMiddleware({
            app,
            // By default, apollo-server hosts its GraphQL endpoint at the
            // server root. However, *other* Apollo Server packages host it at
            // /graphql. Optionally provide this to match apollo-server.
            path: "/",
        });
        // Modified server startup
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        // fetch("http:localhost:5555/allUsers");
    });
}
startApolloServer();
