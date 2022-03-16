#! /usr/bin/env node
import meow from "meow";
import kleur from "kleur";
import express from "express";
import SocketIO from "socket.io";
import http from "http";
import path from "path";
import chalk from "chalk";
import boxen from "boxen";
import { promises as fs } from "fs";
import { MessageType } from "./types";

const cli = meow(
  `
    Usage
    $ prisma-query-inspector [command] [flags]
    Options
      -v Prints out the version number
      ${kleur.bold("start")}
      --port -p   Specify the port from which the inspector will be running
      --language -l Specify the database language to format queries
      
  `,
  {
    flags: {
      port: {
        type: "number",
        alias: "p",
        default: 7001,
      },
      language: {
        type: "string",
        alias: "l",
        default: "sql",
      },
      version: {
        alias: "v",
      },
    },
  }
);

class Connection {
  io: SocketIO.Server;
  socket: SocketIO.Socket;
  constructor(io: SocketIO.Server, socket: SocketIO.Socket) {
    this.socket = socket;
    this.io = io;

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message: MessageType) {
    this.io.sockets.emit("message", message);
  }
}

async function execute<T extends meow.AnyFlags>(cli: meow.Result<T>) {
  const {
    input,
    flags: { port, language },
  } = cli;
  if (input.length < 1) {
    console.error(kleur.red("No sub command was specified"));
    cli.showHelp();
  }

  await fs.writeFile(
    path.join(__dirname, "../config.json"),
    JSON.stringify({ port, language: { name: language } }),
    { flag: "w" }
  );

  const mainSubcommand = input[0];

  switch (mainSubcommand) {
    case "start": {
      const app = express();
      let ioConnection: {
        io: SocketIO.Server;
        socket: SocketIO.Socket;
        sendMessage: (message: MessageType) => void;
      };
      app.use(express.json());

      app.use(express.static(path.join(__dirname, "../client")));

      app.post("/message", (req, res) => {
        if (ioConnection) {
          ioConnection.sendMessage(req.body);
          return res.json({ success: true });
        }
        res.json({ success: false });
      });

      // @ts-ignore
      const CONFIG = await import("../config.json");
      app.get("/config", (req, res) => {
        res.json(CONFIG);
      });

      const server = http.createServer(app);

      const io = new SocketIO.Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });

      io.on("connection", (socket) => {
        ioConnection = new Connection(io, socket);
      });

      server.listen(port, () =>
        console.log(
          boxen(
            chalk`
Prisma Query Inspector Server listening on port: ${chalk.greenBright(port)}
You can access the client here: ${chalk.green("http://127.0.0.1:" + port)}
`,
            { padding: 1, borderColor: "blue" }
          )
        )
      );

      process.on("SIGTERM", () => {
        server.close();
      });

      break;
    }
    default: {
      console.error(kleur.red(`Unknown command ${kleur.bold(mainSubcommand)}`));
      cli.showHelp();
    }
  }
}

execute(cli);
