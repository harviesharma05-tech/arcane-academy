/**
 * 🏘 Town Scene
 */

export default class TownScene {

  constructor(game) {

    this.game = game;

  }

  init() {

    console.log(
      "🏘 Town Loaded"
    );

  }

  update() {

  }

  render(ctx) {

    ctx.fillStyle =
      "#14532d";

    ctx.fillRect(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );

    ctx.fillStyle =
      "white";

    ctx.font =
      "40px Arial";

    ctx.fillText(
      "🏘 Arcane Town",
      100,
      100
    );

    ctx.font =
      "20px Arial";

    ctx.fillText(
      "Potion Shop",
      150,
      250
    );

    ctx.fillText(
      "Blacksmith",
      400,
      250
    );

    ctx.fillText(
      "Inn",
      650,
      250
    );

  }

  unload() {

    console.log(
      "Leaving Town"
    );

  }

}
