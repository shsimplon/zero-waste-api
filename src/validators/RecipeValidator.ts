class RecipeValidator {
  public static validateRecipeInput(
    name: string,
    ingredients: string[],
    instructions: string
  ) {
    if (!name || !ingredients || !instructions) {
      throw new Error("Tous les champs sont obligatoires.");
    }

    if (ingredients.length === 0) {
      throw new Error("Au moins un ingrédient est nécessaire.");
    }

    if (instructions.length < 10) {
      throw new Error(
        "Les instructions doivent contenir au moins 10 caractères."
      );
    }

    return true;
  }
}

export default RecipeValidator;
