/**
 * 🗺️ Mini Map
 */

export default class MiniMap {

  render(ctx, player) {

    ctx.fillStyle =
      "rgba(0,0,0,0.7)";

    ctx.fillRect(
      900,
      20,
      180,
      120
    );

    ctx.fillStyle = "cyan";

    ctx.fillRect(
      900 + player.x / 15,
      20 + player.y / 15,
      6,
      6
    );
  }
}
