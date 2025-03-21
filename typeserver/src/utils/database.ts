import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addChat = async (data:any) => {
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
    } else {
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
  } catch (error) {
    //
  } finally {
    await prisma.$disconnect();
  }
};

export const getChats = async (roomId:any) => {
  try {
    const chats = await prisma.chat.findMany({
      where: {
        roomId: roomId,
      },
    });
    return chats;
  } catch (error) {
    //
  } finally {
    await prisma.$disconnect();
  }
};
