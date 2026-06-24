export default class LegendaryLootSystem {
  constructor() {
    this.loot = [
      "Phoenix Staff",
      "Arcane Crown",
      "Shadow Blade",
      "Dragon Armor"
    ];
  }

  rollDrop() {
    const chance =
      Math.random();

    if (chance < 0.1) {
      return this.loot[
        Math.floor(
          Math.random() *
            this.loot.length
        )
      ];
    }

    return null;
  }
}
