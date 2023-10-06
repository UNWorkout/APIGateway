import axios from "axios";
import "dotenv/config";

export const routines_func_querys = `
  routineUserDay(ID: ID!, DAY: String!): Excerciseday
  routineUser(ID: ID!): Routine
`;

export const routines_func_mutations = `
`;

export const routines_squemas = `
  type Routine {
    promedio: Float,
    _id: ID
    usuario_id: ID
    dias_semana: [Excerciseday]
  }

  type Excerciseday {
    _id: ID
    dia: String
    ejercicios: [Int]
    Duracion_Max: Int
    Hora_inicio: String
  }
`;

export const routines_querys = {
  routineUserDay: async (_, { ID, DAY }) => {
    const result = await axios.get(
      `http://rutinasms:${process.env.PORT_ROUTINES}/api/User/${ID}/${DAY}`
    );
    return result.data;
  },
  routineUser: async (_, { ID }) => {
    const result = await axios.get(
      `http://rutinasms:${process.env.PORT_ROUTINES}/api/User/${ID}`
    );
    return result.data;
  },
};

export const routines_mutations = {
};
