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

const characters = {};

const generateRandomPosition = () => [
  Math.floor(Math.random() * 40),
  -3,
  Math.floor(Math.random() * 40),
];

const generateRandomColor = () =>
  "#" +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
    if (!characters[roomId]) {
      characters[roomId] = [];
    }
    const newCharacter = {
      id: socket.id,
      position: generateRandomPosition(),
      animation: "idle",
      color: generateRandomColor(),
      roomId: roomId,
    };
    characters[roomId].push(newCharacter);
    const roomCharacter = characters[roomId];
    io.to(roomId).emit("isRoomJoined", {
      characters: roomCharacter,
      roomId: roomId,
    });
  });



socket.on("move", ({ position, animation, roomId }) => {
  if (!characters[roomId]) return;

  const charRoom = characters[roomId];
  const user = charRoom.find((user) => user.id === socket.id);

  if (user) {
    user.position = position;
    user.animation = animation;

    // Emit updated room characters
    io.to(roomId).emit("isRoomJoined", {
      characters: charRoom,
      roomId,
    });
  }
});

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const roomId = socket.roomId;
    const roomChar = characters[roomId];
    const charIndex = roomChar.findIndex((e) => e.id === socket.id);
    if (charIndex != -1) {
      roomChar.splice(charIndex, 1);
      if (roomChar.length == 0) {
        delete characters[roomId];
      }
      else{
 const roomCharacter = characters[roomId];

      io.to(roomId).emit("isRoomJoined", {
        characters: roomCharacter,
        roomId: roomId,
      });
    }
      }
     
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
