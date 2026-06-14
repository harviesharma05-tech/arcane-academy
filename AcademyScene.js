/**
 * 🏰 Arcane Academy - Main Gameplay Scene
 * VERSION 8
 */

import Player from "./Player.js";
import Enemy from "./Enemy.js";
import NPC from "./NPC.js";

import CombatSystem from "./CombatSystem.js";
import SpellSystem from "./SpellSystem.js";
import ProjectileSystem from "./ProjectileSystem.js";

import QuestSystem from "./QuestSystem.js";
import DialogueSystem from "./DialogueSystem.js";
import ShopSystem from "./ShopSystem.js";
import PotionSystem from "./PotionSystem.js";
import SaveSystem from "./SaveSystem.js";
import EconomySystem from "./EconomySystem.js";
import DayNightSystem from "./DayNightSystem.js";
import WeatherSystem from "./WeatherSystem.js";

export default class AcademyScene {
  constructor(game) {
    this.game = game;
  }

  /**
   * 🎬 Initialize Scene
   */
  init() {

    console.log("🏰 Academy Scene Loaded");

    // ======================
    // PLAYER
    // ======================
    this.player = new Player(150, 150);

    // ======================
    // ENEMY
    // ======================
    this.enemy = new Enemy(500, 250);

    // ======================
    // NPC
    // ======================
    this.npc = new NPC(300, 300);

    // ======================
    // SYSTEMS
    // ======================
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

    this.questSystem = new QuestSystem();

    this.dialogueSystem = new DialogueSystem();

    this.shopSystem = new ShopSystem();

    this.potionSystem = new PotionSystem(
      this.player
    );

    this.saveSystem = new SaveSystem();

    this.economySystem = new EconomySystem();

    this.dayNightSystem = new DayNightSystem();

    this.weatherSystem = new WeatherSystem();

    // ======================
    // HUD
    // ======================
    this.game.hud.player = this.player;

    // ======================
    // GAME STATE
    // ======================
    this.game.gameState.player = this.player;
    this.game.gameState.enemy = this.enemy;

    console.log("✅ Version 8 Ready");
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {

    const input = this.game.input;

    // Player
    this.player.update(input);

    // Enemy AI
    this.enemy.update(this.player);

    // Systems
    this.projectiles.update();

    this.combat.update(deltaTime);

    this.spellSystem.update(deltaTime);

    this.dayNightSystem.update();

    this.weatherSystem.update();

    // ======================
    // SPELLS
    // ======================
    if (input.isPressed("space")) {
      this.spellSystem.cast("fireball");
    }

    if (input.isPressed("shift")) {
      this.spellSystem.cast("shield");
    }

    // ======================
    // POTION
    // ======================
    if (input.isPressed("h")) {
      this.potionSystem.useHealthPotion();
    }

    // ======================
    // SAVE GAME
    // ======================
    if (input.isPressed("p")) {
      this.saveSystem.save(this.player);
    }

  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Background
    ctx.fillStyle = "#0b1020";
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
      "🪄 Arcane Academy V8",
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

    ctx.fillText(
      "H = Health Potion",
      20,
      155
    );

    ctx.fillText(
      "P = Save Game",
      20,
      180
    );

    // ======================
    // ENTITIES
    // ======================
    this.player.render(ctx);

    this.enemy.render(ctx);

    this.npc.render(ctx);

    // ======================
    // SYSTEMS
    // ======================
    this.projectiles.render(ctx);

    this.combat.render(ctx);

    this.spellSystem.render(ctx);

    this.dayNightSystem.render(ctx);

    this.weatherSystem.render(ctx);
  }

  /**
   * 🚪 Cleanup
   */
  unload() {
    console.log("Leaving Academy Scene");
  }
}
