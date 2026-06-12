/**
 * 🌀 Arcane Academy - Portal System
 * Phase 6
 */

export default class Portal {
  constructor(x, y, radius, color, destination) {
    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.radius = radius;
    this.color = color;

    // Destination scene
    this.destination = destination;

    // Animation
    this.angle = 0;
  }

  /**
   * 🔁 Update
   */
  update() {
    this.angle += 0.05;
  }

  /**
   * 📍 Player collision
   */
  isPlayerInside(player) {
    const dx =
      player.x + player.size / 2 - this.x;

    const dy =
      player.y + player.size / 2 - this.y;

    const distance = Math.sqrt(
      dx * dx + dy * dy
    );

    return distance < this.radius;
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Outer glow
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius + 10,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "rgba(125,211,252,0.2)";
    ctx.fill();

    // Main circle
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = this.color;
    ctx.fill();

    // Rotating ring
    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius + 5,
      this.angle,
      this.angle + Math.PI
    );

    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Label
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
      this.destination,
      this.x - 40,
      this.y - this.radius - 15
    );
  }
}
