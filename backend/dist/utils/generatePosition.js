"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPosition = void 0;
const generateRandomPosition = () => [
    Math.random() * 260 - 80, // X-axis: -80 to 180
    -2,
    Math.random() * 200 - 60, // Z-axis: -60 to 140
];
exports.generateRandomPosition = generateRandomPosition;
