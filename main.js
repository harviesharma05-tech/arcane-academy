/**
 * 🪄 Arcane Academy - Entry Point
 */

import Game from "./engine/Game.js";

// 🎮 Canvas
const canvas = document.getElementById("gameCanvas");

// Fullscreen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create game
const game = new Game(canvas);

// Start game loop
game.start();

// Handle resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
