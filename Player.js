/**
 * 🪄 Arcane Academy - Player Entity (PHASE 6)
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

    // Currency
    this.coins = 0;
    this.crystals = 0;

    // Inventory
    this.inventory = [];

    // State
    this.isShielded = false;
  }

  update(input) {
    this.handleMovement(input);
    this.regenerateMana();
    this.applyBoundaries();
  }

  handleMovement(input) {
    if (input.isDown("w")) this.y -= this.speed;
    if (input.isDown("s")) this.y += this.speed;
    if (input.isDown("a")) this.x -= this.speed;
    if (input.isDown("d")) this.x += this.speed;
  }

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

  regenerateMana() {
    if (this.mana < this.maxMana) {
      this.mana += 0.05;

      if (this.mana > this.maxMana) {
        this.mana = this.maxMana;
      }
    }
  }

  takeDamage(amount) {
    if (this.isShielded) {
      amount *= 0.3;
    }

    this.hp -= amount;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  useMana(amount) {
    if (this.mana < amount) {
      return false;
    }

    this.mana -= amount;
    return true;
  }

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

  addCoins(amount) {
    this.coins += amount;
  }

  addCrystals(amount) {
    this.crystals += amount;
  }

  addItem(item) {
    this.inventory.push(item);
  }

  render(ctx) {

    // Shield Aura
    if (this.isShielded) {
      ctx.beginPath();
      ctx.arc(
        this.x + this.size / 2,
        this.y + this.size / 2,
        30,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = "#7dd3fc";
      ctx.lineWidth = 3;
      ctx.stroke();
    }

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
    ctx.lineWidth = 2;

    ctx.strokeRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // HP
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

    // Mana
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(
      this.x,
      this.y - 22,
      this.size * (this.mana / this.maxMana),
      4
    );

    // Level
    ctx.fillStyle = "white";
    ctx.font = "12px Arial";

    ctx.fillText(
      `Lv ${this.level}`,
      this.x,
      this.y - 30
    );
  }
}
