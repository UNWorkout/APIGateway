import axios from "axios";
import "dotenv/config";

export const crono_func_mutations = `
  notificarUsuario(id: ID!): CronoResponse
`;

export const crono_schemas = `
  type CronoResponse {
    message: String
  }
`;

export const crono_mutations = {
    notificarUsuario: async (_, { id }) => {
        try {
        const result = await axios.post(
            `http://localhost:3000/api/notificaciones/notificar/${id}`
        );
        return { message: result.data.message };
        } catch (error) {
        console.error(error);
        return { message: "Error al notificar al usuario" };
        }
    },
};