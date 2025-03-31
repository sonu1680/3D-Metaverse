"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPosition = void 0;
const generateRandomPosition = () => [
    Math.floor(Math.random() * 40),
    -2,
    Math.floor(Math.random() * 40),
];
exports.generateRandomPosition = generateRandomPosition;
