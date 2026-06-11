/**
 * 💥 Arcane Academy - Visual Feedback System
 */

export default class VFXSystem {
  constructor() {
    this.texts = [];
  }

  addText(x, y, text, color = "white") {
    this.texts.push({
      x,
      y,
      text,
      color,
      life: 60,
    });
  }

  update() {
    this.texts.forEach(t => {
      t.y -= 0.5;
      t.life--;
    });

    this.texts = this.texts.filter(t => t.life > 0);
  }

  render(ctx) {
    this.texts.forEach(t => {
      ctx.fillStyle = t.color;
      ctx.font = "12px monospace";
      ctx.fillText(t.text, t.x, t.y);
    });
  }
}
