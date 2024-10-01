import { Request, Response } from "express";
import RecipeService from "../services/RecipeService";

class RecipeController {
  private recipeService: RecipeService;

  constructor() {
    this.recipeService = new RecipeService();
  }

  public getAllRecipes = async (req: Request, res: Response) => {
    try {
      const recipes = await this.recipeService.getAllRecipes();

      res.status(200).json({ recipes });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Erreur lors de la récupération des recettes",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "Erreur inconnue lors de la récupération des recettes",
        });
      }
    }
  };

  public getRecipesByIngredients = async (req: Request, res: Response) => {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients)) {
      return res
        .status(400)
        .json({ message: "Ingrédients manquants ou incorrects." });
    }

    try {
      const recipes = await this.recipeService.getRecipesByIngredients(
        ingredients
      );

      res.status(200).json({ recipes });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Erreur lors de la recherche des recettes",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "Erreur inconnue lors de la recherche des recettes",
        });
      }
    }
  };

  public addRecipe = async (req: Request, res: Response) => {
    const { name, ingredients, instructions } = req.body;

    if (!name || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Nom, ingrédients et instructions sont obligatoires.",
      });
    }

    try {
      const newRecipe = await this.recipeService.addRecipe(
        name,
        ingredients,
        instructions
      );
      res
        .status(201)
        .json({ message: "Recette ajoutée avec succès", recipe: newRecipe });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: "Erreur lors de l'ajout de la recette",
          error: error.message,
        });
      } else {
        res
          .status(500)
          .json({ message: "Erreur inconnue lors de l'ajout de la recette" });
      }
    }
  };
}

export default RecipeController;
