import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { Kafka } from "kafkajs";
import express from "express";
import http from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";

const schema = makeExecutableSchema({ typeDefs, resolvers });

const KafkaPort = "localhost:9092";
export const kafka = new Kafka({
  brokers: [KafkaPort],
});
export const producer = kafka.producer();

const extractSubscriptionContext = async () => {
  return "aaaaaaaaaa";
};

async function startApolloServer() {
  await producer.connect();

  const app = express();
  const httpServer = http.createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: extractSubscriptionContext,
    },
    {
      server: httpServer,
      path: "/",
    }
  );
  const plugins = [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ];

  const server = new ApolloServer({
    schema,
    plugins,
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4005 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4005${server.graphqlPath}`);
}

(async () => startApolloServer())();
