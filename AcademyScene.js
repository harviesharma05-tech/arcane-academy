/**
 * 🏰 Arcane Academy - Main Gameplay Scene (PHASE 4)
 */

import Player from "./Player.js";
import Enemy from "./Enemy.js";
import CombatSystem from "./CombatSystem.js";
import SpellSystem from "./SpellSystem.js";
import ProjectileSystem from "./ProjectileSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;

    this.player = null;
    this.enemy = null;

    this.combat = null;
    this.spellSystem = null;
    this.projectiles = null;
  }

  /**
   * 🎬 Initialize Scene
   */
  init() {
    console.log("🏰 Academy Scene Initialized");

    // 🧍 Player
    this.player = new Player(250, 300);

    // 👾 Enemy
    this.enemy = new Enemy(700, 300);

    // 💥 Projectile System
    this.projectiles = new ProjectileSystem(
      this.enemy,
      this.player
    );

    // ⚔️ Combat
    this.combat = new CombatSystem(
      this.player,
      this.enemy
    );

    // 🪄 Spells
    this.spellSystem = new SpellSystem(
      this.player,
      this.enemy,
      this.projectiles
    );

    // HUD
    if (this.game.hud) {
      this.game.hud.player = this.player;
    }

    // Game State
    if (this.game.gameState) {
      this.game.gameState.player = this.player;
      this.game.gameState.enemy = this.enemy;
    }

    console.log("✅ Scene Ready");
  }

  /**
   * 🔁 Update Loop
   */
  update(deltaTime) {
    const input = this.game.input;

    // Player
    this.player.update(input);

    // Fireball
    if (input.isPressed(" ")) {
      this.spellSystem.cast("fireball");
    }

    // Shield
    if (
      input.isPressed("shift") ||
      input.isPressed("shiftleft") ||
      input.isPressed("shiftright")
    ) {
      this.spellSystem.cast("shield");
    }

    // Enemy AI
    this.enemy.update(this.player);

    // Systems
    this.projectiles.update();
    this.combat.update(deltaTime);
    this.spellSystem.update(deltaTime);
  }

  /**
   * 🎨 Render Scene
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

    // Entities
    this.player.render(ctx);
    this.enemy.render(ctx);

    // Projectiles
    this.projectiles.render(ctx);

    // Systems UI
    this.combat.render(ctx);
    this.spellSystem.render(ctx);
  }

  /**
   * 🚪 Cleanup
   */
  unload() {
    console.log("🚪 Leaving Academy Scene");
  }
}
