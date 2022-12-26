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
exports.extractPayload = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
const graphql_1 = require("graphql");
const cors_1 = __importDefault(require("cors"));
const kafkaHandlerService_copy_1 = __importDefault(require("./kafkaHandlerService copy"));
const extractPayload = (kafkaMessage) => {
    if (!Buffer.isBuffer(kafkaMessage.value)) {
        return kafkaMessage;
    }
    return JSON.parse(kafkaMessage.value.toString("utf-8"));
};
exports.extractPayload = extractPayload;
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
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        process.setMaxListeners(0);
        const app = (0, express_1.default)();
        app.use(express_1.default.json({ limit: "50mb" }));
        if (config.useAuth) {
            auth.setAllowNoToken(config.authAllowNoToken);
            yield auth.initialize(config.authIssuerUrl, config.authClientId, config.authClientSecret, config.authRedirectUrl, config.authCallbackRedirectUrl);
            app.use((0, cors_1.default)({
                credentials: true,
                origin: config.authCorsOrigins,
            }));
            app.get("/auth/callback", auth.callback.bind(auth));
            app.get("/auth/login", auth.login.bind(auth));
            app.use(auth.middleware.bind(auth));
            app.use("/auth/test", auth.test.bind(auth));
        }
        const httpServer = config.useHttps
            ? https_1.default.createServer(getHttpsOptions(), app)
            : http_1.default.createServer(app);
        const subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
            schema,
            execute: graphql_1.execute,
            subscribe: graphql_1.subscribe,
        }, { server: httpServer, path: "/graphql" });
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
        if (config.environment === "prod") {
            plugins.push((0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)({
                cdnUrl: config.cdnUrl,
                version: "1.0.0",
            }));
        }
        try {
            yield kafkaHandlerService_copy_1.default.init();
            registerPubSub(kafkaHandlerService_copy_1.default.pubSub);
        }
        catch (e) {
            console.log("Could not connect to kafka");
        }
        yield new Promise((resolve) => httpServer.listen(8799, resolve));
        console.log(`🚀 Server ready at http://localhost:${config.port.toString()}${server.graphqlPath}`);
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () { return startApolloServer(); }))();
