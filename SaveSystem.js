/**
 * 💾 Save System
 */

export default class SaveSystem {

  save(player) {

    localStorage.setItem(
      "arcaneSave",
      JSON.stringify({

        x: player.x,
        y: player.y,

        hp: player.hp,

        mana: player.mana,

        level: player.level,

        xp: player.xp

      })
    );

    console.log(
      "💾 Saved"
    );

  }

  load(player) {

    const data =
      localStorage.getItem(
        "arcaneSave"
      );

    if (!data) return;

    const save =
      JSON.parse(data);

    player.x = save.x;
    player.y = save.y;

    player.hp = save.hp;

    player.mana = save.mana;

    player.level = save.level;

    player.xp = save.xp;

    console.log(
      "📂 Loaded"
    );

  }

}
