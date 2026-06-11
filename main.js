import Game from "./engine/Game.js";

/**
 * 🎮 Arcane Academy - Entry Point
 * Initializes canvas, game engine, and starts game loop
 */

const canvas = document.getElementById("gameCanvas");

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle responsive resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const game = new Game(canvas);

/**
 * 🚀 Start the Game
 */
game.start();
