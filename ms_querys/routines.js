import axios from "axios";
import "dotenv/config";
import {unAuthError} from "../utils/index.js";

export const routines_func_querys = `
  routineUserDay(ID: ID!, DAY: String!): Exerciseday
  routineUser(ID: ID!): Routine
`;

export const routines_func_mutations = `
  addRoutine(
    usuario_id: ID!
    dias_semana: [ExercisedayInput]
  ): Routine

  updateRoutine(
    ID: ID!
    DAY: String
    ejercicios: [Int]
    Hora_inicio: String
    Duracion_Max: Int
  ): Routine

  deleteRoutine(ID: ID!): Routine
`;

export const routines_squemas = `
  type Routine {
    promedio: Float,
    _id: ID
    usuario_id: ID
    dias_semana: [Exerciseday]
  }

  type Exerciseday {
    _id: ID
    dia: String
    ejercicios: [Int]
    Duracion_Max: Int
    Hora_inicio: String
  }

  input ExercisedayInput {
    dia: String
    ejercicios: [Int]
    Duracion_Max: Int
    Hora_inicio: String
  }
`;

export const routines_querys = {
  routineUserDay: async (_, { ID, DAY }, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    const result = await axios.get(
      `http://${process.env.NAME}:${process.env.PORT_ROUTINES}/api/User/${ID}/${DAY}`
    );
    return result.data;
  },
  routineUser: async (_, { ID }, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    console.log(ID)
    let result
    try{
    result = await axios.get(
      `http://${process.env.NAME}:${process.env.PORT_ROUTINES}/api/User/${ID}`
    );
    }catch(e){
      console.error(e)
    }
    console.log(result)
    return result.data;
  },
};

export const routines_mutations = {
  addRoutine: async (_, args, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    console.log(JSON.stringify(args))
    let result
    try{
      result = await axios.post(
        `http://${process.env.NAME}:${process.env.PORT_ROUTINES}/api`,
        args
      );
    }catch(e){console.error(e)}
    console.log(result)
    return result.data;
  },
  updateRoutine: async(_, args, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    const result = await axios.patch(
      `http://${process.env.NAME}:${process.env.PORT_ROUTINES}/api/User/${args.ID}/${args.DAY}`,
      args
    );
    return result.data;
  },
  deleteRoutine: async(_, { ID }, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    const result = await axios.delete(
      `http://${process.env.NAME}:${process.env.PORT_ROUTINES}/api/User/${ID}`
    );
    return result.data;
  }
};
