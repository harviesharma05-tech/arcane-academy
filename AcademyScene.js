/**
 * 🪄 Arcane Academy - Main Gameplay Scene (UPDATED)
 * Phase 1 Integrated: GameState + HUD + Spell System + Input Actions
 */

import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import CombatSystem from "../systems/CombatSystem.js";
import SpellSystem from "../systems/SpellSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
  }

  /**
   * 🎬 Initialize scene
   */
  init() {
    console.log("🏰 Academy Scene Initialized");

    // 🧍 Player
    this.player = new Player(150, 150);

    // 👾 Enemy
    this.enemy = new Enemy(500, 250);

    // ⚔️ Systems
    this.combat = new CombatSystem(this.player, this.enemy);
    this.spellSystem = new SpellSystem(this.player, this.enemy);

    // 🎮 Game State (Phase 1)
    this.game.gameState.player = this.player;
    this.game.gameState.enemy = this.enemy;

    // 🖥️ HUD (Phase 1)
    this.game.hud.player = this.player;
  }

  /**
   * 🔁 Update loop
   */
  update(deltaTime) {
    const input = this.game.input;

    // ⏸ Stop everything if paused or gameover
    if (this.game.gameState.state !== "playing") return;

    // 🧍 Player movement
    this.player.update(input);

    // 🎯 INPUT → ACTION MAPPING
    if (input.isPressed(" ")) {
      this.spellSystem.cast("fireball");
    }

    if (input.isPressed("shift")) {
      this.spellSystem.cast("shield");
    }

    // 👾 Enemy AI
    this.enemy.update(this.player);

    // ⚔️ Combat system
    this.combat.update(deltaTime);

    // 🪄 Spell system (projectiles etc.)
    this.spellSystem.update();

    // 🎮 Update global state
    this.game.gameState.update();
  }

  /**
   * 🎨 Render scene
   */
  render(ctx) {
    // Background
    ctx.fillStyle = "#0b0f1a";
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    // Title
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "14px monospace";
    ctx.fillText("🏰 Arcane Academy - Training Grounds", 20, 30);

    // Entities
    this.player.render(ctx);
    this.enemy.render(ctx);

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
