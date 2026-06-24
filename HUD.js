/**
 * 🖥️ Arcane Academy - HUD
 * VERSION 11
 */

export default class HUD {
  constructor(player = null) {
    this.player = player;
  }

  update() {}

  render(ctx) {
    if (!this.player) return;

    // Panel
    ctx.fillStyle =
      "rgba(0,0,0,0.8)";

    ctx.fillRect(
      10,
      10,
      320,
      340
    );

    // Border
    ctx.strokeStyle =
      "#7dd3fc";

    ctx.lineWidth = 2;

    ctx.strokeRect(
      10,
      10,
      320,
      340
    );

    // Text
    ctx.fillStyle =
      "white";

    ctx.font =
      "16px monospace";

    let y = 35;

    ctx.fillText(
      `❤️ HP: ${Math.floor(this.player.hp)}/${this.player.maxHP}`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `🔵 Mana: ${Math.floor(this.player.mana)}/${this.player.maxMana}`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `⭐ Level: ${this.player.level}`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `✨ XP: ${this.player.xp}/${this.player.xpToNextLevel}`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `💰 Gold: ${this.player.gold}`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `⚔️ ATK: ${
        this.player.getAttackPower
          ? this.player.getAttackPower()
          : this.player.attackPower
      }`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `🛡 DEF: ${
        this.player.getDefense
          ? this.player.getDefense()
          : 0
      }`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `🌳 Skill Points: ${
        this.player.skillTree
          ? this.player.skillTree.skillPoints
          : 0
      }`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `🏰 Floor: ${
        this.player.dungeonFloor || 1
      }`,
      20,
      y
    );

    y += 25;

    ctx.fillText(
      `👑 Boss Kills: ${
        this.player.bossKills || 0
      }`,
      20,
      y
    );

    // XP Bar
    ctx.fillStyle = "#333";

    ctx.fillRect(
      20,
      300,
      280,
      12
    );

    ctx.fillStyle =
      "#facc15";

    ctx.fillRect(
      20,
      300,
      280 *
        (this.player.xp /
          this.player.xpToNextLevel),
      12
    );

    ctx.strokeStyle =
      "white";

    ctx.strokeRect(
      20,
      300,
      280,
      12
    );

    // Active Quest
    if (
      this.player.activeQuests &&
      this.player.activeQuests.length > 0
    ) {
      ctx.fillStyle =
        "#7dd3fc";

      ctx.font =
        "14px Arial";

      ctx.fillText(
        `📜 ${
          this.player.activeQuests[0]
            .title
        }`,
        20,
        330
      );
    }

    // Achievement Count
    if (
      this.player.achievements
    ) {
      ctx.fillStyle =
        "#22c55e";

      ctx.font =
        "14px Arial";

      ctx.fillText(
        `🏆 Achievements: ${
          this.player.achievements
            .length
        }`,
        180,
        330
      );
    }
  }
}
