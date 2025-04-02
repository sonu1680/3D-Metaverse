"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const database_1 = require("./utils/database");
const generateColor_1 = require("./utils/generateColor");
const generatePosition_1 = require("./utils/generatePosition");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.get('/test', (req, res) => {
    res.send("test");
    res.end;
});
const characters = {};
io.on("connection", (socket) => {
    //logic for multiplayer game
    socket.on("gameData", (msg) => {
        const data = JSON.parse(msg);
        switch (data.type) {
            case "joinGame":
                const roomId = data.roomId;
                socket.join(roomId);
                //@ts-ignore
                socket.roomId = roomId;
                if (!characters[roomId]) {
                    characters[roomId] = [];
                }
                const newCharacter = {
                    id: socket.id,
                    position: (0, generatePosition_1.generateRandomPosition)(),
                    animation: "idle",
                    color: (0, generateColor_1.generateRandomColor)(),
                    roomId: roomId,
                };
                characters[roomId].push(newCharacter);
                const roomCharacter = characters[roomId];
                io.to(roomId).emit("gameData", JSON.stringify({
                    characters: roomCharacter,
                    roomId: roomId,
                    type: "isRoomJoined",
                }));
                (0, database_1.getChats)(roomId).then((data) => {
                    io.to(roomId).emit("chatHistory", JSON.stringify(data));
                });
                break;
            ///on
            case "CharacterMove":
                const { position, animation, roomId: moveRoomId } = data;
                if (!characters[moveRoomId])
                    return;
                const charRoom = characters[moveRoomId];
                const user = charRoom.find((user) => user.id === socket.id);
                if (user) {
                    user.position = position;
                    user.animation = animation;
                    // Emit updated room characters
                    io.to(moveRoomId).emit("gameData", JSON.stringify({
                        characters: charRoom,
                        roomId: moveRoomId,
                        type: "isRoomJoined",
                    }));
                }
                break;
        }
    });
    //logic for videocall
    socket.on("videoCall", (msg) => {
        const data = JSON.parse(msg);
        switch (data.type) {
            case "initiator":
                console.log(data);
                const { me, remote, peerid } = data;
                const newData = {
                    type: "callData",
                    caller: me,
                    receiver: remote,
                    roomId: (0, uuid_1.v4)(),
                    peerId: peerid,
                };
                io.to(remote).emit("videoCall", JSON.stringify(newData));
                break;
            // case "register":
            //   socket.join(data.room);
            //   break;
            // case "createOffer":
            //   socket.to(data.room).emit("videoCall", msg);
            //   break;
            // case "answerOffer":
            //   socket.to(data.room).emit("videoCall", msg);
            //   break;
            // case "iceCandidate":
            //   socket.to(data.room).emit("videoCall", msg);
            //   break;
            case "endCall":
                io.to(data.remote).emit("videoCall", msg);
        }
    });
    socket.on("chat", async (msg) => {
        const data = JSON.parse(msg);
        // emit msg to other user
        socket.to(data.room).emit("chat", msg);
        //  store chat to database
        await (0, database_1.addChat)(data);
    });
    socket.on("disconnect", () => {
        //@ts-ignore
        const roomId = socket.roomId;
        const roomChar = characters[roomId];
        if (!roomChar)
            return;
        const charIndex = roomChar.findIndex((e) => e.id === socket.id);
        if (charIndex !== -1) {
            roomChar.splice(charIndex, 1);
            if (roomChar.length === 0) {
                delete characters[roomId];
            }
            else {
                const roomCharacter = characters[roomId];
                io.to(roomId).emit("gameData", JSON.stringify({
                    characters: roomCharacter,
                    roomId: roomId,
                    type: "isRoomJoined",
                }));
            }
        }
    });
});
server.listen(3001, () => {
    console.log("Server is running on port 3001");
});
