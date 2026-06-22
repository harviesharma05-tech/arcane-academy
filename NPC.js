/**
 * 🧙 Arcane Academy - NPC
 * VERSION 9
 */

export default class NPC {
  constructor(x, y, name = "Wizard") {

    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 40;
    this.color = "#facc15";

    // Info
    this.name = name;

    // Interaction
    this.interactionRange = 80;

    // Dialogue
    this.dialogues = [
      "Welcome to Arcane Academy!",
      "Magic requires patience.",
      "Defeat enemies to gain XP.",
      "A dungeon portal has appeared!"
    ];

    this.currentDialogue = 0;

    // Quest
    this.questGiven = false;
  }

  /**
   * 🔁 Update
   */
  update(player) {

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    this.distance =
      Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * 💬 Interact
   */
  interact() {

    const text =
      this.dialogues[
        this.currentDialogue
      ];

    this.currentDialogue++;

    if (
      this.currentDialogue >=
      this.dialogues.length
    ) {
      this.currentDialogue = 0;
    }

    console.log(
      `💬 ${this.name}: ${text}`
    );

    return text;
  }

  /**
   * 📜 Give Quest
   */
  giveQuest() {

    if (this.questGiven) {
      return null;
    }

    this.questGiven = true;

    return {
      id: "first_hunt",
      title: "First Hunt",
      description:
        "Defeat 5 enemies.",
      rewardXP: 100,
      rewardGold: 50
    };
  }

  /**
   * 📏 Check Range
   */
  isPlayerNearby(player) {

    const dx =
      player.x - this.x;

    const dy =
      player.y - this.y;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    return (
      distance <
      this.interactionRange
    );
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Body
    ctx.fillStyle = this.color;

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // Border
    ctx.strokeStyle = "white";

    ctx.strokeRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // Name
    ctx.fillStyle = "white";

    ctx.font = "12px Arial";

    ctx.fillText(
      this.name,
      this.x - 5,
      this.y - 10
    );

    // Interaction Marker
    ctx.fillStyle = "#7dd3fc";

    ctx.beginPath();

    ctx.arc(
      this.x + this.size / 2,
      this.y - 20,
      5,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}
