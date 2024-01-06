
import mongoose, { Schema } from 'mongoose';

export interface CategoriesInterface {
  id: number;
  name: string;
}

export interface IngredientInterface {
  id: number;
  ingredientName: string;
  unit: string;
  quantity: number;
  costPerUnit: number;
  caloriePerUnit: number;
}

export interface PackingInterface {
  dimensionLength: number;
  dimensionWidth: number;
  dimensionHeight: number;
}

export interface AddOptionInterface {
  ingredientId: number;
  ingredientName: string;
  ingredient: IngredientInterface;
}

export interface NoOptionInterface {
  ingredientId: number;
  ingredientName: string;
  ingredient: IngredientInterface;
}

export interface ItemInterface {
  itemId: number;
  itemName: string;
  itemImage: string;
  categoryId: number;
  itemQuantity: number;
  itemPreparationTime: number;
  itemPackingType: string;
  itemPackingDimension: PackingInterface;
  itemServingTemperature: string;
  itemLastingTime: number;
  itemPortionSize: number;
  ingredients: IngredientInterface[];
  options: { add: AddOptionInterface[]; no: NoOptionInterface[] };
  optionalNotes: string;
}

export interface OrderItemInterface {
  restaurantId: number;
  orderId: number;
  categories: CategoriesInterface[];
  orderTime: number;
  orderType: string;
  vipCustomer: boolean;
  tableId: number;
  deliveryServiceArriveTime?: number;
  items: ItemInterface[];
}



const orderItemSchema = new Schema<OrderItemInterface>({
  restaurantId: { type: Number, required: true },
  orderId: { type: Number, required: true },
  categories: [{ type: Object }],
  orderTime: { type: Number, required: true },
  orderType: { type: String, required: true },
  vipCustomer: { type: Boolean, required: true },
  tableId: { type: Number },
  deliveryServiceArriveTime: { type: Number },
  items: [{type: Object }],
});

export const Order = mongoose.model('Order', orderItemSchema);




// const itemSchema = new Schema<ItemInterface>({
//   itemId: { type: Number, required: true },
//   itemName: { type: String, required: true },
//   itemImage: { type: String, required: true },
//   categoryId: { type: Number, required: true },
//   itemQuantity: { type: Number, required: true },
//   itemPreparationTime: { type: Number, required: true },
//   itemPackingType: { type: String, required: true },
//   itemPackingDimension: {
//     dimensionLength: { type: Number, required: true },
//     dimensionWidth: { type: Number, required: true },
//     dimensionHeight: { type: Number, required: true },
//   },
//   itemServingTemperature: { type: String, required: true },
//   itemLastingTime: { type: Number },
//   itemPortionSize: { type: Number, required: true },
//   ingredients: [{ type: Object }],
//   options: {
//     add: [{ type: Object }],
//     no: [{ type: Object }],
//   },
//   optionalNotes: { type: String, required: true },
// });