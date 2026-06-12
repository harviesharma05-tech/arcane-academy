/**
 * 👑 Arcane Academy - Boss Entity
 * Phase 6 Boss with Multi-Phase AI
 */

export default class Boss {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 80;
    this.color = "purple";

    // Identity
    this.name = "Archmage Malakar";

    // Stats
    this.maxHP = 500;
    this.hp = 500;
    this.damage = 15;

    // Movement
    this.speed = 1.5;

    // AI
    this.state = "idle";
    this.phase = 1;

    this.detectionRange = 400;
    this.attackRange = 70;
  }

  /**
   * 🔁 Update Boss
   */
  update(player) {
    this.updatePhase();

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.attackRange) {
      this.state = "attack";
    } else if (distance <= this.detectionRange) {
      this.state = "chase";
    } else {
      this.state = "idle";
    }

    if (this.state === "chase") {
      this.chasePlayer(dx, dy, distance);
    }

    if (this.state === "attack") {
      this.attackPlayer(player);
    }
  }

  /**
   * 🧠 Phase System
   */
  updatePhase() {
    const hpPercent = this.hp / this.maxHP;

    if (hpPercent <= 0.3) {
      this.phase = 3;
      this.speed = 3;
      this.damage = 30;
    } else if (hpPercent <= 0.7) {
      this.phase = 2;
      this.speed = 2.2;
      this.damage = 20;
    } else {
      this.phase = 1;
      this.speed = 1.5;
      this.damage = 15;
    }
  }

  /**
   * 🚶 Chase Player
   */
  chasePlayer(dx, dy, distance) {
    if (distance === 0) return;

    this.x += (dx / distance) * this.speed;
    this.y += (dy / distance) * this.speed;
  }

  /**
   * ⚔ Attack
   */
  attackPlayer(player) {
    player.takeDamage(this.damage);
  }

  /**
   * 💥 Take Damage
   */
  takeDamage(amount) {
    this.hp -= amount;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  /**
   * ☠ Dead?
   */
  isDead() {
    return this.hp <= 0;
  }

  /**
   * 🎨 Render
   */
  render(ctx) {
    // Body
    ctx.fillStyle = this.color;

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;

    ctx.strokeRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // HP Bar Background
    ctx.fillStyle = "black";

    ctx.fillRect(
      this.x,
      this.y - 20,
      this.size,
      8
    );

    // HP Bar
    ctx.fillStyle = "red";

    ctx.fillRect(
      this.x,
      this.y - 20,
      this.size * (this.hp / this.maxHP),
      8
    );

    // Name
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
      this.name,
      this.x,
      this.y - 30
    );

    // Phase Indicator
    ctx.fillStyle = "yellow";

    ctx.fillText(
      `Phase ${this.phase}`,
      this.x,
      this.y + this.size + 20
    );
  }
}
