/**
 * 🏰 Arcane Academy - Main Gameplay Scene
 * VERSION 9
 */

import Player from "./Player.js";
import Enemy from "./Enemy.js";
import NPC from "./NPC.js";

import CombatSystem from "./CombatSystem.js";
import SpellSystem from "./SpellSystem.js";
import ProjectileSystem from "./ProjectileSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
  }

  init() {
    console.log("🏰 Academy Scene Loaded");

    // Player
    this.player = new Player(150, 150);

    // Enemy
    this.enemy = new Enemy(500, 250);

    // NPC
    this.npc = new NPC(350, 300);

    // Dungeon Portal
    this.dungeonPortal = {
      x: 900,
      y: 250,
      size: 80
    };

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

    console.log("✅ Academy Ready");
  }

  update(deltaTime) {
    const input = this.game.input;

    // Player
    this.player.update(input);

    // Enemy
    this.enemy.update(this.player);

    // Fireball
    if (input.isPressed("space")) {
      this.spellSystem.cast("fireball");
    }

    // Shield
    if (input.isPressed("shift")) {
      this.spellSystem.cast("shield");
    }

    // Systems
    this.projectiles.update();
    this.combat.update(deltaTime);
    this.spellSystem.update(deltaTime);

    // Portal Collision
    const p = this.player;
    const portal = this.dungeonPortal;

    const touchingPortal =
      p.x < portal.x + portal.size &&
      p.x + p.size > portal.x &&
      p.y < portal.y + portal.size &&
      p.y + p.size > portal.y;

    if (touchingPortal) {
      console.log("🌀 Entering Dungeon");

      this.game.sceneManager.switchScene(
        "dungeon"
      );
    }
  }

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
      "🪄 Arcane Academy V9",
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

    // Portal
    ctx.fillStyle = "purple";

    ctx.fillRect(
      this.dungeonPortal.x,
      this.dungeonPortal.y,
      this.dungeonPortal.size,
      this.dungeonPortal.size
    );

    ctx.fillStyle = "white";

    ctx.fillText(
      "Dungeon",
      this.dungeonPortal.x - 10,
      this.dungeonPortal.y - 10
    );

    // Entities
    this.player.render(ctx);

    this.enemy.render(ctx);

    if (this.npc && this.npc.render) {
      this.npc.render(ctx);
    }

    // Systems
    this.projectiles.render(ctx);

    this.combat.render(ctx);

    this.spellSystem.render(ctx);
  }

  unload() {
    console.log("🚪 Leaving Academy");
  }
}
