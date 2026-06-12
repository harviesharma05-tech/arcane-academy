/**
 * 🪄 Arcane Academy - Spell System
 */

export default class SpellSystem {
  constructor(player, enemy, projectiles) {
    this.player = player;
    this.enemy = enemy;
    this.projectiles = projectiles;

    this.lastFireball = 0;
    this.lastShield = 0;
  }

  update() {}

  cast(spellName) {
    const now = Date.now();

    // FIREBALL
    if (spellName === "fireball") {

      if (now - this.lastFireball < 500) {
        return;
      }

      if (!this.player.useMana(15)) {
        return;
      }

      this.lastFireball = now;

      this.projectiles.spawnFireball(
        this.player.x + this.player.size / 2,
        this.player.y + this.player.size / 2,
        this.enemy.x,
        this.enemy.y,
        25
      );

      console.log("🔥 Fireball");
    }

    // SHIELD
    if (spellName === "shield") {

      if (now - this.lastShield < 3000) {
        return;
      }

      if (!this.player.useMana(20)) {
        return;
      }

      this.lastShield = now;

      this.player.isShielded = true;

      setTimeout(() => {
        this.player.isShielded = false;
      }, 2000);

      console.log("🛡 Shield");
    }
  }

  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
      "🔥 Space = Fireball",
      20,
      260
    );

    ctx.fillText(
      "🛡 Shift = Shield",
      20,
      285
    );
  }
}
