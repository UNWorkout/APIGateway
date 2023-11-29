import axios from "axios";
import "dotenv/config";
import {unAuthError} from "../utils/index.js";

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
    if (!ctx || !ctx.user) throw unAuthError;
    try{
      result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_CRONO}/api/cronjob`,
        args
      );
    }catch(e){console.error(e)}
    console.log(result)
    return result.data;
  },
  sendMail: async (_, args, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;
    try{
      result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_CRONO}/api/enviar`,
        args
      );
    }catch(e){console.error(e)}
    console.log(result)
    return result.data;
  },
};

