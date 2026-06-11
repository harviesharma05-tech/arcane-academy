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

  init() {
    console.log("🏰 Academy Scene Initialized");

    this.player = new Player(150, 150);
    this.enemy = new Enemy(500, 250);

    this.combat = new CombatSystem(
      this.player,
      this.enemy
    );

    this.spellSystem = new SpellSystem(
      this.player,
      this.enemy
    );

    if (this.game.hud) {
      this.game.hud.player = this.player;
    }

    if (this.game.gameState) {
      this.game.gameState.player = this.player;
      this.game.gameState.enemy = this.enemy;
    }
  }

  update(deltaTime) {
    const input = this.game.input;

    this.player.update(input);

    if (input.isPressed(" ")) {
      this.spellSystem.cast("fireball");
    }

    if (input.isPressed("shift")) {
      this.spellSystem.cast("shield");
    }

    this.enemy.update(this.player);

    this.combat?.update(deltaTime);
    this.spellSystem?.update(deltaTime);
  }

  render(ctx) {
    ctx.fillStyle = "#0b0f1a";
    ctx.fillRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );

    ctx.fillStyle = "#7dd3fc";
    ctx.font = "24px Arial";
    ctx.fillText("🪄 Arcane Academy", 20, 50);

    // DEBUG PLAYER
    ctx.fillStyle = "cyan";
    ctx.fillRect(
      this.player.x,
      this.player.y,
      32,
      32
    );

    // Try actual player render
    try {
      this.player.render(ctx);
    } catch (err) {
      console.error("Player Render Error:", err);
    }

    // Enemy
    try {
      this.enemy.render(ctx);
    } catch (err) {
      console.error("Enemy Render Error:", err);
    }

    // Systems
    this.combat?.render?.(ctx);
    this.spellSystem?.render?.(ctx);
  }

  unload() {
    console.log("🚪 Leaving Academy Scene");
  }
}
