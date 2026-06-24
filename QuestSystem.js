export default class QuestSystem {
  constructor(player) {
    this.player = player;

    this.quests = [];
  }

  addQuest(quest) {
    this.quests.push({
      ...quest,
      progress: 0,
      completed: false
    });
  }

  updateProgress(
    questId,
    amount = 1
  ) {
    const quest =
      this.quests.find(
        q => q.id === questId
      );

    if (!quest) return;

    quest.progress += amount;

    if (
      quest.progress >=
      quest.goal
    ) {
      quest.completed = true;

      this.player.gainXP(
        quest.rewardXP
      );

      this.player.addGold(
        quest.rewardGold
      );

      console.log(
        `📜 Quest Complete: ${quest.title}`
      );
    }
  }
}
