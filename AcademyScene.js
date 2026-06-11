/**
 * 🪄 Arcane Academy - Main Gameplay Scene
 * Handles player, enemy, combat, and world logic
 */

import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import CombatSystem from "../systems/CombatSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
  }

  /**
   * 🎬 Initialize scene objects
   */
  init() {
    console.log("🏰 Academy Scene Loaded");

    // 🧍 Player
    this.player = new Player(150, 150);

    // 👾 Enemy
    this.enemy = new Enemy(500, 250);

    // ⚔️ Combat System
    this.combat = new CombatSystem(this.player, this.enemy);

    // 🎨 Simple world settings
    this.backgroundColor = "#0b0f1a";
  }

  /**
   * 🔁 Update game logic
   */
  update(deltaTime) {
    // Player movement
    this.player.update(this.game.input);

    // Enemy behavior
    this.enemy.update(this.player);

    // Combat logic
    this.combat.update(deltaTime);
  }

  /**
   * 🎨 Render scene
   */
  render(ctx) {
    // Clear background
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // Draw world title (optional UI)
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "14px monospace";
    ctx.fillText("🏰 Arcane Academy - Training Grounds", 20, 30);

    // Render entities
    this.player.render(ctx);
    this.enemy.render(ctx);

    // Render combat UI
    this.combat.render(ctx);
  }

  /**
   * 🧹 Cleanup when switching scenes
   */
  unload() {
    console.log("🚪 Leaving Academy Scene");
  }
}
