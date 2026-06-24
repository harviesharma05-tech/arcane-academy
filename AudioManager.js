export default class AudioManager {
  constructor() {
    this.sounds = {};
  }

  load(name, src) {
    this.sounds[name] =
      new Audio(src);
  }

  play(name) {
    const sound =
      this.sounds[name];

    if (!sound) return;

    sound.currentTime = 0;
    sound.play();
  }

  stop(name) {
    const sound =
      this.sounds[name];

    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;
  }
}
