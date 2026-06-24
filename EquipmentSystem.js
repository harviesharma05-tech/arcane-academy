/**
 * ⚔️ Equipment System
 */

export default class EquipmentSystem {
  constructor() {
    this.weapon = null;
    this.armor = null;
    this.accessory = null;
  }

  equip(item) {
    switch (item.type) {
      case "weapon":
        this.weapon = item;
        break;

      case "armor":
        this.armor = item;
        break;

      case "accessory":
        this.accessory = item;
        break;
    }
  }

  getAttackBonus() {
    return (
      (this.weapon?.attack || 0) +
      (this.accessory?.attack || 0)
    );
  }

  getDefenseBonus() {
    return (
      (this.armor?.defense || 0) +
      (this.accessory?.defense || 0)
    );
  }
}
