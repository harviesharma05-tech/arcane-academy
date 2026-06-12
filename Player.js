/**
 * 🪄 Arcane Academy - Player Entity (PHASE 4)
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
    this.xpToNextLevel = 100;

    // Inventory
    this.inventory = [];

    // State
    this.isShielded = false;
  }

  /**
   * 🔁 Update
   */
  update(input) {
    this.handleMovement(input);
    this.regenerateMana();
    this.applyBoundaries();
  }

  /**
   * ⌨️ Movement
   */
  handleMovement(input) {
    if (input.isDown("w")) {
      console.log("W pressed");
      this.y -= this.speed;
    }

    if (input.isDown("s")) {
      console.log("S pressed");
      this.y += this.speed;
    }

    if (input.isDown("a")) {
      console.log("A pressed");
      this.x -= this.speed;
    }

    if (input.isDown("d")) {
      console.log("D pressed");
      this.x += this.speed;
    }
  }

  /**
   * 🧱 Screen boundaries
   */
  applyBoundaries() {
    this.x = Math.max(
      0,
      Math.min(window.innerWidth - this.size, this.x)
    );

    this.y = Math.max(
      0,
      Math.min(window.innerHeight - this.size, this.y)
    );
  }

  /**
   * 🔋 Mana regeneration
   */
  regenerateMana() {
    if (this.mana < this.maxMana) {
      this.mana += 0.05;

      if (this.mana > this.maxMana) {
        this.mana = this.maxMana;
      }
    }
  }

  /**
   * ❤️ Take damage
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
   * 🔵 Use mana
   */
  useMana(amount) {
    if (this.mana < amount) {
      return false;
    }

    this.mana -= amount;
    return true;
  }

  /**
   * ⭐ Gain XP
   */
  gainXP(amount) {
    this.xp += amount;

    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;

      this.level++;

      this.maxHP += 20;
      this.maxMana += 20;

      this.hp = this.maxHP;
      this.mana = this.maxMana;

      this.xpToNextLevel += 50;

      console.log(`⭐ Level Up! Level ${this.level}`);
    }
  }

  /**
   * 🎒 Inventory
   */
  addItem(item) {
    this.inventory.push(item);
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

    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.strokeRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // HP bar
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x,
      this.y - 15,
      this.size,
      5
    );

    ctx.fillStyle = "lime";
    ctx.fillRect(
      this.x,
      this.y - 15,
      this.size * (this.hp / this.maxHP),
      5
    );

    // Mana bar
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(
      this.x,
      this.y - 22,
      this.size * (this.mana / this.maxMana),
      4
    );

    // Level text
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";

    ctx.fillText(
      `Lv ${this.level}`,
      this.x,
      this.y - 30
    );
  }
}
