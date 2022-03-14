#! /usr/bin/env node
import meow from "meow";
import kleur from "kleur";
import express from "express";
import SocketIO from "socket.io";
import http from "http";
import path from "path";
import chalk from "chalk";
import boxen from "boxen";
import CONFIG from "../main/config.json";
import { MessageType } from "./types";

const PORT = 5858;

const cli = meow(
  `
    Usage
    $ prisma-query-inspector [command] [flags]
    Options
      -v Prints out the version number
      ${kleur.bold("start")}
      
  `,
  {
    flags: {
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
  const { input } = cli;
  if (input.length < 1) {
    console.error(kleur.red("No sub command was specified"));
    cli.showHelp();
  }

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

      server.listen(PORT, () =>
        console.log(
          boxen(
            chalk`
Prisma Query Inspector Server listing on port: ${chalk.greenBright(PORT)}
You can access the client here: ${chalk.green("http://127.0.0.1:" + PORT)}
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
