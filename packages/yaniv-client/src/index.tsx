import * as React from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";

import {
  split,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  gql,
  ApolloClient,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const DIPLOMAS_SUBSCRIPTION = gql`
  subscription OnDiplomaAdded() {
    diplomaAdded() {
      id
      ti
    }
  }
`;
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
  })
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const client = ...

root.render(
  <React.StrictMode>
    {/* <ApolloProvider client={client}> */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
    {/* </ApolloProvider> */};
  </React.StrictMode>
);

/////////////////////////////
