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

    // Core Systems
    this.input = new Input();
    this.sceneManager = new SceneManager();
    this.gameState = new GameState();
    this.hud = new HUD();

    this.lastTime = 0;

    // Create and register scene
    const academyScene = new AcademyScene(this);

    this.sceneManager.addScene("academy", academyScene);
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
    // Pause/Gameover handling
    if (this.gameState.state === "paused") return;
    if (this.gameState.state === "gameover") return;

    // Update current scene
    this.sceneManager.update(deltaTime);

    // Update game state
    this.gameState.update();

    // Update HUD
    this.hud.update();

    // IMPORTANT: reset one-frame inputs LAST
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

    // Render active scene
    this.sceneManager.render(this.ctx);
  }
}
