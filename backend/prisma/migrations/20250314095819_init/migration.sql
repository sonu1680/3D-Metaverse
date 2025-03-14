-- CreateTable
CREATE TABLE "ChatArray" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ChatArray_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "chatId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "chatArrayId" TEXT NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_chatArrayId_fkey" FOREIGN KEY ("chatArrayId") REFERENCES "ChatArray"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
