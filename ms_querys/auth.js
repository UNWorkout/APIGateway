import axios from "axios";
import "dotenv/config";

export const auth_func_querys = `
  authByID(UserId: ID!): Login
`;

export const auth_func_mutations = `
  addAuth(
    UserId: ID!
    UserEmail: String
    UserPasswordHash: String
  ): Message

  updateAuth(
    UserId: ID!
    UserPasswordHash: String
  ): Login

  deleteAuth(UserId: ID!): Message
`;

export const auth_squemas = `
  type Message {
    message: String
  }

  type Login {
    UserId: ID!
    UserEmail: String
    UserPasswordHash: String
  }
`
;

export const auth_querys = {
    authByID: async (_, { UserId }) => {
      const result = await axios.get(
        `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${UserId}`
        );
        return result.data;
      },
    };
  
  export const auth_mutations = {
    addAuth: async (_, args) => {
        const result = await axios.post(
          `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/api/token`,
        args
      );
      return result.data;
    },
    updateAuth: async (_, args) => {
      const result = await axios.put(
        `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${args.ID}`,
        args
      );
      return result.data.videos;
    },
    deleteAuth: async (_, { ID }) => {
      const result = await axios.delete(
        `http://${process.env.NAME_AUTH}:${process.env.PORT_AUTH}/login/${ID}`
      );
      console.log(result.data)
      return result.data;
    },
  };