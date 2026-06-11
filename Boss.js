/**
 * 🧠 Arcane Academy - Boss Enemy
 * Multi-phase AI system
 */

export default class Boss {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 60;
    this.hp = 300;
    this.maxHP = 300;

    this.phase = 1;
    this.speed = 1;
  }

  update(player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;

    const dist = Math.sqrt(dx * dx + dy * dy);

    // PHASE SWITCH
    if (this.hp < 200) this.phase = 2;
    if (this.hp < 100) this.phase = 3;

    // Behavior changes by phase
    if (this.phase === 1) {
      this.x += dx * 0.01;
      this.y += dy * 0.01;
    }

    if (this.phase === 2) {
      this.x += dx * 0.02;
      this.y += dy * 0.02;
    }

    if (this.phase === 3) {
      this.x += dx * 0.03;
      this.y += dy * 0.03;
    }

    // attack
    if (dist < 50) {
      player.takeDamage(10);
    }
  }

  takeDamage(dmg) {
    this.hp -= dmg;
  }

  render(ctx) {
    ctx.fillStyle = "purple";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // HP bar
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 10, this.size, 5);

    ctx.fillStyle = "lime";
    ctx.fillRect(
      this.x,
      this.y - 10,
      this.size * (this.hp / this.maxHP),
      5
    );

    ctx.fillStyle = "white";
    ctx.font = "10px monospace";
    ctx.fillText(`BOSS P${this.phase}`, this.x, this.y - 15);
  }
}
