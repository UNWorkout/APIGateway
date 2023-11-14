import axios from "axios";
import "dotenv/config";

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
`
;

export const auth2ms_mutations = {
    createUser: async (_, args) => {
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
    loginUser: async (_, args) => {
      const result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_AUTH2MS}/api/login`,
        args
      );
      return result.data;
    },
  };