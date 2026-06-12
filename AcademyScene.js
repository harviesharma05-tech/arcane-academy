/**
 * 🏰 Arcane Academy - Main Gameplay Scene (PHASE 4)
 */

import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";

import CombatSystem from "../systems/CombatSystem.js";
import SpellSystem from "../systems/SpellSystem.js";
import ProjectileSystem from "../systems/ProjectileSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
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

    // Game State
    this.game.gameState.player = this.player;
    this.game.gameState.enemy = this.enemy;

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
    if (input.isPressed(" ")) {
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
    this.combat.update(deltaTime);
    this.spellSystem.update(deltaTime);
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

    // Render entities
    this.player.render(ctx);
    this.enemy.render(ctx);

    // Render projectiles
    this.projectiles.render(ctx);

    // Render systems
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
