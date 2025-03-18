import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    greetings: String
  }
`;

const resolvers: any = {
  Query: {
    greetings: () => "Hello World!",
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const standAloneApolloServer = startStandaloneServer(apolloServer, {
  listen: {
    port: parseInt(process.env.APOLLO_PORT || "3001", 10),
  },
});

export default standAloneApolloServer;
