import axios from "axios";
import * as uuid from "uuid";
import { QueryEventType } from "./types";

export const queryHandler = async (e: QueryEventType) => {
  await axios({
    method: "POST",
    url: "http://localhost:5858/message",
    data: {
      id: uuid.v4(),
      ...e,
    },
  });
};
