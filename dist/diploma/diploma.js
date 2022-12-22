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
exports.getAllDiplomas = exports.AddDiplomaToUserById = exports.getDiplomaById = void 0;
const prismaInstance_1 = require("../prismaInstance");
function getDiplomaById(diplomaId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prismaInstance_1.prisma.diploma.findFirst({
            where: {
                id: diplomaId,
            },
            include: {
                User: true,
            },
        });
        // console.log("result");
        return result;
    });
}
exports.getDiplomaById = getDiplomaById;
function AddDiplomaToUserById(userId, { diplomaCode, title, diplomaType, }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("need to create for user", userId, "data:", diplomaCode, title, diplomaType);
        try {
            let response = yield prismaInstance_1.prisma.diploma.upsert({
                where: {
                    diplomaCode: diplomaCode,
                },
                update: {
                    diplomaCode: diplomaCode,
                    title: title,
                    diplomaType: diplomaType,
                    User: {
                        connect: {
                            id: userId,
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
        }
        catch (e) {
            console.log("error:");
            console.log(e.message);
            return "fail";
        }
    });
}
exports.AddDiplomaToUserById = AddDiplomaToUserById;
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
function getAllDiplomas() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield prismaInstance_1.prisma.diploma.findMany({
            include: {
                User: true,
            },
        });
        console.log("result");
        console.log(typeof result === "object"
            ? JSON.stringify(result[0]) + "\n ....more"
            : result);
        return result;
    });
}
exports.getAllDiplomas = getAllDiplomas;
//# sourceMappingURL=diploma.js.map