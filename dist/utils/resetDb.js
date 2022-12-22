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
exports.resetDbData = void 0;
const datasheets_1 = require("../data/datasheets");
const sendActionMessage_1 = require("../kafka/sendActionMessage");
const prismaInstance_1 = require("../prismaInstance");
const resetDbData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("resetting data");
    yield prismaInstance_1.prisma.user.deleteMany({});
    yield prismaInstance_1.prisma.diploma.deleteMany({});
    yield prismaInstance_1.prisma.skill.deleteMany({});
    yield prismaInstance_1.prisma.user.createMany({
        data: datasheets_1.dbUsers,
    });
    datasheets_1.dbInstitutes.forEach((inst) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prismaInstance_1.prisma.institute.create({
                data: inst,
            });
        }
        catch (e) {
            console.log(inst, "problem");
            console.log(e.message);
        }
    }));
    yield (0, sendActionMessage_1.sendActionMessage)("EmptyDb", "Empty All DbB");
});
exports.resetDbData = resetDbData;
//# sourceMappingURL=resetDb.js.map