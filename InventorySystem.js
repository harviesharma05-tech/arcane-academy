/**
 * 🎒 Arcane Academy - Inventory System
 * Handles items, potions, crystals and coins
 */

export default class InventorySystem {
  constructor(player) {
    this.player = player;

    this.items = [];

    // Currency
    this.coins = 0;
    this.crystals = 0;
  }

  /**
   * ➕ Add Item
   */
  addItem(item) {
    this.items.push(item);

    console.log(`📦 Added ${item.name}`);
  }

  /**
   * ❌ Remove Item
   */
  removeItem(index) {
    if (index < 0 || index >= this.items.length) {
      return;
    }

    this.items.splice(index, 1);
  }

  /**
   * ❤️ Use Item
   */
  useItem(index) {
    const item = this.items[index];

    if (!item) return;

    switch (item.type) {

      case "healthPotion":
        this.player.hp += item.value;

        if (this.player.hp > this.player.maxHP) {
          this.player.hp = this.player.maxHP;
        }

        console.log("❤️ Health restored");
        break;


      case "manaPotion":
        this.player.mana += item.value;

        if (this.player.mana > this.player.maxMana) {
          this.player.mana = this.player.maxMana;
        }

        console.log("🔵 Mana restored");
        break;


      case "coin":
        this.coins += item.value;

        console.log(`🪙 +${item.value} Coins`);
        break;


      case "crystal":
        this.crystals += item.value;

        console.log(`💎 +${item.value} Crystals`);
        break;
    }

    // Remove consumed item
    this.removeItem(index);
  }

  /**
   * 🪙 Add Coins
   */
  addCoins(amount) {
    this.coins += amount;
  }

  /**
   * 💎 Add Crystals
   */
  addCrystals(amount) {
    this.crystals += amount;
  }

  /**
   * 🔄 Update
   */
  update() {
    // Future sorting, stack handling, etc.
  }

  /**
   * 🎨 Render Inventory
   */
  render(ctx) {

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText(
      `🪙 Coins: ${this.coins}`,
      20,
      330
    );

    ctx.fillText(
      `💎 Crystals: ${this.crystals}`,
      20,
      355
    );

    ctx.fillText(
      `🎒 Items: ${this.items.length}`,
      20,
      380
    );

    // Show first 5 items
    for (let i = 0; i < Math.min(this.items.length, 5); i++) {

      ctx.fillText(
        `${i + 1}. ${this.items[i].name}`,
        20,
        410 + i * 25
      );
    }
  }
}
