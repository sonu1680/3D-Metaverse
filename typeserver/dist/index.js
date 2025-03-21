"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const World_1 = require("./controller/World");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
(0, World_1.World)(io);
app.use('/api', authRoute_1.default);
// const characters:any = {};
// io.on("connection", (socket:Socket) => {
//   //logic for multiplayer game
//   socket.on("gameData", (msg) => {
//     const data = JSON.parse(msg);
//     switch (data.type) {
//       case "joinGame":
//         const roomId = data.roomId;
//         socket.join(roomId);
//         //@ts-ignore
//         socket.roomId = roomId;
//         if (!characters[roomId]) {
//           characters[roomId] = [];
//         }
//         const newCharacter = {
//           id: socket.id,
//           position: generateRandomPosition(),
//           animation: "idle",
//           color: generateRandomColor(),
//           roomId: roomId,
//         };
//         characters[roomId].push(newCharacter);
//         const roomCharacter = characters[roomId];
//         io.to(roomId).emit(
//           "gameData",
//           JSON.stringify({
//             characters: roomCharacter,
//             roomId: roomId,
//             type: "isRoomJoined",
//           })
//         );
//         getChats(roomId).then((data) => {
//           io.to(roomId).emit("chatHistory", JSON.stringify(data));
//         });
//         break;
//       ///on
//       case "CharacterMove":
//         const { position, animation, roomId: moveRoomId } = data;
//         if (!characters[moveRoomId]) return;
//         const charRoom = characters[moveRoomId];
//         const user = charRoom.find((user:any) => user.id === socket.id);
//         if (user) {
//           user.position = position;
//           user.animation = animation;
//           // Emit updated room characters
//           io.to(moveRoomId).emit(
//             "gameData",
//             JSON.stringify({
//               characters: charRoom,
//               roomId: moveRoomId,
//               type: "isRoomJoined",
//             })
//           );
//         }
//         break;
//     }
//   });
//   //logic for videocall
//   socket.on("videoCall", (msg) => {
//     const data = JSON.parse(msg);
//     switch (data.type) {
//       case "initiator":
//         const { me, remote } = data;
//         const newData = {
//           type: "callData",
//           caller: me,
//           receiver: remote,
//           roomId: uuidv4(),
//         };
//         io.to(me).emit("videoCall", JSON.stringify(newData));
//         io.to(remote).emit("videoCall", JSON.stringify(newData));
//         break;
//       case "register":
//         socket.join(data.room);
//         break;
//       case "createOffer":
//         socket.to(data.room).emit("videoCall", msg);
//         break;
//       case "answerOffer":
//         socket.to(data.room).emit("videoCall", msg);
//         break;
//       case "iceCandidate":
//         socket.to(data.room).emit("videoCall", msg);
//         break;
//       case "endCall":
//         io.to(data.room).emit("videoCall", msg);
//     }
//   });
//   socket.on("chat", async (msg) => {
//     const data = JSON.parse(msg);
//     // emit msg to other user
//     socket.to(data.room).emit("chat", msg);
//     //  store chat to database
//     await addChat(data);
//   });
//   socket.on("disconnect", () => {
//     //@ts-ignore
//     const roomId = socket.roomId;
//     const roomChar = characters[roomId];
//     if (!roomChar) return;
//     const charIndex = roomChar.findIndex((e:any) => e.id === socket.id);
//     if (charIndex !== -1) {
//       roomChar.splice(charIndex, 1);
//       if (roomChar.length === 0) {
//         delete characters[roomId];
//       } else {
//         const roomCharacter = characters[roomId];
//         io.to(roomId).emit(
//           "gameData",
//           JSON.stringify({
//             characters: roomCharacter,
//             roomId: roomId,
//             type: "isRoomJoined",
//           })
//         );
//       }
//     }
//   });
// });
server.listen(3001, () => {
    console.log("Server is running on port 3001");
});
