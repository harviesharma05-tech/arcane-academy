/**
 * 🪄 Arcane Academy - Spell System (PHASE 4)
 * Fireball + Shield + Cooldowns + Projectile Integration
 */

export default class SpellSystem {
  constructor(player, enemy, projectileSystem) {
    this.player = player;
    this.enemy = enemy;

    // 💥 Projectile System
    this.projectiles = projectileSystem;

    // 🪄 Spell Database
    this.spells = {
      fireball: {
        damage: 25,
        manaCost: 20,
        cooldown: 1000,
        lastCast: 0
      },

      shield: {
        manaCost: 15,
        cooldown: 3000,
        lastCast: 0
      }
    };
  }

  /**
   * 🔁 Update
   */
  update() {}

  /**
   * 🎯 Cast Spell
   */
  cast(spellName) {
    const spell = this.spells[spellName];

    if (!spell) return;

    const now = Date.now();

    // Cooldown Check
    if (now - spell.lastCast < spell.cooldown) {
      return;
    }

    // Mana Check
    if (!this.player.useMana(spell.manaCost)) {
      console.log("❌ Not enough mana");
      return;
    }

    spell.lastCast = now;

    switch (spellName) {
      case "fireball":
        this.castFireball(spell);
        break;

      case "shield":
        this.castShield();
        break;
    }
  }

  /**
   * 🔥 Fireball Spell
   */
  castFireball(spell) {
    if (!this.projectiles) {
      console.warn("ProjectileSystem missing");
      return;
    }

    this.projectiles.spawnFireball(
      this.player.x + this.player.size / 2,
      this.player.y + this.player.size / 2,
      this.enemy.x + this.enemy.size / 2,
      this.enemy.y + this.enemy.size / 2,
      spell.damage
    );

    console.log("🔥 Fireball Cast");
  }

  /**
   * 🛡 Shield Spell
   */
  castShield() {
    this.player.isShielded = true;

    console.log("🛡 Shield Activated");

    setTimeout(() => {
      this.player.isShielded = false;
    }, 2000);
  }

  /**
   * 🎨 Render UI
   */
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";

    ctx.fillText(
      "SPACE = Fireball",
      20,
      260
    );

    ctx.fillText(
      "SHIFT = Shield",
      20,
      285
    );
  }
}
