// import { prisma } from ".";
import {
  addDiplomaToUserId,
  createUser,
  deleteDiploma,
  deleteUser,
  getAllDiplomas,
  getAllUsers,
  getAllUsersByColumn,
  getDiplomaById,
  getUserByID,
  getUsersByDiplomaTitle,
  updateColumnInUserById,
} from "./dbFunctions";
import { pubsub } from "./pubsubIniialiser";
import { CountryInput, DiplomaInput } from "./types";
export const resolvers = {
  Subscription: {
    userCreated: {
      // More on pubsub below
      subscribe: () => pubsub.asyncIterator(["DIPLOMA_CREATED"]),
    },
  },

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
      pubsub.publish("DIPLOMA_CREATED", {
        postCreated: { id: diplomaInput.diplomaCode },
      });

      return response;
    },
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
