/**
 * 🖥️ Arcane Academy - HUD Manager
 * Syncs game state → UI overlay
 */

export default class HUD {
  constructor(player) {
    this.player = player;

    this.hpEl = document.getElementById("hp");
    this.manaEl = document.getElementById("mana");
    this.levelEl = document.getElementById("level");
  }

  /**
   * 🔁 Update UI every frame
   */
  update() {
    if (!this.player) return;

    this.hpEl.innerText = Math.floor(this.player.hp);
    this.manaEl.innerText = Math.floor(this.player.mana);
    this.levelEl.innerText = this.player.level;
  }
}
