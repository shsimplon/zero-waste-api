import RecipeValidator from "../validators/RecipeValidator";
import RecipeDAO from "../dao/RecipeDAO";
import IngredientService from "./IngredientsService";

class RecipeService {
  private recipeDAO: RecipeDAO;

  constructor() {
    this.recipeDAO = new RecipeDAO();
  }
  public async getAllRecipes() {
    return await this.recipeDAO.getAllRecipes();
  }

  public async addRecipe(
    name: string,
    ingredients: string[],
    instructions: string
  ) {
    RecipeValidator.validateRecipeInput(name, ingredients, instructions);

    return await this.recipeDAO.addRecipe(name, ingredients, instructions);
  }

  public async getRecipesByIngredients(ingredients: string[]): Promise<any> {
    const formattedIngredients =
      IngredientService.formatIngredients(ingredients);

    const allRecipes = await this.recipeDAO.getRecipesByIngredients(
      formattedIngredients
    );

    return allRecipes;
  }
}

export default RecipeService;
