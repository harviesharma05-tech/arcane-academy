/**
 * 🪄 Arcane Academy - Scene Manager
 * Handles switching between game scenes (Menu, Academy, Battle, etc.)
 */

export default class SceneManager {
  constructor() {
    this.currentScene = null;
    this.scenes = {};
  }

  /**
   * 📦 Register a scene (optional for scaling)
   */
  addScene(name, scene) {
    this.scenes[name] = scene;
  }

  /**
   * 🎬 Load a scene directly
   */
  loadScene(scene) {
    // If there's an existing scene, clean it up
    if (this.currentScene && this.currentScene.unload) {
      this.currentScene.unload();
    }

    this.currentScene = scene;

    // Initialize new scene
    if (this.currentScene && this.currentScene.init) {
      this.currentScene.init();
    }

    console.log(`🎬 Scene loaded: ${scene.constructor.name}`);
  }

  /**
   * 🔁 Update active scene
   */
  update(deltaTime) {
    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update(deltaTime);
    }
  }

  /**
   * 🎨 Render active scene
   */
  render(ctx) {
    if (this.currentScene && this.currentScene.render) {
      this.currentScene.render(ctx);
    }
  }

  /**
   * 🔄 Switch scene by name (if using registry)
   */
  switchScene(name) {
    const scene = this.scenes[name];

    if (!scene) {
      console.warn(`⚠️ Scene not found: ${name}`);
      return;
    }

    this.loadScene(scene);
  }
}
