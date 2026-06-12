/**
 * 💬 Arcane Academy - Dialogue System
 * Phase 7
 */

export default class DialogueSystem {
  constructor() {
    this.isActive = false;
    this.currentNPC = null;
    this.currentIndex = 0;
  }

  /**
   * 🎬 Start Dialogue
   */
  start(npc) {
    this.isActive = true;
    this.currentNPC = npc;
    this.currentIndex = 0;
  }

  /**
   * ⏭ Next Dialogue
   */
  next() {
    if (!this.currentNPC) return;

    this.currentIndex++;

    if (
      this.currentIndex >=
      this.currentNPC.dialogues.length
    ) {
      this.close();
    }
  }

  /**
   * ❌ Close Dialogue
   */
  close() {
    this.isActive = false;
    this.currentNPC = null;
    this.currentIndex = 0;
  }

  /**
   * 🔁 Update
   */
  update(input) {
    if (!this.isActive) return;

    if (input.isPressed("e")) {
      this.next();
    }

    if (input.isPressed("escape")) {
      this.close();
    }
  }

  /**
   * 🎨 Render Dialogue UI
   */
  render(ctx) {
    if (!this.isActive || !this.currentNPC) return;

    const boxWidth = 800;
    const boxHeight = 140;

    const x =
      (window.innerWidth - boxWidth) / 2;

    const y =
      window.innerHeight - boxHeight - 30;

    // Background
    ctx.fillStyle = "rgba(0,0,0,0.85)";
    ctx.fillRect(
      x,
      y,
      boxWidth,
      boxHeight
    );

    // Border
    ctx.strokeStyle = "#7dd3fc";
    ctx.lineWidth = 3;
    ctx.strokeRect(
      x,
      y,
      boxWidth,
      boxHeight
    );

    // NPC Name
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "22px Arial";

    ctx.fillText(
      this.currentNPC.name,
      x + 20,
      y + 35
    );

    // Dialogue Text
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    ctx.fillText(
      this.currentNPC.dialogues[
        this.currentIndex
      ],
      x + 20,
      y + 80
    );

    // Controls
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px Arial";

    ctx.fillText(
      "E = Next   |   ESC = Close",
      x + 20,
      y + 115
    );
  }
}
