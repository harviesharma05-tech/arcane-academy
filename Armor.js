import Item from "./Item.js";

export default class Armor extends Item {
  constructor(
    name,
    defense,
    rarity = "common"
  ) {
    super(
      name,
      "armor",
      rarity
    );

    this.defense = defense;
  }
}
