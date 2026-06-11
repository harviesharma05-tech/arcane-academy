/**
 * 🪄 Arcane Academy - Spell System
 * Stable Version
 */

export default class SpellSystem {
  constructor(player, enemy, projectileSystem = null, progressionSystem = null) {
    this.player = player;
    this.enemy = enemy;

    this.projectiles = projectileSystem;
    this.progression = progressionSystem;

    this.spells = {
      fireball: {
        name: "Fireball",
        damage: 25,
        manaCost: 20,
        cooldown: 1200,
        lastCast: 0
      },

      shield: {
        name: "Shield",
        manaCost: 15,
        cooldown: 3000,
        lastCast: 0
      }
    };
  }

  /**
   * 🔁 Update
   */
  update(deltaTime) {
    if (this.projectiles?.update) {
      this.projectiles.update(deltaTime);
    }
  }

  /**
   * 🪄 Cast Spell
   */
  cast(spellName) {
    const spell = this.spells[spellName];

    if (!spell) return;

    const now = Date.now();

    // Cooldown
    if (now - spell.lastCast < spell.cooldown) {
      return;
    }

    // Mana
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
   * 🔥 Fireball
   */
  castFireball(spell) {
    // If Projectile System exists
    if (this.projectiles?.spawnFireball) {
      this.projectiles.spawnFireball(
        this.player.x,
        this.player.y,
        this.enemy.x,
        this.enemy.y,
        spell.damage
      );
    } else {
      // Temporary direct damage fallback
      this.enemy.takeDamage(spell.damage);
    }

    console.log("🔥 Fireball Cast");
  }

  /**
   * 🛡 Shield
   */
  castShield() {
    this.player.isShielded = true;

    setTimeout(() => {
      this.player.isShielded = false;
    }, 2000);

    console.log("🛡 Shield Activated");
  }

  /**
   * 🎨 Render UI
   */
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";

    ctx.fillText(
      "SPACE = Fireball",
      20,
      120
    );

    ctx.fillText(
      "SHIFT = Shield",
      20,
      140
    );

    if (this.projectiles?.render) {
      this.projectiles.render(ctx);
    }
  }
}
