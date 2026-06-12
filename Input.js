/**
 * 🎮 Arcane Academy - Input System
 * Handles keyboard input
 */

export default class Input {
  constructor() {
    // Keys currently being held down
    this.keysDown = {};

    // Keys pressed this frame
    this.keysPressed = {};

    this.initListeners();
  }

  /**
   * 🎧 Setup keyboard listeners
   */
  initListeners() {
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      // Register one-time press
      if (!this.keysDown[key]) {
        this.keysPressed[key] = true;
      }

      // Register held key
      this.keysDown[key] = true;
    });

    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();

      delete this.keysDown[key];
    });
  }

  /**
   * 🧠 Is key currently held?
   */
  isDown(key) {
    return !!this.keysDown[key.toLowerCase()];
  }

  /**
   * ⚡ Was key just pressed?
   */
  isPressed(key) {
    return !!this.keysPressed[key.toLowerCase()];
  }

  /**
   * 🔄 Reset single-frame presses
   */
  update() {
    this.keysPressed = {};
  }
}
