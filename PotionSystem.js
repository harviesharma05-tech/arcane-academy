/**
 * 🧪 Potion System
 */

export default class PotionSystem {

  constructor(player) {

    this.player = player;

  }

  useHealthPotion() {

    this.player.hp += 50;

    if (
      this.player.hp >
      this.player.maxHP
    ) {

      this.player.hp =
        this.player.maxHP;

    }

  }

  useManaPotion() {

    this.player.mana += 50;

    if (
      this.player.mana >
      this.player.maxMana
    ) {

      this.player.mana =
        this.player.maxMana;

    }

  }

}
