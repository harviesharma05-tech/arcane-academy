/**
 * 🏰 Arcane Academy - Main Gameplay Scene
 */

import Player from "./Player.js";
import Enemy from "./Enemy.js";
import CombatSystem from "./CombatSystem.js";
import SpellSystem from "./SpellSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;

    this.player = null;
    this.enemy = null;

    this.combat = null;
    this.spellSystem = null;
  }

  /**
   * 🎬 Initialize Scene
   */
  init() {
    console.log("🏰 Academy Scene Initialized");

    // Player Spawn
    this.player = new Player(250, 300);

    // Enemy Spawn
    this.enemy = new Enemy(700, 300);

    // Systems
    this.combat = new CombatSystem(
      this.player,
      this.enemy
    );

    this.spellSystem = new SpellSystem(
      this.player,
      this.enemy
    );

    // HUD Connection
    if (this.game.hud) {
      this.game.hud.player = this.player;
    }

    // Game State Connection
    if (this.game.gameState) {
      this.game.gameState.player = this.player;
      this.game.gameState.enemy = this.enemy;
    }

    console.log("✅ Scene Ready");
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {
    const input = this.game.input;

    // Player
    if (this.player) {
      this.player.update(input);
    }

    // Fireball
    if (
      this.spellSystem &&
      input.isPressed(" ")
    ) {
      this.spellSystem.cast("fireball");
    }

    // Shield
    if (
      this.spellSystem &&
      input.isPressed("shift")
    ) {
      this.spellSystem.cast("shield");
    }

    // Enemy
    if (this.enemy) {
      this.enemy.update(this.player);
    }

    // Combat
    if (this.combat?.update) {
      this.combat.update(deltaTime);
    }

    // Spell System
    if (this.spellSystem?.update) {
      this.spellSystem.update(deltaTime);
    }
  }

  /**
   * 🎨 Render
   */
  render(ctx) {
    // Background
    ctx.fillStyle = "#0b0f1a";
    ctx.fillRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );

    // Title
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "28px Arial";
    ctx.fillText(
      "🪄 Arcane Academy",
      20,
      50
    );

    // Controls
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText(
      "WASD = Move",
      20,
      90
    );

    ctx.fillText(
      "SPACE = Fireball",
      20,
      115
    );

    ctx.fillText(
      "SHIFT = Shield",
      20,
      140
    );

    // Player
    if (this.player?.render) {
      this.player.render(ctx);
    }

    // Enemy
    if (this.enemy?.render) {
      this.enemy.render(ctx);
    }

    // Combat UI
    if (this.combat?.render) {
      this.combat.render(ctx);
    }

    // Spell UI
    if (this.spellSystem?.render) {
      this.spellSystem.render(ctx);
    }
  }

  /**
   * 🚪 Cleanup
   */
  unload() {
    console.log("🚪 Leaving Academy Scene");
  }
}
