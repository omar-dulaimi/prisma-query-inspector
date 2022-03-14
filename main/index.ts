import axios from "axios";
import * as uuid from "uuid";
import chalk from "chalk";
import { QueryEventType } from "./types";

export const queryHandler = async (e: QueryEventType) => {
  let isReachable = false;
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:5858",
    });
    isReachable = response.status >= 200 && response.status < 300;
  } catch (error) {
    console.log(error?.message);
  }

  if (!isReachable) {
    console.log(
      chalk.red(`
    Prisma Query Server is unreachable!
    Please make sure to run it from package.json scripts ${chalk.underline.green(
      "before"
    )} you run your project
    `)
    );
    return;
  }
  await axios({
    method: "POST",
    url: "http://localhost:5858/message",
    data: {
      id: uuid.v4(),
      ...e,
    },
  });
};
