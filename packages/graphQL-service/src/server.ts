import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server-express";
import { CompressionTypes, Kafka } from "kafkajs";
//////
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import express from "express";
import http from "http";

import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
// import { registerPubSub } from "./pubsubInstance";
// import kafkaHandlerService from "./kafkaHandlerService";

// import { registerPubSub } from "./graphqlPubSub/graphqlPubSub";
const WS_PORT = 5000;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening

websocketServer.listen(WS_PORT, () =>
  console.log(`Websocket Server is now running on ws://localhost:${WS_PORT}`)
);
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
export const kafka = new Kafka({
  brokers: [KafkaPort],
});
export const producer = kafka.producer();

async function startApolloServer() {
  ///// KAFKA

  await producer.connect();
  // await kafkaHandlerService.init();
  // registerPubSub(kafkaHandlerService.pubSub!);

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    // plugins: plugins,
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });
  // Modified server startup
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  // fetch("http:localhost:5555/allUsers");
}

startApolloServer();
