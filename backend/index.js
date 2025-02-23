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

const characters = [];

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

  const newCharacter = {
    id: socket.id,
    position: generateRandomPosition(),
    host: true,
    animation: "idle",
    color: generateRandomColor(),
  };

  characters.push(newCharacter);

  socket.emit("hello", {
    characters,
    id: socket.id,
  });

  io.emit("characters", characters);

  socket.on("move", (data) => {

    const character = characters.find((char) => char.id === socket.id);
    if (character) {
      character.position = data.position;
      character.animation = data.animation;
      io.emit("characters", characters);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    const index = characters.findIndex((char) => char.id === socket.id);
    if (index !== -1) {
      characters.splice(index, 1);
      io.emit("characters", characters);
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
