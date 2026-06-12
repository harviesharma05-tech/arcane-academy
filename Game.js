/**
 * 🪄 Arcane Academy - Core Game Engine
 */

import Input from "./Input.js";
import SceneManager from "./SceneManager.js";
import GameState from "./GameState.js";
import HUD from "./HUD.js";
import AcademyScene from "./AcademyScene.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // Systems
    this.input = new Input();
    this.sceneManager = new SceneManager();
    this.gameState = new GameState();
    this.hud = new HUD();

    this.lastTime = 0;

    // Create scene
    const academyScene = new AcademyScene(this);

    // Register scene
    this.sceneManager.addScene("academy", academyScene);

    // Start scene
    this.sceneManager.start("academy");

    console.log("🪄 Arcane Academy Engine Started");
  }

  /**
   * 🚀 Start Game
   */
  start() {
    requestAnimationFrame(this.loop);
  }

  /**
   * 🔁 Main Loop
   */
  loop = (timestamp) => {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.loop);
  };

  /**
   * 🧠 Update
   */
  update(deltaTime) {
    // Pause/Game Over
    if (this.gameState.state === "paused") return;
    if (this.gameState.state === "gameover") return;

    // Update current scene
    this.sceneManager.update(deltaTime);

    // Update game state
    if (this.gameState.update) {
      this.gameState.update();
    }

    // Update HUD
    if (this.hud.update) {
      this.hud.update();
    }

    // VERY IMPORTANT:
    // Clear one-frame key presses AFTER scene update
    this.input.update();
  }

  /**
   * 🎨 Render
   */
  render() {
    // Clear screen
    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Background
    this.ctx.fillStyle = "#0b0f1a";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Render current scene
    this.sceneManager.render(this.ctx);

    // Render HUD
    if (this.hud.render) {
      this.hud.render(this.ctx);
    }
  }
}
