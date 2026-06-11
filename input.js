/**
 * 🎮 Arcane Academy - Input System
 * Handles keyboard input state tracking (real-time + clean API)
 */

export default class Input {
  constructor() {
    // Stores currently pressed keys
    this.keysDown = {};

    // Stores just-pressed keys (useful for single actions like spell casting)
    this.keysPressed = {};

    this.initListeners();
  }

  /**
   * 🎧 Setup keyboard listeners
   */
  initListeners() {
    window.addEventListener("keydown", (e) => {
      const key = e.key.toLowerCase();

      // Prevent repeat firing when key is held
      if (!this.keysDown[key]) {
        this.keysPressed[key] = true;
      }

      this.keysDown[key] = true;
    });

    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase();
      this.keysDown[key] = false;
    });
  }

  /**
   * 🧠 Check if key is being held down
   */
  isDown(key) {
    return !!this.keysDown[key.toLowerCase()];
  }

  /**
   * ⚡ Check if key was just pressed (single frame action)
   */
  isPressed(key) {
    return !!this.keysPressed[key.toLowerCase()];
  }

  /**
   * 🔄 Reset "pressed" state every frame
   * (IMPORTANT: call this in game loop if using isPressed)
   */
  update() {
    this.keysPressed = {};
  }
}
