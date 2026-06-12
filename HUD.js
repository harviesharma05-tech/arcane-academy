/**
 * 🖥 Arcane Academy - HUD System (PHASE 6)
 */

export default class HUD {
  constructor(player = null) {
    this.player = player;
  }

  /**
   * 🔁 Update
   */
  update() {
    // Future notifications and animations
  }

  /**
   * 🎨 Render
   */
  render(ctx) {
    if (!this.player) return;

    // Background panel
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(10, 10, 260, 220);

    // Border
    ctx.strokeStyle = "#7dd3fc";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 260, 220);

    // Text style
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    // HP
    ctx.fillText(
      `❤️ HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`,
      20,
      35
    );

    // Mana
    ctx.fillText(
      `🔵 Mana: ${Math.floor(this.player.mana)}/${this.player.maxMana}`,
      20,
      60
    );

    // Level
    ctx.fillText(
      `⭐ Level: ${this.player.level}`,
      20,
      85
    );

    // XP
    ctx.fillText(
      `⚡ XP: ${this.player.xp}/${this.player.xpToNextLevel}`,
      20,
      110
    );

    // Coins
    ctx.fillText(
      `🪙 Coins: ${this.player.coins}`,
      20,
      135
    );

    // Crystals
    ctx.fillText(
      `💎 Crystals: ${this.player.crystals}`,
      20,
      160
    );

    // Inventory
    ctx.fillText(
      `🎒 Items: ${this.player.inventory.length}`,
      20,
      185
    );

    // Shield Status
    ctx.fillStyle = this.player.isShielded
      ? "#38bdf8"
      : "gray";

    ctx.fillText(
      this.player.isShielded
        ? "🛡 Shield Active"
        : "🛡 Shield Inactive",
      20,
      210
    );
  }
}
