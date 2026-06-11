/**
 * 🏰 Arcane Academy - Academy Scene
 * Debug Safe Version
 */

import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import CombatSystem from "../systems/CombatSystem.js";
import SpellSystem from "../systems/SpellSystem.js";

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

    // Player
    this.player = new Player(150, 150);

    // Enemy
    this.enemy = new Enemy(500, 250);

    // Systems
    this.combat = new CombatSystem(
      this.player,
      this.enemy
    );

    this.spellSystem = new SpellSystem(
      this.player,
      this.enemy
    );

    // Connect GameState
    if (this.game.gameState) {
      this.game.gameState.player = this.player;
      this.game.gameState.enemy = this.enemy;
    }

    // Connect HUD
    if (this.game.hud) {
      this.game.hud.player = this.player;
    }
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {
    if (!this.player || !this.enemy) return;

    const input = this.game.input;

    // Movement
    this.player.update(input);

    // Fireball
    if (input.isPressed(" ")) {
      this.spellSystem.cast("fireball");
    }

    // Shield
    if (input.isPressed("shift")) {
      this.spellSystem.cast("shield");
    }

    // Enemy AI
    this.enemy.update(this.player);

    // Combat
    if (this.combat?.update) {
      this.combat.update(deltaTime);
    }

    // Spells
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

    // Debug Title
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(
      "🪄 Arcane Academy Running",
      20,
      50
    );

    // Yellow Debug Square
    ctx.fillStyle = "yellow";
    ctx.fillRect(
      200,
      200,
      100,
      100
    );

    // Render Player
    try {
      this.player?.render(ctx);
    } catch (err) {
      console.error("Player Render Error:", err);
    }

    // Render Enemy
    try {
      this.enemy?.render(ctx);
    } catch (err) {
      console.error("Enemy Render Error:", err);
    }

    // Render Combat
    try {
      this.combat?.render?.(ctx);
    } catch (err) {
      console.error("Combat Render Error:", err);
    }

    // Render Spell System
    try {
      this.spellSystem?.render?.(ctx);
    } catch (err) {
      console.error("Spell Render Error:", err);
    }
  }

  /**
   * 🚪 Cleanup
   */
  unload() {
    console.log("🚪 Leaving Academy Scene");
  }
}
