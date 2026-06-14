/**
 * 🏰 Arcane Academy - Main Gameplay Scene (V0.8.0)
 */

import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import NPC from "../entities/NPC.js";

import CombatSystem from "../systems/CombatSystem.js";
import SpellSystem from "../systems/SpellSystem.js";
import ProjectileSystem from "../systems/ProjectileSystem.js";

import QuestSystem from "../systems/QuestSystem.js";
import DialogueSystem from "../systems/DialogueSystem.js";
import EconomySystem from "../systems/EconomySystem.js";
import PotionSystem from "../systems/PotionSystem.js";
import ShopSystem from "../systems/ShopSystem.js";
import DayNightSystem from "../systems/DayNightSystem.js";
import WeatherSystem from "../systems/WeatherSystem.js";
import SaveSystem from "../systems/SaveSystem.js";

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

    // NPC
    this.masterWizard = new NPC(
      300,
      400,
      "Master Wizard"
    );

    // Systems
    this.projectiles = new ProjectileSystem(
      this.enemy,
      this.player
    );

    this.spellSystem = new SpellSystem(
      this.player,
      this.enemy,
      this.projectiles
    );

    this.questSystem = new QuestSystem(
      this.player
    );

    this.combat = new CombatSystem(
      this.player,
      this.enemy,
      this.questSystem
    );

    this.dialogueSystem =
      new DialogueSystem();

    this.economySystem =
      new EconomySystem();

    this.potionSystem =
      new PotionSystem(
        this.player
      );

    this.shopSystem =
      new ShopSystem(
        this.economySystem,
        this.potionSystem
      );

    this.dayNightSystem =
      new DayNightSystem();

    this.weatherSystem =
      new WeatherSystem();

    this.saveSystem =
      new SaveSystem();

    // HUD
    this.game.hud.player =
      this.player;

    // Load save
    this.saveSystem.load(
      this.player
    );

    console.log(
      "✅ Academy Scene Ready"
    );
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {

    const input =
      this.game.input;

    // Player
    this.player.update(input);

    // Fireball
    if (
      input.isPressed("space")
    ) {

      this.spellSystem.cast(
        "fireball"
      );

    }

    // Shield
    if (
      input.isPressed("shift")
    ) {

      this.spellSystem.cast(
        "shield"
      );

    }

    // Save game
    if (
      input.isPressed("p")
    ) {

      this.saveSystem.save(
        this.player
      );

    }

    // Potions
    if (
      input.isPressed("1")
    ) {

      this.potionSystem.useHealthPotion();

    }

    if (
      input.isPressed("2")
    ) {

      this.potionSystem.useManaPotion();

    }

    // Enemy AI
    this.enemy.update(
      this.player
    );

    // NPC
    this.masterWizard.update();

    // Dialogue
    this.dialogueSystem.update(
      input
    );

    // Systems
    this.projectiles.update();

    this.combat.update();

    this.spellSystem.update();

    this.dayNightSystem.update();

    this.weatherSystem.update();
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
      "🪄 Arcane Academy V0.8.0",
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
      "1 = Health Potion",
      20,
      155
    );

    ctx.fillText(
      "2 = Mana Potion",
      20,
      180
    );

    ctx.fillText(
      "P = Save Game",
      20,
      205
    );

    // Entities
    this.player.render(ctx);

    this.enemy.render(ctx);

    this.masterWizard.render(ctx);

    // Systems
    this.projectiles.render(ctx);

    this.combat.render(ctx);

    this.spellSystem.render(ctx);

    this.questSystem.render(ctx);

    this.economySystem.render(ctx);

    this.dialogueSystem.render(ctx);

    this.weatherSystem.render(ctx);

    this.dayNightSystem.render(ctx);
  }

  /**
   * 🚪 Cleanup
   */
  unload() {

    console.log(
      "🚪 Leaving Academy Scene"
    );

  }
}
