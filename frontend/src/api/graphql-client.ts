import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { apiUrls } from "./api-client";

export const graphqlClient = new ApolloClient({
  link: new HttpLink({ uri: apiUrls.graphql, credentials: "include" }),
  cache: new InMemoryCache(),
});
