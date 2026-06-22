/**
 * 👾 Arcane Academy - Enemy Entity
 * VERSION 9
 */

export default class Enemy {
  constructor(x, y) {

    // Position
    this.x = x;
    this.y = y;

    // Visual
    this.size = 32;
    this.color = "red";

    // Stats
    this.maxHP = 100;
    this.hp = 100;

    this.damage = 5;

    // Rewards
    this.goldReward = 20;
    this.xpReward = 25;

    // AI
    this.speed = 1.8;

    this.state = "idle";

    this.detectionRange = 220;
    this.attackRange = 45;

    // Attack Cooldown
    this.attackCooldown = 1000;
    this.lastAttack = 0;

    // Movement
    this.velocityX = 0;
    this.velocityY = 0;
  }

  /**
   * 🔁 Update
   */
  update(player) {

    const dx = player.x - this.x;
    const dy = player.y - this.y;

    const distance =
      Math.sqrt(dx * dx + dy * dy);

    // AI Decision
    if (distance < this.attackRange) {

      this.state = "attack";

    } else if (
      distance < this.detectionRange
    ) {

      this.state = "chase";

    } else {

      this.state = "idle";
    }

    // Execute State
    switch (this.state) {

      case "idle":
        this.idleMovement();
        break;

      case "chase":
        this.chasePlayer(
          dx,
          dy,
          distance
        );
        break;

      case "attack":
        this.attackPlayer(player);
        break;
    }
  }

  /**
   * 😴 Idle
   */
  idleMovement() {

    this.x +=
      Math.sin(Date.now() / 500) * 0.3;

    this.y +=
      Math.cos(Date.now() / 500) * 0.3;
  }

  /**
   * 🏃 Chase
   */
  chasePlayer(
    dx,
    dy,
    distance
  ) {

    if (distance === 0) return;

    this.velocityX =
      (dx / distance) * this.speed;

    this.velocityY =
      (dy / distance) * this.speed;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  /**
   * ⚔️ Attack
   */
  attackPlayer(player) {

    const now = Date.now();

    if (
      now - this.lastAttack <
      this.attackCooldown
    ) {
      return;
    }

    this.lastAttack = now;

    player.takeDamage(
      this.damage
    );
  }

  /**
   * 💥 Damage
   */
  takeDamage(amount) {

    this.hp -= amount;

    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  /**
   * 🔄 Scale For Dungeon Floor
   */
  scaleForFloor(floor) {

    this.maxHP =
      100 + floor * 30;

    this.hp =
      this.maxHP;

    this.damage =
      5 + floor * 2;

    this.goldReward =
      20 + floor * 10;

    this.xpReward =
      25 + floor * 15;
  }

  /**
   * 🎨 Render
   */
  render(ctx) {

    // Body
    ctx.fillStyle =
      this.state === "attack"
        ? "#ff4444"
        : this.color;

    ctx.fillRect(
      this.x,
      this.y,
      this.size,
      this.size
    );

    // HP Background
    ctx.fillStyle = "black";

    ctx.fillRect(
      this.x,
      this.y - 10,
      this.size,
      5
    );

    // HP Fill
    ctx.fillStyle = "lime";

    ctx.fillRect(
      this.x,
      this.y - 10,
      this.size *
        (this.hp / this.maxHP),
      5
    );

    // State
    ctx.fillStyle = "white";

    ctx.font =
      "10px monospace";

    ctx.fillText(
      this.state,
      this.x,
      this.y - 15
    );
  }
}
