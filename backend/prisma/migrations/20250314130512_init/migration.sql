/*
  Warnings:

  - Added the required column `roomId` to the `ChatArray` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatArray" ADD COLUMN     "roomId" TEXT NOT NULL;
