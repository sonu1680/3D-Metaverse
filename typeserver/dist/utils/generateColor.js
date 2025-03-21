"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomColor = void 0;
const generateRandomColor = () => "#" +
    Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0");
exports.generateRandomColor = generateRandomColor;
