/**
 * ⚔️ Arcane Academy - Combat System
 * Version 9
 */

export default class CombatSystem {
  constructor(
    player,
    enemy,
    economySystem = null,
    waveSystem = null
  ) {
    this.player = player;
    this.enemy = enemy;

    this.economySystem = economySystem;
    this.waveSystem = waveSystem;

    this.killCount = 0;
  }

  /**
   * 🔁 Update Combat
   */
  update() {

    // Enemy dead
    if (this.enemy.hp <= 0) {

      this.killCount++;

      // XP Reward
      if (this.player.gainXP) {
        this.player.gainXP(
          this.enemy.xpReward || 25
        );
      }

      // Gold Reward
      const gold =
        this.enemy.goldReward || 20;

      if (
        this.economySystem &&
        this.economySystem.addGold
      ) {
        this.economySystem.addGold(
          gold
        );
      }
      else if (
        this.player.addGold
      ) {
        this.player.addGold(
          gold
        );
      }

      // Wave System
      if (
        this.waveSystem &&
        this.waveSystem.enemyKilled
      ) {
        this.waveSystem.enemyKilled();
      }

      console.log(
        `⚔️ Enemy Defeated | Kills: ${this.killCount}`
      );

      // Respawn Enemy
      this.enemy.hp =
        this.enemy.maxHP;

      this.enemy.x =
        300 +
        Math.random() * 700;

      this.enemy.y =
        100 +
        Math.random() * 400;
    }
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    ctx.fillStyle =
      "white";

    ctx.font =
      "14px Arial";

    ctx.fillText(
      `XP: ${this.player.xp}`,
      20,
      210
    );

    ctx.fillText(
      `Kills: ${this.killCount}`,
      20,
      235
    );

    ctx.fillText(
      `Enemy HP: ${Math.floor(
        this.enemy.hp
      )}`,
      20,
      260
    );

    if (
      this.player.gold !== undefined
    ) {
      ctx.fillText(
        `Gold: ${this.player.gold}`,
        20,
        285
      );
    }
  }
}
