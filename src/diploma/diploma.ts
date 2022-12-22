import { create } from "domain";
import { prisma } from "../prismaInstance";
import { DiplomaInput } from "../types";

export async function getDiplomaById(diplomaId: number) {
  const result = await prisma.diploma.findFirst({
    where: {
      id: diplomaId,
    },
    include: {
      User: true,
    },
  });
  // console.log("result");
  return result;
}
export async function AddDiplomaToUserById(
  userId: number,
  {
    diplomaCode,
    title,
    diplomaType,
  }: {
    diplomaCode: number;
    title: string;
    diplomaType: string | null;
    instituteName?: string;
  }
) {
  console.log(
    "need to create for user",
    userId,
    "data:",
    diplomaCode,
    title,
    diplomaType
  );
  try {
    let response = await prisma.diploma.upsert({
      where: {
        diplomaCode: diplomaCode,
      },
      update: {
        diplomaCode: diplomaCode,
        title: title,
        diplomaType: diplomaType,
        // instituteName: false ? "" : null,
        User: {
          connect: {
            id: userId,
          },
        },
        institute: {
          connect: {
            name: instituteName + "",
          },
        },
      },
      create: {
        // id: diplomaId,
        title: title,
        diplomaType: diplomaType,
        diplomaCode: diplomaCode,
        User: {
          connect: {
            id: userId,
          },
        },
      }, ////wat?
    });
    console.log("upsert message:");
    console.log(response);

    return "success";
  } catch (e) {
    console.log("error:");
    console.log(e.message);

    return "fail";
  }
}
// export async function AddDiplomaToUserIds(
//   userIds: number[],
//   diplomaInput: DiplomaInput
// ) {
//   console.log("need to create", userIds, diplomaInput);
//   userIds.forEach(async (userId) => {
//     try {
//       const result = await prisma.diploma.create({
//         data: {
//           ...diplomaInput,
//           User: {
//             connect: {
//               id: userId,
//             },
//           },
//         },
//       });
//     } catch {
//       console.log("error");

//       return "error";
//     }
//   });

//   return "successfully added new diploma";
// }

export async function getAllDiplomas() {
  const result = await prisma.diploma.findMany({
    include: {
      User: true,
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
