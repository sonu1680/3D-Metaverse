"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const client_1 = require("@prisma/client");
const Login = async (req, res) => {
    const prisma = new client_1.PrismaClient();
    const { authData } = req.body;
    const userExist = await prisma.user.findFirst({
        where: {
            email: authData.email
        }
    });
    if (userExist) {
        return res.status(409).json({ msg: 'user already register' });
    }
    const user = await prisma.user.create({
        data: authData
    });
    return res.status(200).json({ msg: "done", data: user });
};
exports.Login = Login;
