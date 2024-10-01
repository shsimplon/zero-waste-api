import { Router } from "express";
import RecipeController from "../controllers/RecipeController";

const router = Router();
const recipeController = new RecipeController();

router.post("/recipes", recipeController.addRecipe);

router.get("/recipes", recipeController.getAllRecipes);

router.get("/recipes/filter", recipeController.getRecipesByIngredients);

export default router;
