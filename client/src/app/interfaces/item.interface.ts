import { IngredientInterface } from './ingredient.interface';
import { PackingInterface } from './packing.interface';
import { IRecipe } from './recipe.interface';
import { OptionInterface } from './option.interface';

export interface ItemInterface {
  _id: string;
  restaurantId: number;
  categoryId: string;
  mealTimeId: number;
  item: {
    _id: string;
    itemId: number;
    itemName: string;
    itemImage: string;
    itemDescription: string;
    itemQuantity: number;
    itemPreparationTime: number;
    itemPackingType: string[];
    itemPackingDimension?: PackingInterface;
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: string;
    ingredients: { rawIngredients: IngredientInterface[]; recipes: IRecipe[] };
    options: { add: OptionInterface[]; no: OptionInterface[] };
    chosenOptions?: { add: OptionInterface[]; no: OptionInterface[] };
    optionalNotes?: string;
    discount?: number;
    isDisabled?: boolean;
    itemPrice: number;
    itemCalories: number;
    timeOfDay: string[];
    itemProfileTastyTags: string[];
    typeOfFoods: string[];
    servingTemperature: number;
    itemDietaryRestrictions: string[];
  };
}
