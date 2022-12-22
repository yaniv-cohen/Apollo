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
    getAllDiplomas() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaInstance_1.prisma.diploma.findMany();
            console.log("result");
            console.log(typeof result === "object"
                ? JSON.stringify(result[0]) + "\n ....more"
                : result);
            return result;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaInstance_1.prisma.user.findMany();
            console.log("result");
            console.log(typeof result === "object"
                ? JSON.stringify(result[0]) + "\n ....more"
                : result);
            return result;
        });
    }
    getUsersByDiplomaTitle(diplomaTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prismaInstance_1.prisma.diploma.findMany({
                where: { title: diplomaTitle },
                select: {
                    diplomaType: true,
                    title: true,
                    User: {
                        select: {
                            id: true,
                            first_name: true,
                            last_name: true,
                        },
                    },
                },
            });
            return result;
        });
    }
}
exports.usersLogic = new UsersLogic();
//# sourceMappingURL=get.js.map