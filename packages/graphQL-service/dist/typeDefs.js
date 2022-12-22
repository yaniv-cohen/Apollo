"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
type Diploma{
  id:          Int!
  diplomaCode: Int!
  title:       String!
  diplomaType: String
  User:        User
  userId:      Int!
}

type Skill{
  id:          Int!
  name:        String!
  category:    String
  expereience: String
  User:        [User]
}

input diplomaInput {
  diplomaCode: Int!
  title:       String!
  diplomaType: String
}



input StringOrInt {
  stringValue: String
  intValue: Int
}

type User {
  id:          Int!        
  first_name:  String!
  last_name:   String!
  age :        Int
  email:       String!
  country:     String
  gender:      String
  diplomas:    [Diploma]
}


type Mutation {
AddDiplomaToUserId(userId: Int!, diplomaInput: diplomaInput!) : String
DeleteUser(userId: Int!): String
DeleteDiploma(diplomaId: Int!): String
UpdateColumnInUserById(userId: Int!, columnName:String!, newValue: StringOrInt): String
}

type Query {
  GetUserById(id: Int!): User
  GetAllUsers: [User!]!
  GetDiplomaById(diplomaId: Int!): Diploma
  GetAllUsersByColumn(columnName:String!, value:String!): [User]
  GetAllDiplomas: [Diploma!]
  AllUsersFromCountry(desiredCountry : String!): [User]
  GetUsersByDiplomaTitle(diplomaTItle: String!): [User]
}

type Subscription {
  userCreated: String!
  }
`;
