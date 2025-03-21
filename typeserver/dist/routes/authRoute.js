"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = require("../controller/auth/Login");
const authRoute = express_1.default.Router();
authRoute.post('/auth', Login_1.Login);
exports.default = authRoute;
