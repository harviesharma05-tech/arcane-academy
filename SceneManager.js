/**
 * 🎬 Arcane Academy - Scene Manager
 * Handles scene registration and switching
 */

export default class SceneManager {
  constructor() {
    // All scenes
    this.scenes = {};

    // Active scene
    this.currentScene = null;
    this.currentSceneName = null;
  }

  /**
   * 📦 Add Scene
   */
  addScene(name, scene) {
    this.scenes[name] = scene;
  }

  /**
   * 🚀 Start Game
   */
  start(initialSceneName) {
    this.switchScene(initialSceneName);
  }

  /**
   * 🔁 Switch Scene
   */
  switchScene(name) {
    // Leave previous scene
    if (
      this.currentScene &&
      typeof this.currentScene.unload === "function"
    ) {
      this.currentScene.unload();
    }

    // Find new scene
    const scene = this.scenes[name];

    if (!scene) {
      console.error(
        `❌ Scene "${name}" not found`
      );
      return;
    }

    // Set active scene
    this.currentScene = scene;
    this.currentSceneName = name;

    // Initialize scene
    if (typeof scene.init === "function") {
      scene.init();
    }

    console.log(
      `🎬 Switched to scene: ${name}`
    );
  }

  /**
   * 🔁 Update active scene
   */
  update(deltaTime) {
    if (
      this.currentScene &&
      typeof this.currentScene.update === "function"
    ) {
      this.currentScene.update(deltaTime);
    }
  }

  /**
   * 🎨 Render active scene
   */
  render(ctx) {
    if (
      this.currentScene &&
      typeof this.currentScene.render === "function"
    ) {
      this.currentScene.render(ctx);
    }
  }

  /**
   * 📍 Current Scene Name
   */
  getCurrentScene() {
    return this.currentSceneName;
  }
}
