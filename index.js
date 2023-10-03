import { ApolloServer, gql } from "apollo-server";
import {
  videos_func_querys,
  videos_querys,
  videos_squemas,
  videos_mutations,
  videos_func_mutations,
} from "./ms_querys/videos.js";

import {
  auth_querys,
  auth_func_querys,
  auth_func_mutations,
  auth_squemas,
  auth_mutations
} from "./ms_querys/auth.js"

const typeDefs = gql`

  ${videos_squemas}

  ${auth_squemas}

  type Query {
    ${videos_func_querys}
    ${auth_func_querys}
  }

  type Mutation {
    ${videos_func_mutations}
    ${auth_func_mutations}
  }
`;

const resolvers = {
  Query: { ...videos_querys, ...auth_querys },
  Mutation: { ...videos_mutations, ...auth_mutations },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
