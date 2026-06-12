/**
 * 🧙 Arcane Academy - NPC Entity
 * Phase 7
 */

export default class NPC {
  constructor(x, y, name = "Wizard") {

    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 40;
    this.color = "#7dd3fc";

    // Info
    this.name = name;

    // Dialogue
    this.dialogues = [
      "Welcome to Arcane Academy!",
      "Defeat enemies to gain XP.",
      "Use SPACE to cast Fireball.",
      "Use SHIFT to activate Shield."
    ];

    this.currentDialogue = 0;

    // Animation
    this.floatOffset = 0;
  }

  /**
   * 🔁 Update
   */
  update() {
    this.floatOffset =
      Math.sin(Date.now() * 0.003) * 3;
  }

  /**
   * 🗨 Next dialogue
   */
  nextDialogue() {
    this.currentDialogue++;

    if (this.currentDialogue >= this.dialogues.length) {
      this.currentDialogue = 0;
    }
  }

  /**
   * 📍 Check interaction range
   */
  isNear(player) {

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    const distance = Math.sqrt(
      dx * dx + dy * dy
    );

    return distance < 100;
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Floating animation
    const drawY =
      this.y + this.floatOffset;

    // Body
    ctx.fillStyle = this.color;

    ctx.fillRect(
      this.x,
      drawY,
      this.size,
      this.size
    );

    // Border
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.strokeRect(
      this.x,
      drawY,
      this.size,
      this.size
    );

    // Name
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
      this.name,
      this.x - 5,
      drawY - 10
    );
  }

  /**
   * 💬 Render dialogue box
   */
  renderDialogue(ctx) {

    ctx.fillStyle =
      "rgba(0,0,0,0.8)";

    ctx.fillRect(
      200,
      window.innerHeight - 120,
      700,
      80
    );

    ctx.strokeStyle = "#7dd3fc";
    ctx.lineWidth = 2;

    ctx.strokeRect(
      200,
      window.innerHeight - 120,
      700,
      80
    );

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText(
      `${this.name}: ${this.dialogues[this.currentDialogue]}`,
      230,
      window.innerHeight - 75
    );

    ctx.font = "14px Arial";

    ctx.fillText(
      "Press E to continue",
      230,
      window.innerHeight - 45
    );
  }
}
