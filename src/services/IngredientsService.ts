class IngredientService {
  public static formatIngredients(ingredients: string[]): string[] {
    return ingredients.map((ingredient) => ingredient.trim().toLowerCase());
  }
}

export default IngredientService;
