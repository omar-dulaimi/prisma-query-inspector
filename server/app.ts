import express from "express";
import http from "http";
import path from "path";
import SocketIO from "socket.io";
import chalk from "chalk";
import boxen from "boxen";
import Connection from "./connection";
import { MessageType } from "./types";

const port = process.env.PORT || 4001;

const app = express();
let ioConnection: {
  io: SocketIO.Server;
  socket: SocketIO.Socket;
  sendMessage: (message: MessageType) => void;
};

app.use(express.json());

app.use(
  express.static(
    path.join(
      __dirname,
      process.env.NODE_ENV === "production" ? "../client" : "../dist/client"
    )
  )
);

app.post("/message", (req, res) => {
  if (ioConnection) {
    ioConnection.sendMessage(req.body);
    return res.json({ success: true });
  }
  res.json({ success: false });
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
Prisma Query Inspector Server listing on port: ${chalk.greenBright(port)}
You can access the client here: ${chalk.green("http://localhost:" + port)}
`,
      { padding: 1, borderColor: "blue" }
    )
  )
);
