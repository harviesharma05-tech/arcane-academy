/**
 * 🌧 Weather System
 */

export default class WeatherSystem {

  constructor() {

    this.raindrops = [];

    for (
      let i = 0;
      i < 100;
      i++
    ) {

      this.raindrops.push({

        x:
          Math.random() *
          window.innerWidth,

        y:
          Math.random() *
          window.innerHeight

      });

    }

  }

  update() {

    this.raindrops.forEach(
      rain => {

        rain.y += 8;

        if (
          rain.y >
          window.innerHeight
        ) {

          rain.y = 0;

        }

      }
    );

  }

  render(ctx) {

    ctx.strokeStyle =
      "#7dd3fc";

    this.raindrops.forEach(
      rain => {

        ctx.beginPath();

        ctx.moveTo(
          rain.x,
          rain.y
        );

        ctx.lineTo(
          rain.x,
          rain.y + 10
        );

        ctx.stroke();

      }
    );

  }

}
