/**
 * 🌳 Arcane Academy - Skill Tree System
 * Version 10
 */

export default class SkillTreeSystem {
  constructor(player) {
    this.player = player;

    this.skillPoints = 0;

    this.skills = {
      fireMastery1: false,
      fireMastery2: false,

      manaSurge: false,
      fastCasting: false,

      iceShield: false
    };
  }

  gainSkillPoint() {
    this.skillPoints++;
  }

  unlock(skill) {
    if (this.skillPoints <= 0) return false;
    if (this.skills[skill]) return false;

    this.skills[skill] = true;
    this.skillPoints--;

    return true;
  }

  has(skill) {
    return !!this.skills[skill];
  }
}
