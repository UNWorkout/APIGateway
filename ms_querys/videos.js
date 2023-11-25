import axios from "axios";
import "dotenv/config";
import {unAuthError} from "../utils/index.js";

export const videos_func_querys = `
  videoByID(ID: ID!): Video
  batchOfVideosByIdArray(IDs: [ID!]): [Video]
`;

export const videos_squemas = `
  type Video {
    ID: ID!
    title: String
    url: String
    category: String
    duration: Int
    sets: String
    reps: String
    equipment: [String]
  }
`;

export const videos_querys = {
  videoByID: async (_, { ID }, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    let result;
    try{
      result = await axios.get(
          `http://${process.env.NAME}:${process.env.PORT_VIDEOS}/api/video/id/${ID}`
      );
    }catch (e){
      console.error(e);
    }
    const {data} = result.data;
    return {
      ...data,
      ID: data._id,
    };
  },
  batchOfVideosByIdArray: async (_, {IDs}, ctx) => {
    if (!ctx || !ctx.user) throw unAuthError;

    let result;
    try{
      result = await axios.get(
          `http://${
              process.env.NAME
          }:${
              process.env.PORT_VIDEOS
          }/api/video/batch?${
            IDs.map(id => `id=${id}`).join('&')
          }`,
      );
    }catch (e){
      console.error(e);
    }
    const {data} = result.data;
    return data.map(
        singleVideo => {
          return {
            ...singleVideo,
            ID: singleVideo._id,
          }
        }
    );
  }
};

