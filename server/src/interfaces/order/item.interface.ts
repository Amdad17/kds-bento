import { IngredientInterface } from "./ingredient.interface";
import { AddOptionInterface } from "./addoption.interface";
import { NoOptionInterface } from "./nooption.interface";
import { PackingInterface } from "./packing.interface";

export interface ItemInterface{
  restaurantId: number;
  categoryId: number;
  item: {
    itemId: number;
    itemName: string;
    itemImage?: string;
    itemQuantity: number; 
    itemPreparationTime: number; 
    itemPackingType: string;
    itemPackingDimension?: PackingInterface; 
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: string;
    ingredients: IngredientInterface[]; 
    options: { add: AddOptionInterface[]; no: NoOptionInterface[] }; 
    chosenOptions?: { add: AddOptionInterface[]; no: NoOptionInterface[] }; 
    optionalNotes?: string;
    discount: number;
    isDisabled: boolean;
    itemPrice: number;
    itemCalories: number;
    timeOfDay: string[];
    itemProfileTastyTags: string[];
    typeOfFoods: string[];
    servingTemperature: number;
    itemDietaryRestrictions: string[];
  }
}
