/**
 * 🪄 Arcane Academy - Spell System (PHASE 2 UPDATED)
 * Now integrates projectile system + proper RPG flow
 */

export default class SpellSystem {
  constructor(player, enemy, projectileSystem, progressionSystem = null) {
    this.player = player;
    this.enemy = enemy;

    // 💥 external systems (Phase 2 upgrade)
    this.projectiles = projectileSystem;
    this.progression = progressionSystem;

    // 🪄 Spell database
    this.spells = {
      fireball: {
        name: "Fireball",
        damage: 25,
        manaCost: 20,
        cooldown: 1200,
        range: 250,
        lastCast: 0,
      },

      shield: {
        name: "Shield",
        manaCost: 15,
        cooldown: 3000,
        lastCast: 0,
      },
    };
  }

  /**
   * 🔁 Update system
   */
  update() {
    // future: particle sync, buffs, etc.
  }

  /**
   * 🔥 Cast spell
   */
  cast(spellName) {
    const spell = this.spells[spellName];
    if (!spell) return;

    const now = Date.now();

    // ⏱ cooldown check
    if (now - spell.lastCast < spell.cooldown) {
      console.log(`⏳ ${spell.name} cooling down`);
      return;
    }

    // 🔋 mana check
    if (!this.player.useMana(spell.manaCost)) {
      console.log("❌ Not enough mana");
      return;
    }

    spell.lastCast = now;

    // 🎯 FIREBALL (projectile-based)
    if (spellName === "fireball") {
      this.castFireball(spell);
    }

    // 🛡 SHIELD
    if (spellName === "shield") {
      this.castShield();
    }
  }

  /**
   * 💥 FIREBALL (NOW REAL PROJECTILE)
   */
  castFireball(spell) {
    this.projectiles.spawnFireball(
      this.player.x,
      this.player.y,
      this.enemy.x,
      this.enemy.y,
      spell.damage
    );

    console.log("🔥 Fireball casted!");
  }

  /**
   * 🛡 Shield spell
   */
  castShield() {
    this.player.isShielded = true;

    setTimeout(() => {
      this.player.isShielded = false;
    }, 2000);

    console.log("🛡 Shield activated");
  }

  /**
   * 🎨 Debug render
   */
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";

    ctx.fillText("🪄 SpellSystem Active", 20, 120);
    ctx.fillText("Fireball | Shield", 20, 140);
  }
}
