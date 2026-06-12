/**
 * 🗺 Arcane Academy - World Map System
 * Phase 6
 */

export default class WorldMap {
  constructor() {

    // Map size
    this.width = 3000;
    this.height = 3000;

    // Tile size
    this.tileSize = 64;

    // Colors
    this.groundColor = "#1e293b";
    this.gridColor = "#334155";

    // Obstacles
    this.walls = [
      {
        x: 600,
        y: 300,
        width: 250,
        height: 60
      },

      {
        x: 1000,
        y: 700,
        width: 60,
        height: 300
      },

      {
        x: 1500,
        y: 1200,
        width: 400,
        height: 80
      }
    ];
  }

  /**
   * 🔁 Update
   */
  update() {

  }

  /**
   * 🚧 Collision Check
   */
  isColliding(x, y, size) {

    for (const wall of this.walls) {

      const hit =
        x < wall.x + wall.width &&
        x + size > wall.x &&
        y < wall.y + wall.height &&
        y + size > wall.y;

      if (hit) {
        return true;
      }
    }

    return false;
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Ground
    ctx.fillStyle = this.groundColor;

    ctx.fillRect(
      0,
      0,
      this.width,
      this.height
    );

    // Grid
    ctx.strokeStyle = this.gridColor;

    for (
      let x = 0;
      x < this.width;
      x += this.tileSize
    ) {

      ctx.beginPath();

      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);

      ctx.stroke();
    }

    for (
      let y = 0;
      y < this.height;
      y += this.tileSize
    ) {

      ctx.beginPath();

      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);

      ctx.stroke();
    }

    // Walls
    ctx.fillStyle = "#475569";

    this.walls.forEach((wall) => {

      ctx.fillRect(
        wall.x,
        wall.y,
        wall.width,
        wall.height
      );

    });

    // Academy Portal
    ctx.fillStyle = "#7dd3fc";

    ctx.beginPath();

    ctx.arc(
      250,
      250,
      40,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Boss Dungeon Portal
    ctx.fillStyle = "purple";

    ctx.beginPath();

    ctx.arc(
      2500,
      2200,
      50,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Labels
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText(
      "🏰 Academy",
      180,
      180
    );

    ctx.fillText(
      "👑 Boss Dungeon",
      2400,
      2120
    );
  }
}
