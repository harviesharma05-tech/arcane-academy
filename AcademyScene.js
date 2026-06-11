render(ctx) {
  ctx.fillStyle = "#0b0f1a";
  ctx.fillRect(
    0,
    0,
    this.game.canvas.width,
    this.game.canvas.height
  );

  ctx.fillStyle = "red";
  ctx.fillRect(100, 100, 100, 100);
}
