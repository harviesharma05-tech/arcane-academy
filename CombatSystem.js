/**
 * 👾 Arcane Academy - Enemy Entity
 * Basic AI: idle movement, player detection, chase & attack
 */

export default class Enemy {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 32;
    this.color = "red";

    // Stats
    this.hp = 100;
    this.maxHP = 100;
    this.damage = 5;

    // AI
    this.speed = 1.5;
    this.state = "idle"; // idle | chase | attack

    // Behavior
    this.detectionRange = 180;
    this.attackRange = 40;

    // Movement
    this.velocityX = 0;
    this.velocityY = 0;
  }

  /**
   * 🔁 Update AI logic
   */
  update(player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // AI STATE DECISION
    if (distance < this.attackRange) {
      this.state = "attack";
    } else if (distance < this.detectionRange) {
      this.state = "chase";
    } else {
      this.state = "idle";
    }

    // STATE BEHAVIOR
    if (this.state === "chase") {
      this.chasePlayer(dx, dy, distance);
    }

    if (this.state === "attack") {
      this.attackPlayer(player);
    }

    if (this.state === "idle") {
      this.idleMovement();
    }
  }

  /**
   * 🧠 Chase player behavior
   */
  chasePlayer(dx, dy, distance) {
    this.velocityX = (dx / distance) * this.speed;
    this.velocityY = (dy / distance) * this.speed;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  /**
   * ⚔️ Attack player
   */
  attackPlayer(player) {
    // simple damage tick (can be upgraded to cooldown system)
    player.takeDamage(this.damage);
  }

  /**
   * 😴 Idle movement (small random motion)
   */
  idleMovement() {
    this.x += Math.sin(Date.now() / 500) * 0.3;
    this.y += Math.cos(Date.now() / 500) * 0.3;
  }

  /**
   * 💥 Take damage
   */
  takeDamage(amount) {
    this.hp -= amount;

    if (this.hp < 0) this.hp = 0;
  }

  /**
   * 🎨 Render enemy
   */
  render(ctx) {
    // Enemy body
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // HP bar background
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y - 10, this.size, 5);

    // HP bar fill
    ctx.fillStyle = "lime";
    ctx.fillRect(
      this.x,
      this.y - 10,
      this.size * (this.hp / this.maxHP),
      5
    );

    // State indicator (debug useful for recruiters)
    ctx.fillStyle = "white";
    ctx.font = "10px monospace";
    ctx.fillText(this.state, this.x, this.y - 15);
  }
}
