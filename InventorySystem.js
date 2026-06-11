/**
 * 🎒 Arcane Academy - Inventory System
 */

export default class InventorySystem {
  constructor(player) {
    this.player = player;

    this.items = [];
  }

  /**
   * ➕ Add item
   */
  addItem(item) {
    this.items.push(item);
    console.log("🎒 Item added:", item.name);
  }

  /**
   * 🧪 Use item
   */
  useItem(itemName) {
    const index = this.items.findIndex(i => i.name === itemName);

    if (index === -1) return;

    const item = this.items[index];

    if (item.type === "potion") {
      this.player.hp = Math.min(
        this.player.maxHP,
        this.player.hp + item.value
      );
    }

    this.items.splice(index, 1);

    console.log("🧪 Used:", itemName);
  }
}
