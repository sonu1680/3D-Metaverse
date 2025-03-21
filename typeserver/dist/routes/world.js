"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worldRoute = void 0;
const express_1 = __importDefault(require("express"));
const World_1 = require("../controller/World");
exports.worldRoute = express_1.default.Router();
exports.worldRoute.get('/world', World_1.World);
