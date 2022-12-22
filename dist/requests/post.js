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
exports.AddDiplomaToUserId = void 0;
const prismaInstance_1 = require("../prismaInstance");
function AddDiplomaToUserId(userId, diplomaInput) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("need to create", userId, diplomaInput);
        try {
            const result = yield prismaInstance_1.prisma.diploma.create({
                data: Object.assign(Object.assign({}, diplomaInput), { User: {
                        connect: {
                            id: userId,
                        },
                    } }),
            });
        }
        catch (_a) {
            console.log("error");
            return "error";
        }
        return "gjhjhg";
    });
}
exports.AddDiplomaToUserId = AddDiplomaToUserId;
//# sourceMappingURL=post.js.map