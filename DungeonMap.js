/**
 * 🗺️ Arcane Academy - Dungeon Map
 */

export default class DungeonMap {
  constructor() {
    this.width = 2000;
    this.height = 1200;

    this.tileSize = 64;
  }

  update() {}

  render(ctx) {

    // Floor
    ctx.fillStyle = "#1a1a1a";

    ctx.fillRect(
      0,
      0,
      this.width,
      this.height
    );

    // Grid
    ctx.strokeStyle = "#2a2a2a";

    for (let x = 0; x < this.width; x += this.tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }

    for (let y = 0; y < this.height; y += this.tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
  }
}
