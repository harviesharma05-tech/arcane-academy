import Game from "./engine/Game.js";

console.log("✅ main.js loaded");

const canvas = document.getElementById("gameCanvas");

console.log("✅ canvas found:", canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

try {
  const game = new Game(canvas);

  console.log("✅ Game created");

  game.start();

  console.log("✅ Game started");
} catch (err) {
  console.error("❌ BOOT ERROR:", err);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
