export default class StorySystem {
  constructor() {
    this.chapter = 1;

    this.stories = {
      1: "Welcome to Arcane Academy.",
      2: "A dark force awakens.",
      3: "The Ancient Dragon rises."
    };
  }

  nextChapter() {
    this.chapter++;

    console.log(
      this.stories[
        this.chapter
      ]
    );
  }

  getCurrentStory() {
    return (
      this.stories[
        this.chapter
      ] || "The End"
    );
  }
}
