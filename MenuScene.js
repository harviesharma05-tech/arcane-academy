/**
 * 🎮 Arcane Academy - Menu Scene
 */

export default class MenuScene {
  constructor(game) {
    this.game = game;
  }

  init() {
    console.log("🎮 Menu Loaded");
  }

  update() {
    const input = this.game.input;

    // ENTER → start game
    if (input.isPressed("enter")) {
      this.game.sceneManager.loadScene(
        this.game.sceneManager.scenes.academy
      );
    }
  }

  render(ctx) {
    ctx.fillStyle = "#05070d";
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    ctx.fillStyle = "#7dd3fc";
    ctx.font = "20px monospace";
    ctx.fillText("🪄 ARCANE ACADEMY", 100, 120);

    ctx.fillStyle = "white";
    ctx.font = "12px monospace";
    ctx.fillText("Press ENTER to Start", 100, 180);
  }
}
