/**
 * 🪄 Arcane Academy - Player Entity (PHASE 2 UPDATED)
 * Now supports: XP, leveling hooks, inventory hooks, boundaries, improved structure
 */

export default class Player {
  constructor(x, y) {
    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 32;
    this.color = "cyan";

    // Movement
    this.speed = 3;

    // ❤️ Stats
    this.maxHP = 120;
    this.hp = 120;

    this.maxMana = 120;
    this.mana = 120;

    // ⭐ Progression
    this.level = 1;
    this.xp = 0;

    // 🎒 Inventory hook (Phase 2)
    this.inventory = [];

    // 🧠 State flags
    this.isShielded = false;
  }

  /**
   * 🔁 Update player each frame
   */
  update(input) {
    this.handleMovement(input);
    this.regenerateMana();
    this.applyBoundaries();
  }

  /**
   * ⌨️ Movement (WASD)
   */
  handleMovement(input) {
    if (input.isDown("w")) this.y -= this.speed;
    if (input.isDown("s")) this.y += this.speed;
    if (input.isDown("a")) this.x -= this.speed;
    if (input.isDown("d")) this.x += this.speed;
  }

  /**
   * 🧱 Prevent leaving screen (Phase 2 requirement)
   */
  applyBoundaries() {
    this.x = Math.max(0, Math.min(window.innerWidth - this.size, this.x));
    this.y = Math.max(0, Math.min(window.innerHeight - this.size, this.y));
  }

  /**
   * 🔋 Mana regen
   */
  regenerateMana() {
    if (this.mana < this.maxMana) {
      this.mana += 0.05;
    }
  }

  /**
   * 💥 Damage system
   */
  takeDamage(amount) {
    if (this.isShielded) {
      amount *= 0.3; // shield reduces damage
    }

    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
  }

  /**
   * 🪄 Mana usage
   */
  useMana(amount) {
    if (this.mana >= amount) {
      this.mana -= amount;
      return true;
    }
    return false;
  }

  /**
   * ⭐ XP gain (NEW - Phase 2)
   */
  gainXP(amount, progressionSystem) {
    if (progressionSystem) {
      progressionSystem.addXP(amount);
    } else {
      this.xp += amount;
    }
  }

  /**
   * 🎒 Inventory hooks (Phase 2)
   */
  addItem(item) {
    this.inventory.push(item);
  }

  useItem(index) {
    const item = this.inventory[index];
    if (!item) return;

    if (item.type === "potion") {
      this.hp = Math.min(this.maxHP, this.hp + item.value);
    }

    this.inventory.splice(index, 1);
  }

  /**
   * 🎨 Render player
   */
  render(ctx) {
    // Body
    ctx.fillStyle = this.isShielded ? "lightblue" : this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // ❤️ HP bar
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 10, this.size, 4);

    ctx.fillStyle = "lime";
    ctx.fillRect(
      this.x,
      this.y - 10,
      this.size * (this.hp / this.maxHP),
      4
    );

    // 🔵 Mana bar
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y - 16, this.size, 3);

    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(
      this.x,
      this.y - 16,
      this.size * (this.mana / this.maxMana),
      3
    );

    // ⭐ Level indicator
    ctx.fillStyle = "white";
    ctx.font = "10px monospace";
    ctx.fillText(`Lv ${this.level}`, this.x, this.y - 20);
  }
}
