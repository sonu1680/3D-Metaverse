"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
const generatePosition_1 = require("../utils/generatePosition");
const generateColor_1 = require("../utils/generateColor");
const database_1 = require("../utils/database");
const uuid_1 = require("uuid");
const World = (io) => {
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
                    const { me, remote } = data;
                    const newData = {
                        type: "callData",
                        caller: me,
                        receiver: remote,
                        roomId: (0, uuid_1.v4)(),
                    };
                    io.to(me).emit("videoCall", JSON.stringify(newData));
                    io.to(remote).emit("videoCall", JSON.stringify(newData));
                    break;
                case "register":
                    socket.join(data.room);
                    break;
                case "createOffer":
                    socket.to(data.room).emit("videoCall", msg);
                    break;
                case "answerOffer":
                    socket.to(data.room).emit("videoCall", msg);
                    break;
                case "iceCandidate":
                    socket.to(data.room).emit("videoCall", msg);
                    break;
                case "endCall":
                    io.to(data.room).emit("videoCall", msg);
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
};
exports.World = World;
