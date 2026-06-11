# 🪄 Arcane Academy — 2D RPG Game Engine (JavaScript)

A modular **2D RPG game engine built in vanilla JavaScript**, featuring real-time combat, AI enemies, spell casting, and scene-based architecture.

---

## 🚀 Features

- 🎮 Custom game loop (Canvas + JS)
- 🧠 Scene system (Menu, Gameplay, Game Over)
- ⚔️ Combat system (cooldowns + damage)
- 🪄 Spell system (fireball + shield)
- 💥 Projectile-based attacks
- 👾 Enemy + multi-phase boss AI
- ⭐ XP + leveling system
- 🎒 Inventory system
- 🖥️ HUD (HP / Mana / Level)

---

## 🎮 Controls

- WASD → Move  
- SPACE → Fireball  
- SHIFT → Shield  
- ENTER → Start Game  

---

## 🧠 Architecture

- Game Engine → SceneManager, Input, GameState, HUD  
- Gameplay → Player, Enemy, Boss  
- Systems → Combat, Spell, Projectile  
- Progression → XP, Inventory  

---

## 🏆 Highlights

- Modular engine-style architecture  
- Real-time RPG mechanics  
- AI-driven enemies & boss phases  
- Scalable system design (like Phaser/Unity style)  

---

## 👨‍💻 Tech Stack

- HTML5 Canvas  
- Vanilla JavaScript (ES6 Modules)

---
ARCHITECTURE--
Game Engine
│
├── SceneManager
├── GameState
├── Input
└── HUD
│
Gameplay
│
├── Player
├── Enemy / Boss
├── Combat System
└── Spell System
      └── Projectile System
│
Progression
│
├── XP / Level System
└── Inventory System
