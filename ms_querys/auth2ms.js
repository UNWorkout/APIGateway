import axios from "axios";
import "dotenv/config";
import {unAuthError} from "../utils/index.js";

export const auth2ms_func_mutations = `
  createUser(
    name: String!
    lastName: String!
    birthDate: String!
    gender: String!
    cellPhone: String!
    email: String!
    password: String!
  ): MessageAuth

  loginUser(
    email: String!
    password: String!
  ): AuthLogin

`;

export const auth2ms_squemas = `
  type MessageAuth {
    msg: String
  }

  type AuthLogin {
    msg: String
    token: String
  }

  type UserEmail {
    msg: String
    email: String
  }
`;

export const auth2ms_func_querys = `
  getUserEmailById(id: String!): UserEmail
`;

export const auth2ms_mutations = {
    createUser: async (_, args, ctx) => {

      console.log(JSON.stringify(args))
      let result
      try{
        result = await axios.post(
          `http://${process.env.NAME}:${process.env.PORT_AUTH2MS}/api/`,
        args
      );
        }catch(e){
          console.error(e)
        }
      console.log(result)
      return result.data;
    },
    loginUser: async (_, args, ctx) => {

      const result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_AUTH2MS}/api/login`,
        args
      );
      return result.data;
    },
  };

export const auth2ms_querys = {
  getUserEmailById: async (_, args, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    const result = await axios.get(
      `http://${process.env.NAME}:${process.env.PORT_AUTH2MS}/api/iduser/${args.id}`
    );
    return result.data;
  },
};