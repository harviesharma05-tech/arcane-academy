/**
 * ✨ Arcane Academy - VFX System
 */

export default class VFXSystem {
  constructor() {
    this.effects = [];
  }

  /**
   * 💥 Spawn Effect
   */
  spawn(x, y, color = "orange") {

    this.effects.push({
      x,
      y,
      radius: 20,
      alpha: 1,
      color
    });

  }

  /**
   * 🔁 Update
   */
  update() {

    this.effects.forEach(effect => {

      effect.radius += 1.5;
      effect.alpha -= 0.03;

    });

    this.effects = this.effects.filter(
      effect => effect.alpha > 0
    );
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    this.effects.forEach(effect => {

      ctx.beginPath();

      ctx.arc(
        effect.x,
        effect.y,
        effect.radius,
        0,
        Math.PI * 2
      );

      ctx.strokeStyle =
        `rgba(255,165,0,${effect.alpha})`;

      ctx.lineWidth = 3;

      ctx.stroke();

    });

  }
}
