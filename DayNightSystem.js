/**
 * 🌙 Day Night System
 */

export default class DayNightSystem {

  constructor() {

    this.time = 0;

  }

  update() {

    this.time += 0.001;

  }

  render(ctx) {

    const alpha =
      (
        Math.sin(
          this.time
        ) + 1
      ) / 2;

    ctx.fillStyle =
      `rgba(0,0,40,${alpha*0.5})`;

    ctx.fillRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

  }

}
