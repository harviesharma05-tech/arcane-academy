/**
 * 💰 Loot System
 */

export default class LootSystem {

  generateLoot() {

    const lootTable = [
      "Gold",
      "Potion",
      "Mana Potion",
      "Magic Ring",
      "Epic Staff"
    ];

    const index =
      Math.floor(
        Math.random() * lootTable.length
      );

    return lootTable[index];
  }
}
