/**
 * 🏰 Arcane Academy - Main Gameplay Scene
 */

import Player from "./Player.js";
import Enemy from "./Enemy.js";

import CombatSystem from "./CombatSystem.js";
import SpellSystem from "./SpellSystem.js";
import ProjectileSystem from "./ProjectileSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
  }

  /**
   * 🎬 Initialize
   */
  init() {
    console.log("🏰 Academy Scene Initialized");

    // Player
    this.player = new Player(150, 150);

    // Enemy
    this.enemy = new Enemy(500, 250);

    // Systems
    this.projectiles = new ProjectileSystem(
      this.enemy,
      this.player
    );

    this.combat = new CombatSystem(
      this.player,
      this.enemy
    );

    this.spellSystem = new SpellSystem(
      this.player,
      this.enemy,
      this.projectiles
    );

    // HUD
    this.game.hud.player = this.player;

    console.log("✅ Academy Scene Ready");
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {
    const input = this.game.input;

    // Player movement
    this.player.update(input);

    // Fireball
    if (input.isPressed("space")) {
      this.spellSystem.cast("fireball");
    }

    // Shield
    if (input.isPressed("shift")) {
      this.spellSystem.cast("shield");
    }

    // Enemy AI
    this.enemy.update(this.player);

    // Systems
    this.projectiles.update();
    this.combat.update();

    if (this.spellSystem.update) {
      this.spellSystem.update();
    }
  }

  /**
   * 🎨 Render
   */
  render(ctx) {
    // Title
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "28px Arial";
    ctx.fillText(
      "🪄 Arcane Academy",
      20,
      40
    );

    // Controls
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText(
      "WASD = Move",
      20,
      80
    );

    ctx.fillText(
      "SPACE = Fireball",
      20,
      105
    );

    ctx.fillText(
      "SHIFT = Shield",
      20,
      130
    );

    // Draw entities
    this.player.render(ctx);
    this.enemy.render(ctx);

    // Draw projectiles
    this.projectiles.render(ctx);

    // Draw combat info
    this.combat.render(ctx);

    // Draw spell info
    this.spellSystem.render(ctx);
  }

  /**
   * 🚪 Cleanup
   */
  unload() {
    console.log("🚪 Leaving Academy Scene");
  }
}
