/**

* 🪄 Arcane Academy - Player Entity
* VERSION 11
  */

import SkillTreeSystem from "./SkillTreeSystem.js";
import EquipmentSystem from "./EquipmentSystem.js";

export default class Player {
constructor(x, y) {


// Position
this.x = x;
this.y = y;

// Visual
this.size = 40;
this.color = "cyan";

// Movement
this.speed = 6;

// Health
this.maxHP = 100;
this.hp = 100;

// Mana
this.maxMana = 100;
this.mana = 100;

// Progression
this.level = 1;
this.xp = 0;
this.xpToNextLevel = 100;

// Economy
this.gold = 0;

// Combat
this.attackPower = 10;

// Dungeon
this.dungeonFloor = 1;

// Inventory
this.inventory = [];

// State
this.isShielded = false;

// V10 Systems
this.skillTree =
  new SkillTreeSystem(this);

this.equipment =
  new EquipmentSystem();

// V11 Systems Data
this.bossKills = 0;

this.activeQuests = [];
this.completedQuests = [];

this.achievements = [];


}

/**

* 🔁 Update
  */
  update(input) {
  this.handleMovement(input);
  this.regenerateMana();
  this.applyBoundaries();
  }

/**

* ⌨️ Movement
  */
  handleMovement(input) {

if (input.isDown("w")) {

  this.y -= this.speed;
}

if (input.isDown("s")) {
  this.y += this.speed;
}

if (input.isDown("a")) {
  this.x -= this.speed;
}

if (input.isDown("d")) {
  this.x += this.speed;
}


}

/**

* 🧱 Screen Boundaries
  */
  applyBoundaries() {


this.x = Math.max(

  0,
  Math.min(
    window.innerWidth - this.size,
    this.x
  )
);

this.y = Math.max(
  0,
  Math.min(
    window.innerHeight - this.size,
    this.y
  )
);

}

/**

* 🔋 Mana Regen
  */
  regenerateMana() {

if (this.mana < this.maxMana) {

  this.mana += 0.05;

  if (this.mana > this.maxMana) {
    this.mana = this.maxMana;
  }
}

}

/**

* ❤️ Damage
  */
  takeDamage(amount) {

const defense =

  this.getDefense();

amount -= defense;

if (amount < 1) {
  amount = 1;
}

if (this.isShielded) {
  amount *= 0.3;
}

this.hp -= amount;

if (this.hp < 0) {
  this.hp = 0;
}

}

/**

* 💚 Heal
  */
  heal(amount) {

this.hp += amount;

if (this.hp > this.maxHP) {
  this.hp = this.maxHP;
}

}

/**

* 🔵 Mana Use
  */
  useMana(amount) {

if (this.mana < amount) {

  return false;
}

this.mana -= amount;

return true;

}

/**

* ⭐ XP System
  */
  gainXP(amount) {


this.xp += amount;

while (
  this.xp >=
  this.xpToNextLevel
) {

  this.xp -=
    this.xpToNextLevel;

  this.level++;

  this.maxHP += 20;
  this.maxMana += 20;

  this.hp = this.maxHP;
  this.mana = this.maxMana;

  this.xpToNextLevel += 50;

  if (this.skillTree) {
    this.skillTree.gainSkillPoint();
  }

  console.log(
    `⭐ LEVEL UP! ${this.level}`
  );
}

}

/**

* 💰 Gold
  */
  addGold(amount) {
  this.gold += amount;
  }

spendGold(amount) {

if (this.gold < amount) {
  return false;
}

this.gold -= amount;

return true;

}

/**

* 🎒 Inventory
  */
  addItem(item) {
  this.inventory.push(item);
  }

removeItem(itemName) {

const index =
  this.inventory.findIndex(
    item =>
      item.name === itemName
  );

if (index !== -1) {
  this.inventory.splice(
    index,
    1
  );
}

}

/**

* ⚔️ Equipment
  */
  equip(item) {

if (

  this.equipment &&
  this.equipment.equip
) {
  this.equipment.equip(item);
}

}

/**

* ⚔️ Attack
  */
  getAttackPower() {

let attack =

  this.attackPower;

if (
  this.equipment &&
  this.equipment.getAttackBonus
) {
  attack +=
    this.equipment.getAttackBonus();
}

return Math.floor(attack);

}

/**

* 🛡 Defense
  */
  getDefense() {


if (

  this.equipment &&
  this.equipment.getDefenseBonus
) {
  return this.equipment.getDefenseBonus();
}

return 0;

}

/**

* 📜 Quests
  */
  addQuest(quest) {
  this.activeQuests.push(
  quest
  );
  }

completeQuest(questId) {


const quest =
  this.activeQuests.find(
    q => q.id === questId
  );

if (!quest) return;

this.completedQuests.push(
  quest
);

this.activeQuests =
  this.activeQuests.filter(
    q => q.id !== questId
  );

}

/**

* 🏆 Achievement
  */
  unlockAchievement(name) {


if (


  !this.achievements.includes(
    name
  )
) {
  this.achievements.push(
    name
  );
}

}

/**

* 🎨 Render
  */
  render(ctx) {

ctx.fillStyle =
  
  this.isShielded
    ? "lightblue"
    : this.color;

ctx.fillRect(
  this.x,
  this.y,
  this.size,
  this.size
);

ctx.strokeStyle =
  "white";

ctx.lineWidth = 2;

ctx.strokeRect(
  this.x,
  this.y,
  this.size,
  this.size
);

// HP
ctx.fillStyle = "red";

ctx.fillRect(
  this.x,
  this.y - 15,
  this.size,
  5
);

ctx.fillStyle = "lime";

ctx.fillRect(
  this.x,
  this.y - 15,
  this.size *
    (this.hp / this.maxHP),
  5
);

// Mana
ctx.fillStyle =
  "#38bdf8";

ctx.fillRect(
  this.x,
  this.y - 22,
  this.size *
    (this.mana /
      this.maxMana),
  4
);

// Level
ctx.fillStyle =
  "white";

ctx.font =
  "12px Arial";

ctx.fillText(
  `Lv ${this.level}`,
  this.x,
  this.y - 30
);

}
}
