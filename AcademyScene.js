import Player from "./Player.js";
import Enemy from "./Enemy.js";
import CombatSystem from "./CombatSystem.js";
import SpellSystem from "./SpellSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
  }

  init() {
    console.log("🏰 Academy Scene Initialized");

    this.player = new Player(150, 150);
    console.log("PLAYER CREATED:", this.player);

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
  }

  update(deltaTime) {
    const input = this.game.input;

    if (this.player) {
      this.player.update(input);
    }

    if (this.enemy) {
      this.enemy.update(this.player);
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
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText(
      "Arcane Academy Debug",
      20,
      40
    );

    // FORCE DRAW PLAYER
    ctx.fillStyle = "cyan";
    ctx.fillRect(
      150,
      150,
      50,
      50
    );

    // FORCE DRAW ENEMY
    ctx.fillStyle = "red";
    ctx.fillRect(
      500,
      250,
      50,
      50
    );

    // Real Player Render
    if (this.player) {
      this.player.render(ctx);
    }

    // Real Enemy Render
    if (this.enemy) {
      this.enemy.render(ctx);
    }
  }

  unload() {}
}
