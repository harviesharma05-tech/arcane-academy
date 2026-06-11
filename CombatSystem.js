/**
 * ⚔️ Arcane Academy - Combat System
 * Handles enemy defeat, XP rewards, and respawning
 */

export default class CombatSystem {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;

    this.killCount = 0;
  }

  /**
   * 🔁 Update Combat
   */
  update() {
    // Enemy defeated
    if (this.enemy.hp <= 0) {
      this.killCount++;

      // XP Reward
      if (this.player.gainXP) {
        this.player.gainXP(25);
      } else {
        this.player.xp += 25;
      }

      console.log(
        `⭐ Enemy Defeated | Kills: ${this.killCount}`
      );

      // Respawn Enemy
      this.enemy.hp = this.enemy.maxHP;

      this.enemy.x =
        400 + Math.random() * 400;

      this.enemy.y =
        100 + Math.random() * 300;
    }
  }

  /**
   * 🎨 Render Combat Stats
   */
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
      `XP: ${this.player.xp}`,
      20,
      180
    );

    ctx.fillText(
      `Kills: ${this.killCount}`,
      20,
      205
    );

    ctx.fillText(
      `Enemy HP: ${Math.floor(this.enemy.hp)}`,
      20,
      230
    );
  }
}
