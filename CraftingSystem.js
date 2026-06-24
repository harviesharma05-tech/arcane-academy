export default class CraftingSystem {
  constructor(player) {
    this.player = player;
  }

  craft(recipe) {
    const items =
      this.player.inventory;

    const hasAll =
      recipe.ingredients.every(
        item =>
          items.includes(item)
      );

    if (!hasAll) {
      return false;
    }

    recipe.ingredients.forEach(
      ingredient => {
        const index =
          items.indexOf(
            ingredient
          );

        if (index !== -1) {
          items.splice(
            index,
            1
          );
        }
      }
    );

    items.push(recipe.result);

    console.log(
      `🔨 Crafted ${recipe.result}`
    );

    return true;
  }
}
