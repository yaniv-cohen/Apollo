import axios from "axios";
import { DiplomaInput } from "./types";
import { producer } from "./server";
import { sendRequestMessage } from "./kafkaHandler";
export const getDiplomaById = async (diplomaId: number) => {
  console.log("axios to /getDiplomaById?id=" + diplomaId);

  return axios.get("http://localhost:5555/getDiplomaById?id=" + diplomaId);
};
export const getUserByID = async (userId: number) => {
  console.log("axios to /getUserById", userId);

  return axios.get("http://localhost:5555/getUserById?id=" + userId);
};
export const getAllUsers = async () => {
  console.log("axios to /getAllUsers");

  return axios.get("http://localhost:5555/getAllUsers");
};
export const getAllUniversities = async () => {
  const response = await axios.get("http://localhost:5555/getAllUniversities");
  // console.log(response.data);
  return response.data;
};
export const getAllUsersByColumn = async (
  columnName: string,
  value: string
) => {
  const response = await axios.get(
    "http://localhost:5555/getAllUsersByColumn",
    {
      data: { columnName, value },
    }
  );
  console.log(response.data);
  return response.data;
};

export const getAllDiplomas = async () => {
  return axios.get("http://localhost:5555/getAllDiplomas");
};
export const updateColumnInUserById = async (
  userId: number,
  columnName: string,
  newValue: { stringValue: string | null; intValue: number | null }
) => {
  console.log("send update request with id of ", userId);
  return sendRequestMessage({
    action: "update:user",
    id: userId,
    data: {
      columnName: columnName,
      newValue: newValue.stringValue ?? newValue.intValue,
    },
    text: "please update user id " + userId,
    itemType: "user",
  });
};
export const deleteUser = async (userId: number) => {
  console.log("send post request with id of ", userId);
  return sendRequestMessage({
    action: "delete:user",
    id: userId,
    data: {},
    text: "please delete user id " + userId,
    itemType: "user",
  });
};
export const deleteDiploma = async (diplomaId: number) => {
  console.log("send post request with id of ", diplomaId);
  return sendRequestMessage({
    action: "delete:diploma",
    id: diplomaId,
    data: {},
    text: "please delete diploma id " + diplomaId,
    itemType: "diploma",
  });
};
export const addDiplomaToUserId = async (
  userId: number,
  data: DiplomaInput
) => {
  console.log("addDiplomaToUserId");

  return sendRequestMessage({
    action: "create:diplomaToUserId",
    id: userId,
    data: data,
    text: "please create a diploma",
    itemType: "diploma",
  });
};
export const connectDiplomaToUniversity = async (data: any) => {
  console.log("connectDiplomaToUniversity");

  return sendRequestMessage({
    action: "connect:diplomaToUniversity",
    id: data.diplomaId,
    data: { data },
    text: "please connect a diploma to uni ",
    itemType: "diploma",
  });
};

export const getUsersByDiplomaTitle = async (diplomaTitle: string) => {
  console.log("diplomaTItle axios:", diplomaTitle);

  const ans = (
    await axios.get(
      "http://localhost:5555/getUsersByDiplomaTitle?title=" + diplomaTitle
    )
  ).data;

  return ans;
};

export const createUser = async (
  first_name: string = "gfhgf",
  email: string = "emaildsadas",
  last_name: string = "last_namedasd",
  country: string = "randmmmm country"
) => {
  return axios.post("http://localhost:5555/createUser", {
    first_name: first_name,
    email: email,
    last_name: last_name,
    country: country,
  });
};

///
