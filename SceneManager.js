/**
 * 🎬 Arcane Academy - Scene Manager (PHASE 3 UPDATED)
 * Handles scene registry, switching, and lifecycle safely
 */

export default class SceneManager {
  constructor() {
    this.scenes = {};
    this.currentScene = null;
    this.currentSceneName = null;
  }

  /**
   * 📦 Register scene
   */
  addScene(name, scene) {
    this.scenes[name] = scene;
  }

  /**
   * 🚀 Start system with initial scene
   */
  start(initialSceneName) {
    this.switchScene(initialSceneName);
  }

  /**
   * 🔁 Switch scenes safely
   */
  switchScene(name) {
    const newScene = this.scenes[name];

    if (!newScene) {
      console.warn(`⚠️ Scene not found: ${name}`);
      return;
    }

    // 🚪 unload old scene
    if (this.currentScene && this.currentScene.unload) {
      this.currentScene.unload();
    }

    // 🎬 set new scene
    this.currentScene = newScene;
    this.currentSceneName = name;

    // 🎬 init new scene
    if (this.currentScene.init) {
      this.currentScene.init();
    }

    console.log(`🎬 Switched to scene: ${name}`);
  }

  /**
   * 🔁 Update active scene
   */
  update(deltaTime) {
    if (!this.currentScene) return;

    if (this.currentScene.update) {
      this.currentScene.update(deltaTime);
    }
  }

  /**
   * 🎨 Render active scene
   */
  render(ctx) {
    if (!this.currentScene) return;

    if (this.currentScene.render) {
      this.currentScene.render(ctx);
    }
  }

  /**
   * 📍 Get current scene name
   */
  getCurrentScene() {
    return this.currentSceneName;
  }
}
