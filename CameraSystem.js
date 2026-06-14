/**
 * 🎥 Camera System
 */

export default class CameraSystem {

  constructor() {

    this.x = 0;
    this.y = 0;

  }

  update(player) {

    this.x =
      player.x -
      window.innerWidth / 2;

    this.y =
      player.y -
      window.innerHeight / 2;

  }

  begin(ctx) {

    ctx.save();

    ctx.translate(
      -this.x,
      -this.y
    );

  }

  end(ctx) {

    ctx.restore();

  }

}
