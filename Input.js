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

    const handleKeyDown = (e) => {
      let key = e.key.toLowerCase();

      if (e.code === "Space") {
        key = "space";
      }

      console.log("KEY DOWN:", key);

      e.preventDefault();

      if (!this.keysDown[key]) {
        this.keysPressed[key] = true;
      }

      this.keysDown[key] = true;
    };

    const handleKeyUp = (e) => {
      let key = e.key.toLowerCase();

      if (e.code === "Space") {
        key = "space";
      }

      console.log("KEY UP:", key);

      this.keysDown[key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
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
