import socketIo from "socket.io";
import { MessageType } from "./types";

export default class Connection {
  io: socketIo.Server;
  socket: socketIo.Socket;
  constructor(io: socketIo.Server, socket: socketIo.Socket) {
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
