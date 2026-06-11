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
    this.gameState = new GameState();

    // 🖥️ HUD
    this.hud = new HUD();

    // ⏱️ Time Tracking
    this.lastTime = 0;

    // 🎬 Register Scene
    const academyScene = new AcademyScene(this);

    this.sceneManager.addScene(
      "academy",
      academyScene
    );

    // 🚀 Start Scene
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
   * 🧠 Update
   */
  update(deltaTime) {
    if (this.gameState.state === "paused") {
      return;
    }

    if (this.gameState.state === "gameover") {
      return;
    }

    // Scene
    this.sceneManager.update(deltaTime);

    // Global State
    this.gameState.update();

    // HUD
    this.hud.update();

    // Input Cleanup
    this.input.update();
  }

  /**
   * 🎨 Render
   */
  render() {
    // Background
    this.ctx.fillStyle = "#05070d";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Active Scene
    this.sceneManager.render(this.ctx);

    // HUD Overlay
    this.hud.render(this.ctx);
  }
}
