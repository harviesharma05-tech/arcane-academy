/**
 * 💾 Arcane Academy - Save System
 * VERSION 9
 */

export default class SaveSystem {
  constructor() {
    this.saveKey = "arcaneAcademySave";
  }

  /**
   * 💾 Save Game
   */
  save(player) {
    if (!player) return;

    const saveData = {
      level: player.level,
      xp: player.xp,
      xpToNextLevel: player.xpToNextLevel,

      hp: player.hp,
      maxHP: player.maxHP,

      mana: player.mana,
      maxMana: player.maxMana,

      gold: player.gold,

      x: player.x,
      y: player.y,

      dungeonFloor:
        player.dungeonFloor || 1,

      inventory:
        player.inventory || [],

      timestamp: Date.now()
    };

    localStorage.setItem(
      this.saveKey,
      JSON.stringify(saveData)
    );

    console.log("💾 Game Saved");
  }

  /**
   * 📂 Load Game
   */
  load(player) {
    const data =
      localStorage.getItem(
        this.saveKey
      );

    if (!data) {
      console.log(
        "⚠️ No Save Found"
      );
      return false;
    }

    const saveData =
      JSON.parse(data);

    player.level =
      saveData.level || 1;

    player.xp =
      saveData.xp || 0;

    player.xpToNextLevel =
      saveData.xpToNextLevel || 100;

    player.hp =
      saveData.hp || 100;

    player.maxHP =
      saveData.maxHP || 100;

    player.mana =
      saveData.mana || 100;

    player.maxMana =
      saveData.maxMana || 100;

    player.gold =
      saveData.gold || 0;

    player.x =
      saveData.x || 150;

    player.y =
      saveData.y || 150;

    player.dungeonFloor =
      saveData.dungeonFloor || 1;

    player.inventory =
      saveData.inventory || [];

    console.log(
      "📂 Save Loaded"
    );

    return true;
  }

  /**
   * 🗑 Delete Save
   */
  deleteSave() {
    localStorage.removeItem(
      this.saveKey
    );

    console.log(
      "🗑 Save Deleted"
    );
  }

  /**
   * ❓ Has Save?
   */
  hasSave() {
    return (
      localStorage.getItem(
        this.saveKey
      ) !== null
    );
  }
}
