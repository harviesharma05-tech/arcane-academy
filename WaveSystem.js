/**
 * 👾 Enemy Waves
 */

export default class WaveSystem {

  constructor() {

    this.wave = 1;

    this.enemiesRemaining = 3;
  }

  enemyKilled() {

    this.enemiesRemaining--;

    if (this.enemiesRemaining <= 0) {

      this.wave++;

      this.enemiesRemaining =
        this.wave * 3;

      console.log(
        `🌊 Wave ${this.wave}`
      );
    }
  }

  render(ctx) {

    ctx.fillStyle = "white";

    ctx.font = "16px Arial";

    ctx.fillText(
      `Wave: ${this.wave}`,
      20,
      340
    );

    ctx.fillText(
      `Enemies: ${this.enemiesRemaining}`,
      20,
      365
    );
  }
}
