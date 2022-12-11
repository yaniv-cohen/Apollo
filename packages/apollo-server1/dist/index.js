import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
// import { ApolloServer } from "@apollo/server";
// import { ApolloServer } from "apollo-server-express";
import Books from "../database/books.js";
import Authors from "../database/authors.js";
import { BooksLogic, createBook, getAuthorById, getLivingAuthors, } from "./logic/resolversLogic.js";
const booksLogic = new BooksLogic();
// import { gql } from "apollo-server-core";
// import resolvers from "./resolvers";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// console.log(Books.find((book) => book.id === "5"));
const typeDefs = gql `
  type Book {
    author: String
    country: String
    imageLink: String
    language: String
    link: String
    pages: Int
    title: String
    year: Int
    id: ID
  }

  type Author {
    name: String
    books: [String]
    id: ID
    age: Int
    alive: Alive
  }

  type Alive {
    is_alive: Boolean!
    reason: String
  }

  input BookInput {
    author: String
    country: String
    imageLink: String
    language: String
    link: String
    title: String
    year: Int
    id: String
  }

  # type BooksList {
  #   books: [String]
  # }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    Books: [Book]
    BookById(id: String): Book
    BooksWrittenBeforeYear(year: Int): [Book]
    GetBooksByAuthor(author: String): [Book]

    Authors: [Author]
    GetAuthorById(id: String): Author
    GetLivingAuthors: [Author]
    GetBooksBySameAuthor(id: String): [String]
    GetBooksByAuthorsWithMoreBooksThan(minAmount: Int): [Book]
  }
  type Muatation {
    CreateBook(newBook: BookInput): Book
  }
`;
// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        Books: () => Books,
        GetBooksByAuthorsWithMoreBooksThan: (_, { minAmount }) => booksLogic.getBooksByAuthorsWithMoreBooksThan(minAmount),
        BookById: (_, { id }) => booksLogic.getBookById(id),
        BooksWrittenBeforeYear: (_, { year }) => booksLogic.getBooksWrittenBeforeYear(year),
        GetBooksByAuthor: (_, { author }) => booksLogic.getBooksByAuthor(author),
        Authors: () => Authors,
        GetAuthorById: (_, { id }) => getAuthorById(id),
        GetLivingAuthors: () => getLivingAuthors(),
        GetBooksBySameAuthor: (_, { id }) => booksLogic.getBooksBySameAuthor(id),
    },
    Muatation: {
        CreateBook: (_, args) => {
            // let newBook = {
            //   author: args.author,
            //   country: args.country,
            //   imageLink: args.imageLink,
            //   language: args.language,
            //   link: args.link,
            //   pages: args.pages,
            //   title: args.title,
            //   year: args.year,
            //   id: args.id,
            // };
            return createBook(args.newBook);
        },
    },
};
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
await server.start();
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
