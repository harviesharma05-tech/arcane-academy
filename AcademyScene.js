/**
 * 🏰 Arcane Academy - Main Gameplay Scene
 * Stable Debug Version
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
   * 🎬 Scene Init
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

    // Player movement
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

    // Title
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "18px monospace";
    ctx.fillText(
      "🪄 Arcane Academy",
      20,
      30
    );

    // Debug square
    ctx.fillStyle = "red";
    ctx.fillRect(100, 100, 50, 50);

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
