/**
 * ⚔️ Arcane Academy - Combat System
 */

export default class CombatSystem {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
  }

  /**
   * 🔁 Update combat logic
   */
  update(deltaTime) {
    // Enemy defeated
    if (this.enemy.hp <= 0) {
      this.enemy.hp = this.enemy.maxHP;

      this.enemy.x =
        300 + Math.random() * 400;

      this.enemy.y =
        100 + Math.random() * 300;

      // XP Reward
      this.player.xp += 25;

      console.log("⭐ Enemy defeated");
    }
  }

  /**
   * 🎨 Debug Render
   */
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "14px monospace";

    ctx.fillText(
      `Enemy HP: ${Math.floor(this.enemy.hp)}`,
      20,
      170
    );

    ctx.fillText(
      `XP: ${this.player.xp}`,
      20,
      190
    );
  }
}
