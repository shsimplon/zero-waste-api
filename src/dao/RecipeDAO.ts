// dao/RecipeDAO.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RecipeDAO {
  public async getAllRecipes() {
    return await prisma.recipe.findMany();
  }

  public async getRecipesByIngredients(ingredients: string[]): Promise<any> {
    return await prisma.recipe.findMany({
      where: {
        ingredients: {
          hasSome: ingredients,
        },
      },
    });
  }

  public async addRecipe(
    name: string,
    ingredients: string[],
    instructions: string
  ) {
    return await prisma.recipe.create({
      data: {
        name,
        ingredients,
        instructions,
      },
    });
  }
}

export default RecipeDAO;
