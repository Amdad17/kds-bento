export interface IngredientInterface {
  id: number;
  restaurantId: number;
  ingredientName: string;
  unitOfStock: string;
  quantity: number;
  costPerUnit: number;
  caloriePerUnit: number;
}