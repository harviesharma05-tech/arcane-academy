/**
 * 💰 Economy System
 */

export default class EconomySystem {
  constructor() {
    this.gold = 0;
  }

  addGold(amount) {
    this.gold += amount;

    console.log(
      `💰 +${amount} Gold`
    );
  }

  spendGold(amount) {

    if (this.gold < amount) {
      return false;
    }

    this.gold -= amount;

    return true;
  }

  render(ctx) {

    ctx.fillStyle = "gold";
    ctx.font = "18px Arial";

    ctx.fillText(
      `💰 Gold: ${this.gold}`,
      20,
      340
    );

  }
}
