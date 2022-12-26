import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";
import express from "express";
import http from "http";
import https from "https";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";
import cors from "cors";

import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import kafkaHandlerServiceCopy from "./kafkaHandlerService copy";

export const extractPayload = (kafkaMessage: any) => {
  if (!Buffer.isBuffer(kafkaMessage.value)) {
    return kafkaMessage;
  }
  return JSON.parse(kafkaMessage.value.toString("utf-8"));
};

// const s3ProxyHandler = async (req, res, isImage) => {
//   // TODO check credentials, i.e., if requester can access the file
//   let key: string;
//   try {
//     const url = req.query.url;
//     key = new URL(url).pathname.substring(1);
//   } catch {
//     return res.status(400).send("Invalid url");
//   }

//   try {
//     if (isImage) {
//       const imageUrl = await s3.downloadImage(key, res);
//       res.status(301).redirect(imageUrl);
//     } else {
//       await s3.downloadFile(key, res);
//     }
//   } catch (err) {
//     if (err?.code === "NoSuchKey") {
//       return res.status(404).send("File not found");
//     }
//     console.error("Failed to proxy s3", err?.code);
//     res.status(500).end();
//   }
// };

const getHttpsOptions = () => {
  return {};
};

// const extractApolloContext = async ({ req }) => {
//   if (!config.useAuth) {
//     return anonymousUser;
//   }
//   //   const userInfo = await auth.getUserInfo(req);
//   //   if (!userInfo?.active) {
//   //     if (config.authAllowNoToken) {
//   //       return anonymousUser;
//   //     }
//   //     throw "Inactive token";
//   //   }
//   //   const userId = userInfo[config.authCompartGroupsUserInfoField];
//   let userGroups = [];
//   try {
//     // TODO use cache
//     const url = config.authCompartGroupsUrl.replace(":id", userId);
//     const { data } = await Axios.get(url, {
//       headers: {
//         [config.authCompartGroupsTokenHeader]:
//           config.authCompartGroupsTokenValue,
//       },
//     });
//     userGroups = data.map((x: any) => x.name);
//   } catch (e) {
//     console.warn(`Failed to get groups for userId=${userId}`, e);
//   }
//   return { userInfo, userId, userGroups };
// };

async function startApolloServer() {
  process.setMaxListeners(0);
  const app = express();
  app.use(express.json({ limit: "50mb" }));
  if (config.useAuth) {
    auth.setAllowNoToken(config.authAllowNoToken);
    await auth.initialize(
      config.authIssuerUrl,
      config.authClientId,
      config.authClientSecret,
      config.authRedirectUrl,
      config.authCallbackRedirectUrl
    );
    app.use(
      cors({
        credentials: true,
        origin: config.authCorsOrigins,
      })
    );
    app.get("/auth/callback", auth.callback.bind(auth));
    app.get("/auth/login", auth.login.bind(auth));
    app.use(auth.middleware.bind(auth));
    app.use("/auth/test", auth.test.bind(auth));
  }

  const httpServer = config.useHttps
    ? https.createServer(getHttpsOptions(), app)
    : http.createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "/graphql" }
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
  if (config.environment === "prod") {
    plugins.push(
      ApolloServerPluginLandingPageGraphQLPlayground({
        cdnUrl: config.cdnUrl,
        version: "1.0.0",
      })
    );
  }

  try {
    await kafkaHandlerServiceCopy.init();
    registerPubSub(kafkaHandlerServiceCopy.pubSub);
  } catch (e) {
    console.log("Could not connect to kafka");
  }

  await new Promise<void>((resolve) => httpServer.listen(8799, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${config.port.toString()}${
      server.graphqlPath
    }`
  );
}

(async () => startApolloServer())();
