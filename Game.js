/**
 * 🪄 Arcane Academy - Core Game Engine
 * VERSION 9
 */

import Input from "./Input.js";
import SceneManager from "./SceneManager.js";
import GameState from "./GameState.js";
import HUD from "./HUD.js";

import AcademyScene from "./AcademyScene.js";
import DungeonScene from "./DungeonScene.js";

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

    // Scenes
    const academyScene =
      new AcademyScene(this);

    const dungeonScene =
      new DungeonScene(this);

    // Register Scenes
    this.sceneManager.addScene(
      "academy",
      academyScene
    );

    this.sceneManager.addScene(
      "dungeon",
      dungeonScene
    );

    // Start Game
    this.sceneManager.start(
      "academy"
    );

    console.log(
      "🪄 Arcane Academy V9 Started"
    );
  }

  /**
   * 🚀 Start Game
   */
  start() {
    requestAnimationFrame(
      this.loop
    );
  }

  /**
   * 🔁 Main Loop
   */
  loop = (timestamp) => {

    const deltaTime =
      timestamp - this.lastTime;

    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(
      this.loop
    );
  };

  /**
   * 🧠 Update
   */
  update(deltaTime) {

    if (
      this.gameState.state ===
      "paused"
    ) {
      return;
    }

    if (
      this.gameState.state ===
      "gameover"
    ) {
      return;
    }

    // Scene
    this.sceneManager.update(
      deltaTime
    );

    // Game State
    if (
      this.gameState &&
      this.gameState.update
    ) {
      this.gameState.update();
    }

    // HUD
    if (
      this.hud &&
      this.hud.update
    ) {
      this.hud.update();
    }

    // Reset one-frame keys
    this.input.update();
  }

  /**
   * 🎨 Render
   */
  render() {

    // Clear
    this.ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Background
    this.ctx.fillStyle =
      "#0b0f1a";

    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Active Scene
    this.sceneManager.render(
      this.ctx
    );

    // HUD
    if (
      this.hud &&
      this.hud.render
    ) {
      this.hud.render(
        this.ctx
      );
    }
  }
}
