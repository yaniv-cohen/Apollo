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
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const pubsubIniialiser_1 = require("./pubsubIniialiser");
// import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
// import { createClient } from "graphql-ws";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
const KafkaPort = "localhost:9092";
exports.kafka = new kafkajs_1.Kafka({
    // clientId: "admin",
    brokers: [KafkaPort],
});
exports.producer = exports.kafka.producer();
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        ///// KAFKA
        yield exports.producer.connect();
        //////
        // Required logic for integrating with Express
        const app = (0, express_1.default)();
        // Our httpServer handles incoming requests to our Express app.
        // Below, we tell Apollo Server to "drain" this httpServer,
        // enabling our servers to shut down gracefully.
        const httpServer = http_1.default.createServer(app);
        // Same ApolloServer initialization as before, plus the drain plugin
        // for our httpServer.
        pubsubIniialiser_1.pubsub.publish("DIPLOMA_CREATED", {
            diplomaCreated: {
                title: "A",
            },
        });
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: typeDefs_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            csrfPrevention: true,
            cache: "bounded",
            plugins: [
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
            ],
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
