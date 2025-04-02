"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPosition = void 0;
const generateRandomPosition = () => [
    Math.random() * 260 - 80,
    -2,
    Math.random() * 200 - 60,
];
exports.generateRandomPosition = generateRandomPosition;
