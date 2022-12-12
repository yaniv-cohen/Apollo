import fs from "fs";
// import data from "./authorsWithReason.json";
// export const Authors = fs.readFileSync("authorsWithReason.json", JSON);
export const Authors = await JSON.parse(
  fs.readFileSync("./authors.json", "utf8")
);
// console.log(Authors);

export default Authors;
