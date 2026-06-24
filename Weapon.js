import Item from "./Item.js";

export default class Weapon extends Item {
  constructor(
    name,
    attack,
    rarity = "common"
  ) {
    super(
      name,
      "weapon",
      rarity
    );

    this.attack = attack;
  }
}
