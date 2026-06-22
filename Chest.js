/**
 * 🎁 Dungeon Chest
 */

export default class Chest {
  constructor(x, y) {

    this.x = x;
    this.y = y;

    this.size = 40;

    this.opened = false;
  }

  open() {

    if (this.opened) return null;

    this.opened = true;

    return true;
  }

  render(ctx) {

    ctx.fillStyle =
      this.opened
        ? "#555"
        : "#c68a2f";

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    ctx.strokeStyle = "black";
    ctx.strokeRect(
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}
