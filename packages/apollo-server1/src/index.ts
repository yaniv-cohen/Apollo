import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import {
  addBookToAuthorByName,
  AuthorsLogic,
  BooksLogic,
  createAuthor,
  createBook,
} from "./logic/resolversLogic.js";

const booksLogic = new BooksLogic();
const authorsLogic = new AuthorsLogic();

const typeDefs = gql`
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

  input BookInput {
    author: String
    country: String
    imageLink: String
    language: String
    link: String
    pages: Int
    title: String
    year: Int
    id: String
  }

  type Author {
    name: String
    books: [String]
    id: ID
    age: Int
    alive: Alive
  }

  input AuthorInput {
    name: String
    books: [String]
    id: ID
    age: Int
    alive: AliveInput
  }

  type Alive {
    isAlive: Boolean!
    reason: String
  }

  input AliveInput {
    isAlive: Boolean!
    reason: String
  }

  type Query {
    GetBooks: [Book]
    GetBookById(id: String!): Book
    GetBooksWrittenBeforeYear(year: Int!): [Book]
    GetBooksByAuthor(author: String!): [Book]
    GetAuthors: [Author]
    GetAuthorById(id: String!): Author
    GetLivingAuthors: [Author]
    GetBooksBySameAuthor(id: String!): [String]
    GetBooksByAuthorsWithMoreBooksThan(minAmount: Int!): [Book]
    GetAuthorByName(name: String!): Author
  }

  type Mutation {
    CreateBook(newBook: BookInput): Book
    CreateAuthor(newAuthor: AuthorInput): Author
    AddBookToAuthorByName(name: String, title: String): Author
  }
`;

const resolvers = {
  Query: {
    GetBooks: () => booksLogic.getBooks(),
    GetBooksByAuthorsWithMoreBooksThan: (_, { minAmount }) =>
      booksLogic.getBooksByAuthorsWithMoreBooksThan(minAmount),
    GetBookById: (_, { id }) => booksLogic.getBookById(id),
    GetBooksWrittenBeforeYear: (_, { year }) =>
      booksLogic.getBooksWrittenBeforeYear(year),
    GetBooksByAuthor: (_, { author }) => booksLogic.getBooksByAuthor(author),
    GetAuthors: () => authorsLogic.getAuthors(),
    GetAuthorById: (_, { id }) => authorsLogic.getAuthorById(id),
    GetLivingAuthors: () => authorsLogic.getLivingAuthors(),
    GetBooksBySameAuthor: (_, { id }) =>
      booksLogic.getBooksWithSameAuthorOfBookId(id), //very lonnnngggg
    GetAuthorByName: (_, { name }) => {
      return authorsLogic.getAuthorByName(name);
    },
  },
  Mutation: {
    CreateBook: (_, { newBook }) => {
      const addedBook = createBook(newBook);
      console.log("added", addedBook);
      return addedBook;
    },
    CreateAuthor: (_, { newAuthor }) => {
      const addedAuthor = createAuthor(newAuthor);
      console.log("added", addedAuthor);
      return addedAuthor;
    },
    AddBookToAuthorByName: (_, { name, title }) => {
      const updatedAuthor = addBookToAuthorByName(name, title);
      console.log("updated to ", updatedAuthor);
      return updatedAuthor;
    },
  },
};

// const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const app = express();
await server.start();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
