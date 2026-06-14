/**
 * 🏪 Shop System
 */

export default class ShopSystem {

  constructor(
    economy,
    potionSystem
  ) {

    this.economy = economy;

    this.potionSystem =
      potionSystem;

  }

  buyHealthPotion() {

    if (
      this.economy.spendGold(50)
    ) {

      this.potionSystem
        .useHealthPotion();

      console.log(
        "❤️ Health Potion"
      );

    }

  }

  buyManaPotion() {

    if (
      this.economy.spendGold(50)
    ) {

      this.potionSystem
        .useManaPotion();

      console.log(
        "🔵 Mana Potion"
      );

    }

  }

}
