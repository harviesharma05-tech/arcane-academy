/**
 * 🪄 Arcane Academy - Spell System
 * Handles spell casting, mana usage, cooldowns, and effects
 */

export default class SpellSystem {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;

    // 🪄 Spell definitions
    this.spells = {
      fireball: {
        name: "Fireball",
        damage: 25,
        manaCost: 20,
        cooldown: 1500,
        range: 200,
        lastCast: 0,
      },

      shield: {
        name: "Shield",
        manaCost: 15,
        cooldown: 3000,
        lastCast: 0,
      },
    };

    // Active projectiles (future rendering support)
    this.projectiles = [];
  }

  /**
   * 🔁 Update system each frame
   */
  update() {
    this.updateProjectiles();
  }

  /**
   * 🔥 Cast a spell
   */
  cast(spellName) {
    const spell = this.spells[spellName];
    if (!spell) return;

    const now = Date.now();

    // ⏱ cooldown check
    if (now - spell.lastCast < spell.cooldown) {
      console.log(`⏳ ${spell.name} is on cooldown`);
      return;
    }

    // 🔋 mana check
    if (!this.player.useMana(spell.manaCost)) {
      console.log("❌ Not enough mana!");
      return;
    }

    spell.lastCast = now;

    // 🎯 Fireball logic
    if (spellName === "fireball") {
      this.castFireball(spell);
    }

    // 🛡 Shield logic
    if (spellName === "shield") {
      this.castShield(spell);
    }
  }

  /**
   * 🔥 Fireball spell
   */
  castFireball(spell) {
    const dx = this.enemy.x - this.player.x;
    const dy = this.enemy.y - this.player.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= spell.range) {
      this.enemy.takeDamage(spell.damage);
      console.log("🔥 Fireball hit enemy!");
    } else {
      console.log("🔥 Fireball missed!");
    }

    // projectile (future animation hook)
    this.projectiles.push({
      x: this.player.x,
      y: this.player.y,
      dx,
      dy,
      speed: 5,
    });
  }

  /**
   * 🛡 Shield spell
   */
  castShield(spell) {
    this.player.isShielded = true;

    setTimeout(() => {
      this.player.isShielded = false;
    }, 2000);

    console.log("🛡 Shield activated!");
  }

  /**
   * 💥 Update projectiles
   */
  updateProjectiles() {
    for (let p of this.projectiles) {
      const length = Math.sqrt(p.dx * p.dx + p.dy * p.dy);

      p.x += (p.dx / length) * p.speed;
      p.y += (p.dy / length) * p.speed;
    }

    // cleanup (simple version)
    this.projectiles = this.projectiles.filter(
      (p) =>
        p.x > 0 &&
        p.y > 0 &&
        p.x < window.innerWidth &&
        p.y < window.innerHeight
    );
  }

  /**
   * 🎨 Render debug info
   */
  render(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "12px monospace";

    ctx.fillText("🪄 Spell System Active", 20, 120);
    ctx.fillText("Spells: Fireball, Shield", 20, 140);

    // Projectiles (simple visualization)
    for (let p of this.projectiles) {
      ctx.fillStyle = "orange";
      ctx.fillRect(p.x, p.y, 5, 5);
    }
  }
}
