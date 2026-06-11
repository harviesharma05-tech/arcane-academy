/**
 * ⭐ Arcane Academy - Progression System
 * Handles XP, leveling, and stat growth
 */

export default class ProgressionSystem {
  constructor(player) {
    this.player = player;
  }

  /**
   * ⭐ Add XP
   */
  addXP(amount) {
    this.player.xp += amount;

    console.log(`⭐ +${amount} XP`);

    this.checkLevelUp();
  }

  /**
   * 📈 Level up logic
   */
  checkLevelUp() {
    const xpNeeded = this.player.level * 50;

    if (this.player.xp >= xpNeeded) {
      this.player.xp -= xpNeeded;
      this.player.level++;

      this.levelUpReward();

      console.log(`🎉 LEVEL UP! → Level ${this.player.level}`);
    }
  }

  /**
   * 🎁 Rewards on level up
   */
  levelUpReward() {
    this.player.maxHP += 20;
    this.player.hp = this.player.maxHP;

    this.player.maxMana += 15;
    this.player.mana = this.player.maxMana;
  }
}
