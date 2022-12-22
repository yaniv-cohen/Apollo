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
exports.usersLogic = void 0;
const prismaInstance_1 = require("../prismaInstance");
class UsersLogic {
    DeleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("need to DeleteUser", userId);
            try {
                yield prismaInstance_1.prisma.user.delete({
                    where: { id: userId },
                });
                return "success";
            }
            catch (_a) {
                return "fail";
            }
        });
    }
    DeleteDiploma(diplomaId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("need to DeleteUser", diplomaId);
            try {
                yield prismaInstance_1.prisma.diploma.delete({
                    where: { id: diplomaId },
                });
                return "success";
            }
            catch (_a) {
                return "fail";
            }
        });
    }
    UpdateUserColumn(userId, columnName, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("need to UpdateUserColumn", columnName, "to", newValue, "of user ", userId);
            try {
                let res = yield prismaInstance_1.prisma.user.update({
                    where: { id: userId },
                    data: {
                        [columnName]: newValue,
                    },
                });
                console.log("res");
                // console.log(res);
                return "success";
            }
            catch (_a) {
                return "fail";
            }
        });
    }
    updateColumnInUserById(userId, columnName, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield prismaInstance_1.prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        [columnName]: newValue,
                    },
                });
                // console.log("result");
                return "success";
            }
            catch (e) {
                return "fail:" + e.message;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaInstance_1.prisma.user.findMany({
                include: {
                    diplomas: true,
                },
            });
            console.log("result");
            console.log(typeof result === "object"
                ? JSON.stringify(result[0]) + "\n ....more"
                : result);
            return result;
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getting user of id :", userId);
            const result = yield prismaInstance_1.prisma.user.findFirst({
                where: { id: userId },
                include: {
                    diplomas: true,
                },
            });
            console.log(result);
            return result;
        });
    }
    getAllUsersByColumn(columnName, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaInstance_1.prisma.user.findMany({
                where: { [columnName]: value },
                include: {
                    diplomas: true,
                },
            });
            return result;
        });
    }
    getUsersByDiplomaTitle(diplomaTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaInstance_1.prisma.user.findMany({
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
        });
    }
}
exports.usersLogic = new UsersLogic();
//# sourceMappingURL=user.js.map