import axios from "axios";
import * as uuid from "uuid";
import { QueryEventType } from "./types";
// @ts-ignore
import CONFIG from "../config.json";

export const queryHandler = async (e: QueryEventType) => {
  let isReachable;
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:${CONFIG.port}`,
    });
    isReachable = response.status >= 200 && response.status < 300;
  } catch (error) {
    isReachable = false;
  }

  if (!isReachable) {
    return;
  }
  await axios({
    method: "POST",
    url: `http://localhost:${CONFIG.port}/message`,
    data: {
      id: uuid.v4(),
      ...e,
    },
  });
};
