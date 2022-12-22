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
exports.resolvers = void 0;
// import { prisma } from ".";
const dbFunctions_1 = require("./dbFunctions");
const pubsubIniialiser_1 = require("./pubsubIniialiser");
exports.resolvers = {
    Subscription: {
        userCreated: {
            // More on pubsub below
            subscribe: () => pubsubIniialiser_1.pubsub.asyncIterator(["DIPLOMA_CREATED"]),
        },
    },
    Mutation: {
        UpdateColumnInUserById: (_, { userId, columnName, newValue, }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("UpdateColumnInUserById resolver ", userId, columnName, newValue);
            return yield (0, dbFunctions_1.updateColumnInUserById)(userId, columnName, newValue);
        }),
        DeleteUser: (_, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("resolver of delete with id ", userId);
            return yield (0, dbFunctions_1.deleteUser)(userId);
        }),
        DeleteDiploma: (_, { diplomaId }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("resolver of delete with id ", diplomaId);
            return yield (0, dbFunctions_1.deleteDiploma)(diplomaId);
        }),
        AddDiplomaToUserId: (_, { userId, diplomaInput }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("AddDiplomaToUserId resolver data: ", userId, diplomaInput);
            const response = yield (0, dbFunctions_1.addDiplomaToUserId)(userId, diplomaInput);
            pubsubIniialiser_1.pubsub.publish("DIPLOMA_CREATED", {
                postCreated: { id: diplomaInput.diplomaCode },
            });
            return response;
        }),
        // AddDiplomaToUserIds: async (
        //   _: unknown,
        //   {
        //     userIds,
        //     diplomasInput,
        //   }: { userIds: number[]; diplomasInput: DiplomasInput }
        // ) => {
        //   console.log("AddDiplomaToUserId resolver data: ", userIds, diplomasInput);
        //   const response: string[] = [];
        //   userIds.forEach(async (userId: number, index) => {
        //     if (index in diplomasInput.diplomaCode)
        //       response.push(
        //         (await addDiplomaToUserId(userId, {
        //           ...diplomasInput,
        //           diplomaCode: diplomasInput.diplomaCode[index]! + 0,
        //         })) +
        //           ":" +
        //           userId
        //       );
        //   });
        //   return response;
        // },
    },
    Query: {
        GetAllUsersByColumn: (_, { columnName, value }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("getting All users by ", columnName, value);
            const response = yield (0, dbFunctions_1.getAllUsersByColumn)(columnName, value);
            console.log(response);
            return response;
        }),
        GetDiplomaById: (_, { diplomaId }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("gggetting diplomaId " + diplomaId);
            const response = yield (0, dbFunctions_1.getDiplomaById)(diplomaId);
            return response.data;
        }),
        GetAllDiplomas: () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("getting All Diplomas");
            const response = yield (0, dbFunctions_1.getAllDiplomas)();
            // console.log(typeof response.data);
            console.log(typeof response.data === "object" ? response.data[0] : response.data);
            return response.data;
            // return prisma.user.findMany();
        }),
        GetUserById: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(id);
            console.log("getting user Id", id);
            const response = yield (0, dbFunctions_1.getUserByID)(id);
            // console.log(typeof response.data);
            // console.log(
            //   typeof response.data === "object" ? response.data[0] : response.data
            // );
            return response.data;
        }),
        GetAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            console.log("getting AllUsers");
            const response = yield (0, dbFunctions_1.getAllUsers)();
            // console.log(typeof response.data);
            console.log(typeof response.data === "object" ? response.data[0] : response.data);
            return response.data;
            // return prisma.user.findMany();
        }),
        GetUsersByDiplomaTitle: (_, { diplomaTItle }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("getting Users By diploma title:", diplomaTItle);
            const response = yield (0, dbFunctions_1.getUsersByDiplomaTitle)(diplomaTItle);
            return response;
        }),
    },
};
