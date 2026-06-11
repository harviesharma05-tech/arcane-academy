/**
 * 💥 Arcane Academy - Projectile System
 * Real moving fireballs (not instant hit anymore)
 */

export default class ProjectileSystem {
  constructor(enemy) {
    this.enemy = enemy;
    this.projectiles = [];
  }

  /**
   * 🔥 Create fireball
   */
  spawnFireball(x, y, targetX, targetY, damage) {
    const dx = targetX - x;
    const dy = targetY - y;
    const length = Math.sqrt(dx * dx + dy * dy);

    this.projectiles.push({
      x,
      y,
      vx: (dx / length) * 6,
      vy: (dy / length) * 6,
      damage,
    });
  }

  /**
   * 🔁 Update projectiles
   */
  update() {
    this.projectiles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      const dx = p.x - this.enemy.x;
      const dy = p.y - this.enemy.y;

      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 30) {
        this.enemy.takeDamage(p.damage);
        p.hit = true;
      }
    });

    // cleanup
    this.projectiles = this.projectiles.filter(p => !p.hit);
  }

  /**
   * 🎨 Render projectiles
   */
  render(ctx) {
    ctx.fillStyle = "orange";

    this.projectiles.forEach(p => {
      ctx.fillRect(p.x, p.y, 6, 6);
    });
  }
}
