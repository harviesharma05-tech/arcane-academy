export default class WorldBoss {
  constructor() {
    this.name =
      "Ancient Dragon";

    this.maxHP = 5000;
    this.hp = 5000;

    this.damage = 50;

    this.x = 700;
    this.y = 250;

    this.size = 120;
  }

  takeDamage(amount) {
    this.hp -= amount;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  render(ctx) {
    ctx.fillStyle =
      "purple";

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    ctx.fillStyle =
      "white";

    ctx.fillText(
      `${this.name} HP: ${this.hp}`,
      this.x,
      this.y - 10
    );
  }
}
