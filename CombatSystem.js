/**
 * ⚔️ Arcane Academy V0.8.0
 * Combat System
 * Handles enemy defeat, XP rewards, quest progress and respawning
 */

export default class CombatSystem {
  constructor(player, enemy, questSystem = null) {
    this.player = player;
    this.enemy = enemy;
    this.questSystem = questSystem;

    this.killCount = 0;
  }

  /**
   * 🔁 Update Combat
   */
  update() {

    // Enemy defeated
    if (this.enemy.hp <= 0) {

      this.killCount++;

      // Give XP
      this.player.gainXP(25);

      // Update quests
      if (this.questSystem) {
        this.questSystem.enemyKilled();
      }

      console.log(
        `👾 Enemy defeated | Kills: ${this.killCount}`
      );

      // Respawn enemy
      this.enemy.hp = this.enemy.maxHP;

      this.enemy.x =
        400 + Math.random() * 500;

      this.enemy.y =
        100 + Math.random() * 400;
    }
  }

  /**
   * 🎨 Render Combat Stats
   */
  render(ctx) {

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText(
      `👾 Kills: ${this.killCount}`,
      20,
      260
    );

    ctx.fillText(
      `⭐ XP: ${this.player.xp}/${this.player.xpToNextLevel}`,
      20,
      285
    );

    ctx.fillText(
      `❤️ Enemy HP: ${Math.floor(this.enemy.hp)}`,
      20,
      310
    );

  }
}
