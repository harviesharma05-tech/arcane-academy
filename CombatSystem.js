/**
 * ⚔️ Arcane Academy - Combat System (V0.8.0)
 * Handles enemy defeat, XP rewards, gold rewards, quest progress and respawning
 */

export default class CombatSystem {
  constructor(player, enemy, questSystem = null, economySystem = null) {

    this.player = player;
    this.enemy = enemy;

    this.questSystem = questSystem;
    this.economySystem = economySystem;

    this.killCount = 0;
  }

  /**
   * 🔁 Update Combat
   */
  update() {

    // Enemy defeated
    if (this.enemy.hp <= 0) {

      this.killCount++;

      // XP reward
      this.player.gainXP(25);

      // Gold reward
      if (this.economySystem) {

        const goldReward =
          10 + Math.floor(Math.random() * 16);

        this.economySystem.addGold(
          goldReward
        );
      }

      // Quest progress
      if (this.questSystem) {

        this.questSystem.enemyKilled();

      }

      console.log(
        `👾 Enemy Defeated | Kills: ${this.killCount}`
      );

      // Respawn enemy
      this.enemy.hp =
        this.enemy.maxHP;

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
