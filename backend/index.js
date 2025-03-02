import { Server } from "socket.io";
import express from "express";
import http from "http";
import { generateRandomPosition } from "./utils/generatePosition.js";
import { generateRandomColor } from "./utils/generateColor.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const characters = {};

io.on("connection", (socket) => {

   //logic for multiplayer game
    socket.on("gameData", (msg) => {

      const data = JSON.parse(msg);
      console.log("multi");
  
      switch (data.type) {
        case "joinGame":
          const roomId = data.roomId;
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
  
          io.to(roomId).emit(
            "gameData",
            JSON.stringify({
              characters: roomCharacter,
              roomId: roomId,
              type: "isRoomJoined",
            })
          );
          break;
        ///on
        case "CharacterMove":
          const { position, animation, roomId: moveRoomId } = data;
          if (!characters[moveRoomId]) return;
  
          const charRoom = characters[moveRoomId];
          const user = charRoom.find((user) => user.id === socket.id);
  
          if (user) {
            user.position = position;
            user.animation = animation;
            // Emit updated room characters
            io.to(moveRoomId).emit(
              "gameData",
              JSON.stringify({
                characters: charRoom,
                roomId: moveRoomId,
                type: "isRoomJoined",
              })
            );
          }
          break;
      }
    });
  //logic for videocall
  socket.on("videoCall", (msg) => {
    console.log('videcall',msg)

    const data = JSON.parse(msg);
    switch (data.type) {
      case "register":
        socket.join(data.room);

        break;
      case "createOffer":
        socket.to(data.room).emit("videoCall", msg);
        break;
      case "answerOffer":
        socket.to(data.room).emit("videoCall", msg);
        break;
      case "answerOfferOne":
        socket.to(data.room).emit("videoCall", msg);
        break;
        case 'iceCandidate':
                  socket.to(data.room).emit("videoCall", msg);
                  break;

    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    const roomId = socket.roomId;
    const roomChar = characters[roomId];
    if (!roomChar) return;

    const charIndex = roomChar.findIndex((e) => e.id === socket.id);
    if (charIndex !== -1) {
      roomChar.splice(charIndex, 1);
      if (roomChar.length === 0) {
        delete characters[roomId];
      } else {
        const roomCharacter = characters[roomId];
        io.to(roomId).emit(
          "gameData",
          JSON.stringify({
            characters: roomCharacter,
            roomId: roomId,
            type: "isRoomJoined",
          })
        );
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
