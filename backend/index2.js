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

let peers = {};
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
 //socket logic for viceo call
 
  socket.on("videoCall", (msg) => {
    const data = msg;
    switch (data.type) {
      case "register":
        peers[data.peerid] = socket;
        break;

      case "createOffer":
        if (!peers[data.peerid]) return;
        peers[data.peerid].emit("videoCall", { type: "createOffer", sdp: data.sdp });

        break;
      case "answerOffer":
        if (!peers[data.peerid]) return;
        peers[data.peerid].emit("videoCall", { type: "answerOffer", sdp: data.sdp });
        break;

      case "senderIce":
        if (!peers[data.peerid]) return;
        peers[data.peerid].emit("videoCall", { type: "senderIce", ice: data.ice });
        break;
      case "receiverIce":
        if (!peers[data.peerid]) return;
        peers[data.peerid].emit("videoCall", { type: "receiverIce", ice: data.ice });
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
