export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 40;

    this.speed = 4;

    this.hp = 100;
    this.maxHP = 100;

    this.mana = 100;
    this.maxMana = 100;

    this.level = 1;

    this.isShielded = false;
  }

  update(input) {
    if (input.isDown("w")) this.y -= this.speed;
    if (input.isDown("s")) this.y += this.speed;
    if (input.isDown("a")) this.x -= this.speed;
    if (input.isDown("d")) this.x += this.speed;

    this.x = Math.max(0, Math.min(window.innerWidth - this.size, this.x));
    this.y = Math.max(0, Math.min(window.innerHeight - this.size, this.y));
  }

  takeDamage(amount) {
    this.hp -= amount;
    if (this.hp < 0) this.hp = 0;
  }

  useMana(amount) {
    if (this.mana < amount) return false;

    this.mana -= amount;
    return true;
  }

  render(ctx) {
    // BIG CYAN PLAYER
    ctx.fillStyle = "cyan";
    ctx.fillRect(this.x, this.y, this.size, this.size);

    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.size, this.size);

    // Label
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText("PLAYER", this.x - 5, this.y - 10);
  }
}
