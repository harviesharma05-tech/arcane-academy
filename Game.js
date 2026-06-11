/**
 * 🪄 Arcane Academy - Core Game Engine
 * Stable Version
 */

import Input from "./Input.js";
import SceneManager from "./SceneManager.js";
import GameState from "./GameState.js";
import HUD from "./HUD.js";

import AcademyScene from "../scenes/AcademyScene.js";

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // 🎮 Core Systems
    this.input = new Input();
    this.sceneManager = new SceneManager();

    // 🧠 Global State
    this.gameState = new GameState(null, null);

    // 🖥️ HUD
    this.hud = new HUD(null);

    // ⏱️ Timing
    this.lastTime = 0;

    // 🎬 Register Scene
    const academyScene = new AcademyScene(this);

    this.sceneManager.addScene(
      "academy",
      academyScene
    );

    // 🚀 Start Scene System
    this.sceneManager.start("academy");

    console.log("🪄 Arcane Academy Engine Started");
  }

  /**
   * 🚀 Start Game Loop
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
   * 🧠 Update Systems
   */
  update(deltaTime) {
    // Pause
    if (this.gameState.state === "paused") {
      return;
    }

    // Game Over
    if (this.gameState.state === "gameover") {
      return;
    }

    // 🎬 Active Scene
    this.sceneManager.update(deltaTime);

    // 🧠 State
    this.gameState.update();

    // 🖥️ HUD
    if (this.hud.update) {
      this.hud.update();
    }

    // ⌨️ Input Cleanup
    if (this.input.update) {
      this.input.update();
    }
  }

  /**
   * 🎨 Render
   */
  render() {
    // Clear Screen
    this.ctx.fillStyle = "#05070d";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Scene
    this.sceneManager.render(this.ctx);

    // HUD
    if (this.hud.render) {
      this.hud.render(this.ctx);
    }
  }
}
