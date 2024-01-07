import { IngredientInterface } from "../controllers/ingredient.interface";
import { AddOptionInterface } from "./addoption.interface";
import { NoOptionInterface } from "./nooption.interface";
import { PackingInterface } from "./packing.interface";

export interface ItemInterface{
    itemId: number;
    itemName: String;
    itemImage: String; 
    categoryId: number;
    itemQuantity: number; 
    itemPreparationTime: number; 
    itemPackingType: String;
    itemPackingDimension: PackingInterface; 
    itemServingTemperature: String;
    itemLastingTime?: number; //needed for marketplace
    itemPortionSize: number; 
    ingredients: IngredientInterface[]; 
    options: { add: AddOptionInterface[]; no: NoOptionInterface[] }; 
    optionalNotes: String;
  }
