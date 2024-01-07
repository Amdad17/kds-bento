import { IngredientInterface } from "../controllers/ingredient.interface";

export interface AddOptionInterface {
    ingredientId: number;
    ingredientName: String;
    ingredient: IngredientInterface;
  }