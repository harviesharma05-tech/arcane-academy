/**
 * 🧠 Arcane Academy - Global Game State
 * Tracks overall game status
 */

export default class GameState {
  constructor(player = null, enemy = null) {
    this.player = player;
    this.enemy = enemy;

    // playing | paused | gameover
    this.state = "playing";
  }

  /**
   * 🔁 Update game state
   */
  update() {
    // Safety checks
    if (!this.player || !this.enemy) return;

    // Player dead
    if (this.player.hp <= 0) {
      this.state = "gameover";
      console.log("💀 Game Over");
    }

    // Enemy dead
    if (this.enemy.hp <= 0) {
      console.log("🏆 Enemy Defeated");
    }
  }

  /**
   * ⏸ Pause game
   */
  pause() {
    this.state = "paused";
  }

  /**
   * ▶ Resume game
   */
  resume() {
    this.state = "playing";
  }

  /**
   * 🔄 Restart state
   */
  reset() {
    this.state = "playing";
  }
}
