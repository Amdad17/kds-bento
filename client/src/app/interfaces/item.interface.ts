import { IngredientInterface } from "./ingredient.interface";
import { AddOptionInterface } from "./addoption.interface";
import { NoOptionInterface } from "./nooption.interface";
import { PackingInterface } from "./packing.interface";

export interface ItemInterface{
    itemId: number;
    itemName: string;
    itemImage: string; 
    categoryId: number;
    itemQuantity: number; 
    itemPreparationTime: number; 
    itemPackingType: string;
    itemPackingDimension: PackingInterface; 
    itemServingTemperature: string;
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: number; 
    ingredients: IngredientInterface[]; 
    options: { add: AddOptionInterface[]; no: NoOptionInterface[] }; 
    optionalNotes: string;
  }
