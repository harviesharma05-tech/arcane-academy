/**
 * 🪄 Arcane Academy - Player Entity
 */

export default class Player {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 40;
    this.color = "cyan";

    // Movement
    this.speed = 6;

    // Stats
    this.maxHP = 100;
    this.hp = 100;

    this.maxMana = 100;
    this.mana = 100;

    // Progression
    this.level = 1;
    this.xp = 0;

    // State
    this.isShielded = false;
  }

  /**
   * 🔁 Update
   */
  update(input) {
    if (input.isDown("w")) this.y -= this.speed;
    if (input.isDown("s")) this.y += this.speed;
    if (input.isDown("a")) this.x -= this.speed;
    if (input.isDown("d")) this.x += this.speed;

    // Screen boundaries
    this.x = Math.max(
      0,
      Math.min(window.innerWidth - this.size, this.x)
    );

    this.y = Math.max(
      0,
      Math.min(window.innerHeight - this.size, this.y)
    );

    // Mana regeneration
    if (this.mana < this.maxMana) {
      this.mana += 0.05;
    }
  }

  /**
   * ❤️ Damage
   */
  takeDamage(amount) {
    if (this.isShielded) {
      amount *= 0.3;
    }

    this.hp -= amount;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  /**
   * 🔋 Mana Usage
   */
  useMana(amount) {
    if (this.mana < amount) {
      return false;
    }

    this.mana -= amount;
    return true;
  }

  /**
   * ⭐ XP
   */
  gainXP(amount) {
    this.xp += amount;

    if (this.xp >= 100) {
      this.level++;
      this.xp = 0;

      console.log(
        `⭐ Level Up! Level ${this.level}`
      );
    }
  }

  /**
   * 🎨 Render
   */
  render(ctx) {
    // Player body
    ctx.fillStyle = this.isShielded
      ? "lightblue"
      : this.color;

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // White border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.strokeRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // HP Bar
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x,
      this.y - 12,
      this.size,
      5
    );

    ctx.fillStyle = "lime";
    ctx.fillRect(
      this.x,
      this.y - 12,
      this.size * (this.hp / this.maxHP),
      5
    );

    // Mana Bar
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(
      this.x,
      this.y - 20,
      this.size * (this.mana / this.maxMana),
      4
    );

    // Label
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";

    ctx.fillText(
      `Lv ${this.level}`,
      this.x,
      this.y - 28
    );
  }
}
