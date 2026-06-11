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
    try {
      console.log("STEP 1");

      this.player = new Player(150, 150);

      console.log("STEP 2");

      this.enemy = new Enemy(500, 250);

      console.log("STEP 3");

      this.combat = new CombatSystem(
        this.player,
        this.enemy
      );

      console.log("STEP 4");

      this.spellSystem = new SpellSystem(
        this.player,
        this.enemy
      );

      console.log("STEP 5");

      // Connect HUD
      if (this.game.hud) {
        this.game.hud.player = this.player;
      }

      // Connect Game State
      if (this.game.gameState) {
        this.game.gameState.player = this.player;
        this.game.gameState.enemy = this.enemy;
      }

      console.log("✅ AcademyScene initialized");
    } catch (err) {
      console.error("❌ AcademyScene Init Error:", err);
    }
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {
    if (!this.player || !this.enemy) return;

    const input = this.game.input;

    this.player.update(input);

    if (
      this.spellSystem &&
      input.isPressed(" ")
    ) {
      this.spellSystem.cast("fireball");
    }

    if (
      this.spellSystem &&
      input.isPressed("shift")
    ) {
      this.spellSystem.cast("shield");
    }

    this.enemy.update(this.player);

    if (this.combat?.update) {
      this.combat.update(deltaTime);
    }

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
    ctx.font = "24px Arial";
    ctx.fillText(
      "🪄 Arcane Academy",
      20,
      50
    );

    // Debug square
    ctx.fillStyle = "yellow";
    ctx.fillRect(300, 150, 60, 60);

    try {
      this.player?.render(ctx);
    } catch (err) {
      console.error("Player Render Error:", err);
    }

    try {
      this.enemy?.render(ctx);
    } catch (err) {
      console.error("Enemy Render Error:", err);
    }

    try {
      this.combat?.render?.(ctx);
    } catch (err) {
      console.error("Combat Render Error:", err);
    }

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
