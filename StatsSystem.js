/**
 * 📊 Player Stats Calculator
 */

export default class StatsSystem {
  constructor(
    player,
    equipment,
    skillTree
  ) {
    this.player = player;
    this.equipment = equipment;
    this.skillTree = skillTree;
  }

  getAttack() {
    let attack =
      this.player.attackPower || 10;

    attack +=
      this.equipment.getAttackBonus();

    if (
      this.skillTree.has(
        "fireMastery1"
      )
    ) {
      attack *= 1.1;
    }

    if (
      this.skillTree.has(
        "fireMastery2"
      )
    ) {
      attack *= 1.2;
    }

    return Math.floor(attack);
  }

  getDefense() {
    let defense = 0;

    defense +=
      this.equipment.getDefenseBonus();

    return defense;
  }
}
