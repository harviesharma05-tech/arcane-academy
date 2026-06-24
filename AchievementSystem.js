export default class AchievementSystem {
  constructor(player) {
    this.player = player;

    this.achievements = [];
  }

  unlock(name) {
    if (
      this.achievements.includes(
        name
      )
    )
      return;

    this.achievements.push(name);

    console.log(
      `🏆 Achievement: ${name}`
    );
  }

  check() {
    if (
      this.player.level >= 10
    ) {
      this.unlock(
        "Level 10 Reached"
      );
    }

    if (
      this.player.gold >= 1000
    ) {
      this.unlock(
        "Rich Wizard"
      );
    }

    if (
      this.player.bossKills >= 5
    ) {
      this.unlock(
        "Boss Hunter"
      );
    }
  }
}
