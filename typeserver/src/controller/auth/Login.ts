import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

export const Login = async (req: any, res: any) => {
  const prisma = new PrismaClient();
 try {
   const { authData } = req.body;
   const userExist = await prisma.user.findFirst({
     where: {
       email: authData.email,
     },
   });
   if (userExist) {
     return res.status(409).json({ msg: "user already register" });
   }
   const user = await prisma.user.create({
     data: authData,
   });
   return res.status(200).json({ msg: "done", data: user });
 } catch (error) {
     return res.status(500).json({ msg: "Internal error", });

 } finally {
  await prisma.$disconnect()
 }
};
