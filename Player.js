/**
 * 🪄 Arcane Academy - Player Entity
 * Handles movement, stats, and future spell integration
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

    // RPG Stats
    this.maxHP = 100;
    this.hp = 100;

    this.maxMana = 100;
    this.mana = 100;

    this.level = 1;
    this.xp = 0;

    // Movement smoothing (future upgrade ready)
    this.velocityX = 0;
    this.velocityY = 0;
  }

  /**
   * 🔁 Update player logic
   */
  update(input) {
    this.handleMovement(input);
    this.regenerateMana();
  }

  /**
   * ⌨️ Movement system (WASD)
   */
  handleMovement(input) {
    this.velocityX = 0;
    this.velocityY = 0;

    if (input.isDown("w")) this.velocityY = -this.speed;
    if (input.isDown("s")) this.velocityY = this.speed;
    if (input.isDown("a")) this.velocityX = -this.speed;
    if (input.isDown("d")) this.velocityX = this.speed;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  /**
   * 🔋 Passive mana regen system
   */
  regenerateMana() {
    if (this.mana < this.maxMana) {
      this.mana += 0.05; // slow regen
    }
  }

  /**
   * ⚔️ Take damage
   */
  takeDamage(amount) {
    this.hp -= amount;

    if (this.hp < 0) this.hp = 0;
  }

  /**
   * 🪄 Use mana (for spells later)
   */
  useMana(amount) {
    if (this.mana >= amount) {
      this.mana -= amount;
      return true;
    }
    return false;
  }

  /**
   * 🎨 Render player
   */
  render(ctx) {
    // Player body
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // HP bar
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 10, this.size, 5);

    ctx.fillStyle = "green";
    ctx.fillRect(
      this.x,
      this.y - 10,
      this.size * (this.hp / this.maxHP),
      5
    );

    // Mana bar
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y - 18, this.size, 4);

    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(
      this.x,
      this.y - 18,
      this.size * (this.mana / this.maxMana),
      4
    );
  }
}
