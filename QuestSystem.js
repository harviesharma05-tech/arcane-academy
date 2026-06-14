/**
 * 📜 Arcane Academy V0.8.0
 * Quest System
 */

export default class QuestSystem {
  constructor(player) {
    this.player = player;

    this.quests = [
      {
        id: 1,
        title: "First Blood",
        description: "Defeat 3 enemies",
        target: 3,
        progress: 0,
        rewardXP: 100,
        rewardGold: 50,
        completed: false
      },

      {
        id: 2,
        title: "Monster Hunter",
        description: "Defeat 10 enemies",
        target: 10,
        progress: 0,
        rewardXP: 300,
        rewardGold: 150,
        completed: false
      }
    ];

    this.gold = 0;
  }

  /**
   * 👾 Enemy defeated
   */
  enemyKilled() {

    this.quests.forEach((quest) => {

      if (quest.completed) return;

      quest.progress++;

      if (quest.progress >= quest.target) {

        quest.completed = true;

        this.player.gainXP(
          quest.rewardXP
        );

        this.gold += quest.rewardGold;

        console.log(
          `📜 Quest Complete: ${quest.title}`
        );

        console.log(
          `💰 +${quest.rewardGold} Gold`
        );

        console.log(
          `⭐ +${quest.rewardXP} XP`
        );
      }

    });

  }

  /**
   * 🎨 Draw quests
   */
  render(ctx) {

    ctx.fillStyle =
      "rgba(0,0,0,0.7)";

    ctx.fillRect(
      window.innerWidth - 300,
      20,
      260,
      140
    );

    ctx.strokeStyle = "#7dd3fc";

    ctx.strokeRect(
      window.innerWidth - 300,
      20,
      260,
      140
    );

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText(
      "📜 Active Quests",
      window.innerWidth - 280,
      45
    );

    let y = 75;

    this.quests.forEach((quest) => {

      ctx.fillStyle =
        quest.completed
          ? "lime"
          : "white";

      ctx.fillText(
        `${quest.title}`,
        window.innerWidth - 280,
        y
      );

      y += 20;

      ctx.fillText(
        `${quest.progress}/${quest.target}`,
        window.innerWidth - 260,
        y
      );

      y += 30;

    });

    ctx.fillStyle = "gold";

    ctx.fillText(
      `Gold: ${this.gold}`,
      window.innerWidth - 280,
      y
    );
  }
}
