import RecipeValidator from "../validators/RecipeValidator";
import RecipeDAO from "../dao/RecipeDAO";
import IngredientService from "./IngredientsService";
import AIService from "./AIService";

class RecipeService {
  private recipeDAO: RecipeDAO;
  private aiService: AIService;

  constructor() {
    this.recipeDAO = new RecipeDAO();
    this.aiService = new AIService(process.env.OPENAI_API_KEY!); // Récupère la clé d'API via une variable d'environnement
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

  // Méthode pour générer une recette basée sur les ingrédients scannés
  public async generateRecipeFromIngredients(
    ingredients: string[]
  ): Promise<string> {
    const formattedIngredients =
      IngredientService.formatIngredients(ingredients);
    const prompt = `Propose une recette avec ces ingrédients : ${formattedIngredients.join(
      ", "
    )}. Optimise pour la nutrition et le goût, et ajuste les quantités.`;

    return await this.aiService.generateText(prompt);
  }
}

export default RecipeService;
