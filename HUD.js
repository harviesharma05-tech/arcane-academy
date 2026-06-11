/**
 * 🖥️ Arcane Academy - HUD Manager
 * Canvas-based HUD (Stable Version)
 */

export default class HUD {
  constructor(player = null) {
    this.player = player;
  }

  /**
   * 🔁 Update HUD
   */
  update() {
    // Future animations, effects, notifications
  }

  /**
   * 🎨 Render HUD
   */
  render(ctx) {
    if (!this.player) return;

    // Panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(10, 10, 220, 100);

    // Border
    ctx.strokeStyle = "#7dd3fc";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 220, 100);

    // Text
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";

    ctx.fillText(
      `❤️ HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`,
      20,
      35
    );

    ctx.fillText(
      `🔵 Mana: ${Math.floor(this.player.mana)}/${this.player.maxMana}`,
      20,
      60
    );

    ctx.fillText(
      `⭐ Level: ${this.player.level}`,
      20,
      85
    );
  }
}
