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

    this.lastTime = 0;

    // Scene
    const academyScene = new AcademyScene(this);

    this.sceneManager.addScene("academy", academyScene);
    this.sceneManager.start("academy");

    console.log("🪄 Arcane Academy Engine Started");
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop = (timestamp) => {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.loop);
  };

  update(deltaTime) {
    if (this.gameState.state === "paused") return;
    if (this.gameState.state === "gameover") return;

    // Scene update
    this.sceneManager.update(deltaTime);

    // Global state
    this.gameState.update();

    // HUD
    this.hud.update();

    // IMPORTANT: reset pressed keys LAST
    this.input.update();
  }

  render() {
    // Background
    this.ctx.fillStyle = "#0b0f1a";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Scene
    this.sceneManager.render(this.ctx);

    // HUD
    this.hud.render(this.ctx);
  }
}
