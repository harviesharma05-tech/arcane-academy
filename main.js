/**
 * 🪄 Arcane Academy - Core Game Engine
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

    // Systems
    this.input = new Input();
    this.sceneManager = new SceneManager();
    this.gameState = new GameState();
    this.hud = new HUD();

    // Timing
    this.lastTime = 0;

    // Create Scene
    const academyScene = new AcademyScene(this);

    // Register Scene
    this.sceneManager.addScene(
      "academy",
      academyScene
    );

    // Start Scene
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
    try {
      if (this.gameState.state === "paused") return;
      if (this.gameState.state === "gameover") return;

      this.sceneManager.update(deltaTime);
      this.gameState.update();
      this.hud.update();

      if (this.input.update) {
        this.input.update();
      }
    } catch (err) {
      console.error("Update Error:", err);
    }
  }

  /**
   * 🎨 Render
   */
  render() {
    try {
      // Background
      this.ctx.fillStyle = "#0b0f1a";
      this.ctx.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      // TEST TEXT
      this.ctx.fillStyle = "white";
      this.ctx.font = "32px Arial";
      this.ctx.fillText(
        "GAME LOOP WORKING",
        50,
        100
      );

      // Scene
      this.sceneManager.render(this.ctx);

      // HUD
      this.hud.render(this.ctx);
    } catch (err) {
      console.error("Render Error:", err);
    }
  }
}
