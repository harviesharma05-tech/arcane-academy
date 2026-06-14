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
    this.player = new Player(
      150,
      150
    );

    // Enemy
    this.enemy = new Enemy(
      500,
      250
    );

    // NPC
    this.masterWizard = new NPC(
      300,
      400,
      "Master Wizard"
    );

    // Systems
    this.projectiles =
      new ProjectileSystem(
        this.enemy,
        this.player
      );

    this.questSystem =
      new QuestSystem(
        this.player
      );

    this.combat =
      new CombatSystem(
        this.player,
        this.enemy,
        this.questSystem
      );

    this.spellSystem =
      new SpellSystem(
        this.player,
        this.enemy,
        this.projectiles
      );

    this.dialogueSystem =
      new DialogueSystem();

    // HUD
    this.game.hud.player =
      this.player;

    // Game State
    this.game.gameState.player =
      this.player;

    this.game.gameState.enemy =
      this.enemy;

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

    // Enemy AI
    this.enemy.update(
      this.player
    );

    // NPC animation
    this.masterWizard.update();

    // Start dialogue
    if (
      this.masterWizard.isNear(
        this.player
      ) &&
      input.isPressed("e") &&
      !this.dialogueSystem.isActive
    ) {

      this.dialogueSystem.start(
        "Master Wizard",
        [
          "Welcome to Arcane Academy.",
          "Defeat enemies to gain XP.",
          "Use SPACE to cast Fireball.",
          "Use SHIFT for Shield.",
          "Good luck, apprentice!"
        ]
      );

    }

    // Dialogue update
    this.dialogueSystem.update(
      input
    );

    // Systems
    this.projectiles.update();

    this.combat.update(
      deltaTime
    );

    this.spellSystem.update(
      deltaTime
    );
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Background
    ctx.fillStyle =
      "#0b0f1a";

    ctx.fillRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );

    // Title
    ctx.fillStyle =
      "#7dd3fc";

    ctx.font =
      "28px Arial";

    ctx.fillText(
      "🪄 Arcane Academy V0.8.0",
      20,
      40
    );

    // Controls
    ctx.fillStyle =
      "white";

    ctx.font =
      "16px Arial";

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
      "E = Talk",
      20,
      155
    );

    // Entities
    this.player.render(ctx);

    this.enemy.render(ctx);

    this.masterWizard.render(ctx);

    // Systems
    this.projectiles.render(
      ctx
    );

    this.combat.render(
      ctx
    );

    this.spellSystem.render(
      ctx
    );

    this.questSystem.render(
      ctx
    );

    this.dialogueSystem.render(
      ctx
    );
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
