import { ApolloServer, gql } from "apollo-server";
import {
  videos_func_querys,
  videos_querys,
  videos_squemas,
  videos_mutations,
  videos_func_mutations,
} from "./ms_querys/videos.js";

const typeDefs = gql`

  ${videos_squemas}

  type Query {
    ${videos_func_querys}
  }

  type Mutation {
    ${videos_func_mutations}
  }
`;

const resolvers = {
  Query: { ...videos_querys },
  Mutation: { ...videos_mutations },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
