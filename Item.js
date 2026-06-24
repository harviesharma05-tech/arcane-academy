/**
 * 🧤 Base Item
 */

export default class Item {
  constructor(
    name,
    type,
    rarity = "common"
  ) {
    this.name = name;
    this.type = type;
    this.rarity = rarity;
  }
}
