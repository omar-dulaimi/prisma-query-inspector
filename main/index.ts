import axios from "axios";
import * as uuid from "uuid";
import { promises as fs } from "fs";
import { QueryEventType, MainOptionsType } from "./types";
import path from "path";

export const configure: (options?: MainOptionsType) => Promise<void> = async (
  options = { language: { name: "sql" } }
) => {
  if (options?.language?.name === "sql") return;
  await fs.writeFile(
    path.join(__dirname, "config.json"),
    JSON.stringify(options)
  );
};

export const queryHandler = async (e: QueryEventType) => {
  const PORT = 5858;
  let isReachable;
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:${PORT}`,
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
    url: `http://localhost:${PORT}/message`,
    data: {
      id: uuid.v4(),
      ...e,
    },
  });
};
