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
const kafkajs_1 = require("kafkajs");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const schema_1 = require("@graphql-tools/schema");
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const graphql_1 = require("graphql");
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
const KafkaPort = "localhost:9092";
exports.kafka = new kafkajs_1.Kafka({
    brokers: [KafkaPort],
});
exports.producer = exports.kafka.producer();
// const extractSubscriptionContext = async () => {
//   return "aaaaaaaaaa";
// };
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.producer.connect();
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
            schema,
            execute: graphql_1.execute,
            subscribe: graphql_1.subscribe,
            // onConnect: extractSubscriptionContext,
        }, {
            server: httpServer,
            path: "/graphql",
        });
        const plugins = [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    subscriptionServer.close();
                                });
                            },
                        };
                    });
                },
            },
        ];
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            plugins,
            introspection: true,
        });
        yield server.start();
        server.applyMiddleware({
            app,
            path: "/graphql",
        });
        // console.log(server.getMiddleware.toString());
        yield new Promise((resolve) => httpServer.listen({ port: 4005 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4005${server.graphqlPath}`);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () { return startApolloServer(); }))();
