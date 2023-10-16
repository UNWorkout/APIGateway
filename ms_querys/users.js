import axios from "axios";
import "dotenv/config";

export const users_func_querys = `
  allusers: [User]
`;

export const users_func_mutations = `
  addUser(
    nombres: String
    apellidos: String
    fecha_nacimiento: String
    sexo: String
    cel: Float
    email: String
  ): String
`;

export const users_squemas = `
  type User {
    id_usuario: ID!
    nombres: String
    apellidos: String
    fecha_nacimiento: String
    sexo: String
    cel: Float
    email: String
  }
`;

export const users_querys = {
  allusers: async () => {
    const result = await axios.get(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`
    );
    return result.data;
  },
};

export const users_mutations = {
  addUser: async (_, args) => {
    const result = await axios.post(
      `http://${process.env.NAME_USERS}:${process.env.PORT_USERS}/user`,
      args
    );
    return result.data;
  }  
};
