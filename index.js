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

import {
  routines_func_querys,
  routines_querys,
  routines_squemas,
  routines_mutations,
  routines_func_mutations,
} from "./ms_querys/routines.js";

import {
  users_func_querys,
  users_querys,
  users_squemas,
  users_mutations,
  users_func_mutations,
} from "./ms_querys/users.js";

import {
  crono_schemas,
  crono_func_mutations,
  crono_mutations,
} from "./ms_querys/crono.js";

const typeDefs = gql`

  ${videos_squemas}

  ${auth_squemas}

  ${routines_squemas}

  ${users_squemas}

  ${crono_schemas}

  type Query {
    ${videos_func_querys}
    ${auth_func_querys}
    ${routines_func_querys}
    ${users_func_querys}
  }

  type Mutation {
    ${videos_func_mutations}
    ${auth_func_mutations}
    ${routines_func_mutations}
    ${users_func_mutations}
    ${crono_func_mutations}
  }
`;

const resolvers = {
  Query: { ...videos_querys, ...auth_querys, ...routines_querys , ...users_querys},
  Mutation: { ...videos_mutations, ...auth_mutations, ...routines_mutations, ...users_mutations,...crono_mutations},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
