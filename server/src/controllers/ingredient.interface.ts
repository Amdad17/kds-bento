export interface IngredientInterface {
  id: number;
  restaurantId: number;
  ingredientName: String;
  unit: String;
  quantity: number;
  costPerUnit: number;
  caloriePerUnit: number;
}