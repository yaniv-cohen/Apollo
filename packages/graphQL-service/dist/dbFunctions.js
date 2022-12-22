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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsersByDiplomaTitle = exports.addDiplomaToUserId = exports.deleteDiploma = exports.deleteUser = exports.updateColumnInUserById = exports.getAllDiplomas = exports.getAllUsersByColumn = exports.getAllUsers = exports.getUserByID = exports.getDiplomaById = void 0;
const axios_1 = __importDefault(require("axios"));
const kafkaHandler_1 = require("./kafkaHandler");
const getDiplomaById = (diplomaId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("axios to /getDiplomaById?id=" + diplomaId);
    return axios_1.default.get("http://localhost:5555/getDiplomaById?id=" + diplomaId);
});
exports.getDiplomaById = getDiplomaById;
const getUserByID = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("axios to /getUserById", userId);
    return axios_1.default.get("http://localhost:5555/getUserById?id=" + userId);
});
exports.getUserByID = getUserByID;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("axios to /getAllUsers");
    return axios_1.default.get("http://localhost:5555/getAllUsers");
});
exports.getAllUsers = getAllUsers;
const getAllUsersByColumn = (columnName, value) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("http://localhost:5555/getAllUsersByColumn", {
        data: { columnName, value },
    });
    console.log(response.data);
    return response.data;
});
exports.getAllUsersByColumn = getAllUsersByColumn;
const getAllDiplomas = () => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.get("http://localhost:5555/getAllDiplomas");
});
exports.getAllDiplomas = getAllDiplomas;
const updateColumnInUserById = (userId, columnName, newValue) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("send update request with id of ", userId);
    return (0, kafkaHandler_1.sendRequestMessage)({
        action: "update:user",
        id: userId,
        data: {
            columnName: columnName,
            newValue: (_a = newValue.stringValue) !== null && _a !== void 0 ? _a : newValue.intValue,
        },
        text: "please update user id " + userId,
        itemType: "user",
    });
});
exports.updateColumnInUserById = updateColumnInUserById;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("send post request with id of ", userId);
    return (0, kafkaHandler_1.sendRequestMessage)({
        action: "delete:user",
        id: userId,
        data: {},
        text: "please delete user id " + userId,
        itemType: "user",
    });
});
exports.deleteUser = deleteUser;
const deleteDiploma = (diplomaId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("send post request with id of ", diplomaId);
    return (0, kafkaHandler_1.sendRequestMessage)({
        action: "delete:diploma",
        id: diplomaId,
        data: {},
        text: "please delete diploma id " + diplomaId,
        itemType: "diploma",
    });
});
exports.deleteDiploma = deleteDiploma;
const addDiplomaToUserId = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("addDiplomaToUserId");
    return (0, kafkaHandler_1.sendRequestMessage)({
        action: "create:diplomaToUserId",
        id: userId,
        data: data,
        text: "please create a diploma",
        itemType: "diploma",
    });
});
exports.addDiplomaToUserId = addDiplomaToUserId;
const getUsersByDiplomaTitle = (diplomaTitle) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("diplomaTItle axios:", diplomaTitle);
    const ans = (yield axios_1.default.get("http://localhost:5555/getUsersByDiplomaTitle?title=" + diplomaTitle)).data;
    return ans;
});
exports.getUsersByDiplomaTitle = getUsersByDiplomaTitle;
const createUser = (first_name = "gfhgf", email = "emaildsadas", last_name = "last_namedasd", country = "randmmmm country") => __awaiter(void 0, void 0, void 0, function* () {
    return axios_1.default.post("http://localhost:5555/createUser", {
        first_name: first_name,
        email: email,
        last_name: last_name,
        country: country,
    });
});
exports.createUser = createUser;
///
