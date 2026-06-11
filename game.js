/**
 * 🪄 Arcane Academy - Core Game Engine
 * Handles game loop, rendering, and scene management
 */

import Input from "./Input.js";
import SceneManager from "./SceneManager.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // Systems
    this.input = new Input();
    this.sceneManager = new SceneManager();

    // FPS control (optional future upgrade)
    this.lastTime = 0;

    console.log("🪄 Game Initialized");
  }

  /**
   * 🚀 Start game loop
   */
  start() {
    this.loop(0);
  }

  /**
   * 🔁 Main Game Loop
   */
  loop = (timestamp) => {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.loop);
  };

  /**
   * 🧠 Update game logic
   */
  update(deltaTime) {
    if (this.sceneManager.currentScene) {
      this.sceneManager.update(deltaTime);
    }
  }

  /**
   * 🎨 Render everything
   */
  render() {
    // Clear screen
    this.ctx.fillStyle = "#05070d";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.sceneManager.currentScene) {
      this.sceneManager.render(this.ctx);
    }
  }
}
