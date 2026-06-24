/**
 * 🎒 Inventory UI
 */

export default class InventoryUI {
  constructor(player) {
    this.player = player;
    this.visible = false;
  }

  toggle() {
    this.visible = !this.visible;
  }

  render(ctx) {
    if (!this.visible) return;

    ctx.fillStyle =
      "rgba(0,0,0,0.85)";

    ctx.fillRect(
      150,
      80,
      500,
      400
    );

    ctx.strokeStyle = "white";

    ctx.strokeRect(
      150,
      80,
      500,
      400
    );

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText(
      "Inventory",
      170,
      120
    );

    ctx.font = "16px Arial";

    this.player.inventory.forEach(
      (item, index) => {
        ctx.fillText(
          `${index + 1}. ${item.name}`,
          180,
          160 + index * 25
        );
      }
    );
  }
}
