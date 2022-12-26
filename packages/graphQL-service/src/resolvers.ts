import {
  addDiplomaToUserId,
  deleteDiploma,
  deleteUser,
  getAllDiplomas,
  getAllUniversities,
  getAllUsers,
  getAllUsersByColumn,
  getDiplomaById,
  getUserByID,
  getUsersByDiplomaTitle,
  updateColumnInUserById,
} from "./dbFunctions";
import { DiplomaInput } from "./types";
import { KafkaPubSub } from "graphql-kafkajs-subscriptions";

let _pubSub: KafkaPubSub | undefined = undefined;

export const getGraphqlPubSub = () => _pubSub;

export const resolvers = {
  Subscription: {
    diplomaCreated: {
      resolve: () => "test subscription!!!!",
      subscribe: () => getGraphqlPubSub()!.asyncIterator(["CREATED_DIPLOMA"]),
    },
  },

  // Subscription: {
  //   subscribeToOperationEntities: {
  //     resolve: (message) => extractPayload(message).subscribeToOperationEntities,
  //     subscribe: () => getGraphqlPubSub().asyncIterator(["OPERATION_SUBSCRIPTION"]),
  //   },
  // },

  Mutation: {
    UpdateColumnInUserById: async (
      _: unknown,
      {
        userId,
        columnName,
        newValue,
      }: {
        userId: number;
        columnName: string;
        newValue: { stringValue: string | null; intValue: number | null };
      }
    ) => {
      console.log(
        "UpdateColumnInUserById resolver ",
        userId,
        columnName,
        newValue
      );
      return await updateColumnInUserById(userId, columnName, newValue);
    },
    DeleteUser: async (
      _: unknown,
      { userId }: { userId: number }
    ): Promise<string> => {
      console.log("resolver of delete with id ", userId);
      return await deleteUser(userId);
    },
    DeleteDiploma: async (
      _: unknown,
      { diplomaId }: { diplomaId: number }
    ): Promise<string> => {
      console.log("resolver of delete with id ", diplomaId);
      return await deleteDiploma(diplomaId);
    },
    AddDiplomaToUserId: async (
      _: unknown,
      { userId, diplomaInput }: { userId: number; diplomaInput: DiplomaInput }
    ) => {
      console.log("AddDiplomaToUserId resolver data: ", userId, diplomaInput);
      const response = await addDiplomaToUserId(userId, diplomaInput);
      await _pubSub?.publish("CREATED_DIPLOMA", "A diploma was created!!!!");

      return response;
    },
    // ConnectDiplomaToUniversity: async (
    //   _: unknown,
    //   { diplomaId, universityId }: { diplomaId: number; universityId: number }
    // ) => {
    //   console.log(
    //     "ConnectDiplomaToUni resolver data: ",
    //     diplomaId,
    //     universityId
    //   );
    //   // const response = await connectDiplomaToUniversity({
    //   //   diplomaId,
    //   //   universityId,
    //   // });
    //   // await pubsub?.publish("DIPLOMA_CREATED", "a diploma was created");

    //   return response;
    // },
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
    GetAllUniversities: async () => {
      const response = await getAllUniversities();
      console.log("returning ", response[0]);

      return response;
    },
    GetAllUsersByColumn: async (
      _: unknown,
      { columnName, value }: { columnName: string; value: string }
    ) => {
      console.log("getting All users by ", columnName, value);
      const response = await getAllUsersByColumn(columnName, value);
      console.log(response);

      return response;
    },
    GetDiplomaById: async (
      _: unknown,
      { diplomaId }: { diplomaId: number }
    ) => {
      console.log("gggetting diplomaId " + diplomaId);
      const response = await getDiplomaById(diplomaId);

      return response.data;
    },
    GetAllDiplomas: async () => {
      console.log("getting All Diplomas");
      const response = await getAllDiplomas();
      // console.log(typeof response.data);

      console.log(
        typeof response.data === "object" ? response.data[0] : response.data
      );
      return response.data;
      // return prisma.user.findMany();
    },
    GetUserById: async (_: unknown, { id }: { id: number }) => {
      console.log(id);

      console.log("getting user Id", id);
      const response = await getUserByID(id);
      // console.log(typeof response.data);

      // console.log(
      //   typeof response.data === "object" ? response.data[0] : response.data
      // );
      return response.data;
    },
    GetAllUsers: async () => {
      console.log("getting AllUsers");
      const response = await getAllUsers();
      // console.log(typeof response.data);

      console.log(
        typeof response.data === "object" ? response.data[0] : response.data
      );
      return response.data;
      // return prisma.user.findMany();
    },
    GetUsersByDiplomaTitle: async (
      _: unknown,
      { diplomaTItle }: { diplomaTItle: string }
    ) => {
      console.log("getting Users By diploma title:", diplomaTItle);
      const response = await getUsersByDiplomaTitle(diplomaTItle);
      return response;
    },
  },
};
