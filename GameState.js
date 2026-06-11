/**
 * 🎮 Arcane Academy - Game State Manager
 * Single source of truth for entire game
 */

export default class GameState {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;

    this.state = "playing"; 
    // playing | paused | gameover
  }

  /**
   * 🔁 Update global rules
   */
  update() {
    if (this.player.hp <= 0) {
      this.state = "gameover";
    }

    if (this.enemy.hp <= 0) {
      this.enemy.hp = this.enemy.maxHP;
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
   * 💀 Game over check
   */
  isGameOver() {
    return this.state === "gameover";
  }
}
