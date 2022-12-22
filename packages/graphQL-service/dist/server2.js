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
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
    },
];
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Subscription {
  bookAdded: Book
}
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
const resolvers = {
    Query: {
        books: () => books,
    },
};
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // The ApolloServer constructor requires two parameters: your schema
        // definition and your set of resolvers.
        const server = new server_1.ApolloServer({
            typeDefs,
            resolvers,
        });
        // Passing an ApolloServer instance to the `startStandaloneServer` function:
        //  1. creates an Express app
        //  2. installs your ApolloServer instance as middleware
        //  3. prepares your app to handle incoming requests
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at: ${url}`);
    });
}
