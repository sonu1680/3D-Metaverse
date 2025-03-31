"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = exports.addChat = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addChat = async (data) => {
    try {
        const chatPreset = await prisma.chatArray.findFirst({
            where: {
                roomId: data.room,
            },
        });
        if (!chatPreset) {
            await prisma.chatArray.create({
                data: {
                    roomId: data.room,
                    chats: {
                        create: [
                            {
                                chatId: String(data.msg.id),
                                text: data.msg.text,
                                sender: data.msg.sender,
                                senderName: data.msg.senderName,
                                roomId: data.room,
                                timestamp: new Date().toISOString(),
                            },
                        ],
                    },
                },
            });
        }
        else {
            await prisma.chat.create({
                data: {
                    chatId: String(data.msg.id),
                    text: data.msg.text,
                    sender: data.msg.sender,
                    senderName: data.msg.senderName,
                    roomId: data.room,
                    timestamp: new Date().toISOString(),
                    chatArrayId: chatPreset.id,
                },
            });
        }
    }
    catch (error) {
        //
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.addChat = addChat;
const getChats = async (roomId) => {
    try {
        const chats = await prisma.chat.findMany({
            where: {
                roomId: roomId,
            },
        });
        return chats;
    }
    catch (error) {
        //
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getChats = getChats;
