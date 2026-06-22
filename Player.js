/**
 * 🪄 Arcane Academy - Player Entity
 * VERSION 9
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

    // Health
    this.maxHP = 100;
    this.hp = 100;

    // Mana
    this.maxMana = 100;
    this.mana = 100;

    // Progression
    this.level = 1;
    this.xp = 0;
    this.xpToNextLevel = 100;

    // Economy
    this.gold = 0;

    // Combat
    this.attackPower = 10;
    this.critChance = 5;

    // Dungeon
    this.dungeonFloor = 1;

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
      this.y -= this.speed;
    }

    if (input.isDown("s")) {
      this.y += this.speed;
    }

    if (input.isDown("a")) {
      this.x -= this.speed;
    }

    if (input.isDown("d")) {
      this.x += this.speed;
    }
  }

  /**
   * 🧱 Boundaries
   */
  applyBoundaries() {

    this.x = Math.max(
      0,
      Math.min(
        window.innerWidth - this.size,
        this.x
      )
    );

    this.y = Math.max(
      0,
      Math.min(
        window.innerHeight - this.size,
        this.y
      )
    );
  }

  /**
   * 🔋 Mana Regen
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
   * 💚 Heal
   */
  heal(amount) {

    this.hp += amount;

    if (this.hp > this.maxHP) {
      this.hp = this.maxHP;
    }
  }

  /**
   * 🔵 Mana Use
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

    while (
      this.xp >= this.xpToNextLevel
    ) {

      this.xp -= this.xpToNextLevel;

      this.level++;

      this.maxHP += 20;
      this.maxMana += 20;

      this.hp = this.maxHP;
      this.mana = this.maxMana;

      this.xpToNextLevel += 50;

      console.log(
        `⭐ LEVEL UP! ${this.level}`
      );
    }
  }

  /**
   * 💰 Gold
   */
  addGold(amount) {
    this.gold += amount;
  }

  spendGold(amount) {

    if (this.gold < amount) {
      return false;
    }

    this.gold -= amount;

    return true;
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

    // Body
    ctx.fillStyle =
      this.isShielded
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
      this.y - 15,
      this.size,
      5
    );

    ctx.fillStyle = "lime";

    ctx.fillRect(
      this.x,
      this.y - 15,
      this.size *
        (this.hp / this.maxHP),
      5
    );

    // Mana Bar
    ctx.fillStyle = "#38bdf8";

    ctx.fillRect(
      this.x,
      this.y - 22,
      this.size *
        (this.mana / this.maxMana),
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
