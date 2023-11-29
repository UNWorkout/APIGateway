import axios from "axios";
import "dotenv/config";

export const crono_func_mutations = `
  notificarRutina(
    email: String!
    dias_semana: [ExercisedayInput]
  ): NotificationResponse

  sendMail(
    destinatario: String!
    asunto: String!
    mensaje: String!
  ): NotificationResponse
`;

export const crono_schemas = `
  type NotificationResponse {
    msg: String
  }

  input ExercisedayInput {
    dia: String
    ejercicios: [Int]
    Duracion_Max: Int
    Hora_inicio: String
  }
`;

export const crono_mutations = {
  notificarRutina: async (_, args, ctx) => {
    let result
    try{
      result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_CRONO}/api/cronjob`,
        args
      );
    }catch(e){console.error(e)}
    if (!result || !result.data) {
      throw new Error('No se recibió respuesta del servicio de correo');
    }
    console.log(result)

    return result.data;
  },
  sendMail: async (_, args, ctx) => {
    let result
    try{
      result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_CRONO}/api/enviar`,
        args
      );
    }catch(e){console.error(e)}
    if (!result || !result.data) {
      throw new Error('No se recibió respuesta del servicio de correo');
    }
    console.log(result)
    return result.data;
  },
};