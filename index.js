import { ApolloServer, gql } from "apollo-server";
import {
  videos_func_querys,
  videos_querys,
  videos_squemas,
} from "./ms_querys/videos.js";

import {
  routines_func_querys,
  routines_querys,
  routines_squemas,
  routines_mutations,
  routines_func_mutations,
} from "./ms_querys/routines.js";

import {
  crono_schemas,
  crono_func_mutations,
  crono_mutations,
} from "./ms_querys/crono.js";

import {
  auth2ms_func_mutations,
  auth2ms_squemas,
  auth2ms_mutations,
  auth2ms_func_querys,
  auth2ms_querys,
} from "./ms_querys/auth2ms.js";

import {validateToken} from "./utils/index.js";

const typeDefs = gql`

  ${videos_squemas}

  ${routines_squemas}

  ${crono_schemas}

  ${auth2ms_squemas}

  type Query {
    ${videos_func_querys}
    ${routines_func_querys}
    ${auth2ms_func_querys}
  }

  type Mutation {
    ${routines_func_mutations}
    ${crono_func_mutations}
    ${auth2ms_func_mutations}
  }
`;

const resolvers = {
  Query: { ...videos_querys, ...routines_querys ,...auth2ms_querys},
  Mutation: { ...routines_mutations, ...crono_mutations,...auth2ms_mutations},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.auth || '';
    const user = validateToken(token);
    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}`);
});
