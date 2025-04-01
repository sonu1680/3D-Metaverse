"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPosition = void 0;
const generateRandomPosition = () => [
    Math.random() * 100,
    -2,
    Math.random() * 100,
];
exports.generateRandomPosition = generateRandomPosition;
