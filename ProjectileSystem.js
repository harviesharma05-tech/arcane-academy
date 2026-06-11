/**
 * 💥 Arcane Academy - Projectile System
 * Handles fireballs and future spell projectiles
 */

export default class ProjectileSystem {
  constructor(enemy, player) {
    this.enemy = enemy;
    this.player = player;

    this.projectiles = [];
  }

  /**
   * 🔥 Spawn Fireball
   */
  spawnFireball(startX, startY, targetX, targetY, damage) {
    const dx = targetX - startX;
    const dy = targetY - startY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    this.projectiles.push({
      x: startX,
      y: startY,

      vx: (dx / distance) * 8,
      vy: (dy / distance) * 8,

      damage,
      size: 8,
      dead: false
    });

    console.log("🔥 Fireball Spawned");
  }

  /**
   * 🔁 Update Projectiles
   */
  update() {
    this.projectiles.forEach((projectile) => {
      projectile.x += projectile.vx;
      projectile.y += projectile.vy;

      // Enemy collision
      const hit =
        projectile.x <
          this.enemy.x + this.enemy.size &&
        projectile.x + projectile.size >
          this.enemy.x &&
        projectile.y <
          this.enemy.y + this.enemy.size &&
        projectile.y + projectile.size >
          this.enemy.y;

      if (hit) {
        this.enemy.takeDamage(projectile.damage);

        projectile.dead = true;

        console.log(
          `💥 Hit Enemy (-${projectile.damage} HP)`
        );
      }

      // Remove offscreen projectiles
      if (
        projectile.x < -50 ||
        projectile.x > window.innerWidth + 50 ||
        projectile.y < -50 ||
        projectile.y > window.innerHeight + 50
      ) {
        projectile.dead = true;
      }
    });

    this.projectiles =
      this.projectiles.filter(
        (projectile) => !projectile.dead
      );
  }

  /**
   * 🎨 Render Projectiles
   */
  render(ctx) {
    this.projectiles.forEach((projectile) => {
      // Glow
      ctx.beginPath();
      ctx.arc(
        projectile.x,
        projectile.y,
        projectile.size + 3,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(255,140,0,0.3)";
      ctx.fill();

      // Fireball
      ctx.beginPath();
      ctx.arc(
        projectile.x,
        projectile.y,
        projectile.size,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "orange";
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(
        projectile.x,
        projectile.y,
        projectile.size / 2,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "yellow";
      ctx.fill();
    });
  }
}
