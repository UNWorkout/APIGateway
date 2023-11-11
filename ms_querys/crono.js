import axios from "axios";
import "dotenv/config";

// Definiciones de tipos y mutaciones de GraphQL actualizadas
export const crono_func_mutations = `
  notificarUsuario(id: ID!): CronoResponse
`;

export const crono_schemas = `
  type CronoResponse {
    message: String
  }
`;

// Implementación de resolvers utilizando axios y manejo de errores
export const crono_mutations = {
  notificarUsuario: async (_, { id }) => {
    try {
      const result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_CRONO}/api/notificaciones/notificar/${id}`
      );
      return { message: result.data.message };
    } catch (error) {
      console.error(error);
      return { message: "Error al notificar al usuario" };
    }
  },
};