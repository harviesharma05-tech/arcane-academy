/**
 * 🎮 Arcane Academy - Input System
 */

export default class Input {
  constructor() {
    this.keysDown = {};
    this.keysPressed = {};

    this.initListeners();
  }

  initListeners() {
    window.addEventListener("keydown", (e) => {
      let key = e.key.toLowerCase();

      // Normalize Space key
      if (e.code === "Space") {
        key = "space";
      }

      // Prevent browser scrolling
      if (
        ["space", "w", "a", "s", "d", "shift"].includes(key)
      ) {
        e.preventDefault();
      }

      if (!this.keysDown[key]) {
        this.keysPressed[key] = true;
      }

      this.keysDown[key] = true;
    });

    window.addEventListener("keyup", (e) => {
      let key = e.key.toLowerCase();

      if (e.code === "Space") {
        key = "space";
      }

      this.keysDown[key] = false;
    });
  }

  isDown(key) {
    return !!this.keysDown[key.toLowerCase()];
  }

  isPressed(key) {
    return !!this.keysPressed[key.toLowerCase()];
  }

  update() {
    this.keysPressed = {};
  }
}
