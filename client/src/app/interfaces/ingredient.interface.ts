export interface IngredientInterface {
  id: number;
  restaurantId: number;
  ingredientName: string;
  unit: string;
  quantity: number;
  costPerUnit: number;
  caloriePerUnit: number;
}