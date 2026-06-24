export default class BossSystem {
  constructor(player) {
    this.player = player;

    this.bosses = [
      {
        name: "Goblin King",
        hp: 500,
        damage: 15,
        rewardGold: 200,
        rewardXP: 300
      },
      {
        name: "Shadow Mage",
        hp: 800,
        damage: 25,
        rewardGold: 350,
        rewardXP: 500
      }
    ];

    this.currentBoss = null;
  }

  spawnBoss(index = 0) {
    this.currentBoss = {
      ...this.bosses[index]
    };

    console.log(
      `👑 ${this.currentBoss.name} Spawned`
    );
  }

  defeatBoss() {
    if (!this.currentBoss) return;

    this.player.gainXP(
      this.currentBoss.rewardXP
    );

    this.player.addGold(
      this.currentBoss.rewardGold
    );

    this.player.bossKills++;

    console.log(
      `🏆 Defeated ${this.currentBoss.name}`
    );

    this.currentBoss = null;
  }
}
