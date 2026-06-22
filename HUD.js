/**
 * 🖥️ Arcane Academy - HUD
 * VERSION 9
 */

export default class HUD {
  constructor(player = null) {
    this.player = player;
  }

  /**
   * 🔁 Update
   */
  update() {}

  /**
   * 🎨 Render
   */
  render(ctx) {
    if (!this.player) return;

    // Background Panel
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(10, 10, 280, 180);

    // Border
    ctx.strokeStyle = "#7dd3fc";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 280, 180);

    // Text Style
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";

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
      `✨ XP: ${this.player.xp}/${this.player.xpToNextLevel}`,
      20,
      110
    );

    // Gold
    ctx.fillText(
      `💰 Gold: ${this.player.gold}`,
      20,
      135
    );

    // Dungeon Floor
    ctx.fillText(
      `🏰 Floor: ${this.player.dungeonFloor}`,
      20,
      160
    );

    // Inventory
    ctx.fillText(
      `🎒 Items: ${this.player.inventory.length}`,
      20,
      185
    );

    // XP Progress Bar
    ctx.fillStyle = "#333";

    ctx.fillRect(
      20,
      200,
      240,
      12
    );

    ctx.fillStyle = "#facc15";

    ctx.fillRect(
      20,
      200,
      240 *
        (this.player.xp /
          this.player.xpToNextLevel),
      12
    );

    ctx.strokeStyle = "white";

    ctx.strokeRect(
      20,
      200,
      240,
      12
    );
  }
}
