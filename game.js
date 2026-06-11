/**
 * 🪄 Arcane Academy - Core Game Engine (UPDATED)
 * Phase 1 Integrated: GameState + HUD + Scene + Input coordination
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

    // 🎮 Systems
    this.input = new Input();
    this.sceneManager = new SceneManager();

    // 🧠 Global State (Phase 1)
    this.gameState = new GameState(null, null);

    // 🖥️ HUD (UI Layer)
    this.hud = new HUD(null);

    // 🔁 Time tracking
    this.lastTime = 0;

    // 🎬 Load initial scene
    const scene = new AcademyScene(this);
    this.sceneManager.loadScene(scene);

    console.log("🪄 Arcane Academy Engine Started");
  }

  /**
   * 🚀 Start game loop
   */
  start() {
    requestAnimationFrame(this.loop.bind(this));
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
   * 🧠 Update engine + systems
   */
  update(deltaTime) {
    // ⏸ Pause / Gameover handling
    if (this.gameState.state === "gameover") {
      console.log("💀 GAME OVER - Reload to restart");
      return;
    }

    if (this.gameState.state === "paused") {
      return;
    }

    // 🎮 Update scene
    if (this.sceneManager.currentScene) {
      this.sceneManager.update(deltaTime);
    }

    // 🧠 Update global state
    this.gameState.update();

    // 🖥️ Update HUD
    this.hud.update();

    // ⌨️ Reset single-frame inputs
    this.input.update();
  }

  /**
   * 🎨 Render everything
   */
  render() {
    // Clear screen
    this.ctx.fillStyle = "#05070d";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 🎬 Render scene
    if (this.sceneManager.currentScene) {
      this.sceneManager.render(this.ctx);
    }
  }
}
