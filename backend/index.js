"use client";
import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let senderSocket;
let receiverSocket;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("msg", (msg) => {
    const data = msg;
    console.log(msg);
    switch (data.type) {
      case "sender":
        senderSocket = socket;
        break;
      case "receiver":
        receiverSocket = socket;
        break;
      case "createOffer":
        if (socket !== senderSocket) return;
        receiverSocket.emit("msg", { type: "createOffer", sdp: data.sdp });
        break;
      case "answerOffer":
        if (socket !== receiverSocket) return;
        senderSocket.emit("msg", { type: "answerOffer", sdp: data.sdp });
        break;

      case "senderIce":
        receiverSocket.emit("msg", { type: "senderIce", ice: data.ice });
        break;
      case "receiverIce":
        senderSocket.emit("msg", { type: "receiverIce", ice: data.ice });
        break;
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
