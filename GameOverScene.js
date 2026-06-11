export default class GameOverScene {
  constructor(game) {
    this.game = game;
  }

  init() {
    console.log("💀 Game Over");
  }

  update() {
    if (this.game.input.isPressed("enter")) {
      location.reload();
    }
  }

  render(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "24px monospace";
    ctx.fillText("💀 GAME OVER", 100, 120);

    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText("Press ENTER to Restart", 100, 180);
  }
}
