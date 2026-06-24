import Item from "./Item.js";

export default class Accessory extends Item {
  constructor(
    name,
    attack = 0,
    defense = 0,
    rarity = "rare"
  ) {
    super(
      name,
      "accessory",
      rarity
    );

    this.attack = attack;
    this.defense = defense;
  }
}
