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

    // Core systems
    this.input = new Input();
    this.sceneManager = new SceneManager();
    this.gameState = new GameState();
    this.hud = new HUD();

    this.lastTime = 0;

    // Create scene
    const academyScene = new AcademyScene(this);

    this.sceneManager.addScene(
      "academy",
      academyScene
    );

    this.sceneManager.start("academy");

    console.log("🪄 Arcane Academy Engine Started");
  }

  /**
   * 🚀 Start game
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
    if (this.gameState.state === "paused") return;
    if (this.gameState.state === "gameover") return;

    this.sceneManager.update(deltaTime);

    if (this.gameState.update) {
      this.gameState.update();
    }

    if (this.hud.update) {
      this.hud.update();
    }

    // VERY IMPORTANT
    this.input.update();
  }

  /**
   * 🎨 Render
   */
  render() {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.ctx.fillStyle = "#0b0f1a";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.sceneManager.render(this.ctx);

    this.hud.render(this.ctx);
  }
}
