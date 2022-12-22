import { prisma } from "../prismaInstance";

class UsersLogic {
  public async DeleteUser(userId: number) {
    console.log("need to DeleteUser", userId);
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
      return "success";
    } catch {
      return "fail";
    }
  }
  public async DeleteDiploma(diplomaId: number) {
    console.log("need to DeleteUser", diplomaId);
    try {
      await prisma.diploma.delete({
        where: { id: diplomaId },
      });
      return "success";
    } catch {
      return "fail";
    }
  }
  public async UpdateUserColumn(
    userId: number,
    columnName: string,
    newValue: string | number
  ) {
    console.log(
      "need to UpdateUserColumn",
      columnName,
      "to",
      newValue,
      "of user ",
      userId
    );
    try {
      let res = await prisma.user.update({
        where: { id: userId },
        data: {
          [columnName]: newValue,
        },
      });
      console.log("res");
      // console.log(res);

      return "success";
    } catch {
      return "fail";
    }
  }

  public async updateColumnInUserById(
    userId: number,
    columnName: string,
    newValue: string | number | null
  ) {
    try {
      const result = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          [columnName]: newValue,
        },
      });
      // console.log("result");
      return "success";
    } catch (e) {
      return "fail:" + e.message;
    }
  }

  async getAllUsers() {
    const result = await prisma.user.findMany({
      include: {
        diplomas: true,
      },
    });
    console.log("result");
    console.log(
      typeof result === "object"
        ? JSON.stringify(result[0]) + "\n ....more"
        : result
    );

    return result;
  }
  async getUserById(userId: number) {
    console.log("getting user of id :", userId);

    const result = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        diplomas: true,
      },
    });
    console.log(result);
    return result;
  }
  async getAllUsersByColumn(columnName: string, value?: string) {
    const result = await prisma.user.findMany({
      where: { [columnName]: value },
      include: {
        diplomas: true,
      },
    });
    return result;
  }
  async getUsersByDiplomaTitle(diplomaTitle: string) {
    const result = await prisma.user.findMany({
      where: {
        diplomas: {
          some: {
            title: diplomaTitle,
          },
        },
      },

      include: {
        diplomas: true,
      },
      // select: {
      //   diplomaType: true,
      //   title: true,
      //   User: {
      //     select: {
      //       id: true,
      //       first_name: true,
      //       last_name: true,
      //     },
      //   },
      // },
    });
    return result;
  }
}

export const usersLogic = new UsersLogic();
