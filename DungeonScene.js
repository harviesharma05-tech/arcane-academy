/**
 * 🏰 Dungeon Scene
 */

import DungeonMap from "./DungeonMap.js";
import WaveSystem from "./WaveSystem.js";
import MiniMap from "./MiniMap.js";

export default class DungeonScene {

  constructor(game) {
    this.game = game;
  }

  init() {

    this.map =
      new DungeonMap();

    this.waveSystem =
      new WaveSystem();

    this.miniMap =
      new MiniMap();

    console.log(
      "🏰 Dungeon Loaded"
    );
  }

  update(deltaTime) {

    this.map.update();
  }

  render(ctx) {

    this.map.render(ctx);

    this.waveSystem.render(ctx);

    if (
      this.game &&
      this.game.hud &&
      this.game.hud.player
    ) {
      this.miniMap.render(
        ctx,
        this.game.hud.player
      );
    }
  }

  unload() {}
}
