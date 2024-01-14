import { model, Schema } from "mongoose";
import { OrderItemInterface } from "../../interfaces/order/order.interface";
import { IngredientInterface } from "../../interfaces/order/ingredient.interface";
import { ItemInterface } from "../../interfaces/order/item.interface";
import { CategoriesInterface } from "../../interfaces/order/categories.interface";
import { PackingInterface } from "../../interfaces/order/packing.interface";

const ingredientSchema = new Schema<IngredientInterface>({
  id: { type: Number, required: true },
  restaurantId: { type: Number, required: true },
  ingredientName: { type: String, required: true },
  unitOfStock: { type: String, required: true },
  quantity: { type: Number, required: true },
  costPerUnit: { type: Number, required: true },
  caloriePerUnit: { type: Number, required: true },
});

const categorySchema = new Schema<CategoriesInterface>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

const packingSchema = new Schema<PackingInterface>({
  dimensionLength: { type: Number, required: true },
  dimensionWidth: { type: Number, required: true },
  dimensionHeight: { type: Number, required: true },
});

const itemSchema = new Schema<ItemInterface>({
  restaurantId: { type: Number, required: true },
  categoryId: { type: Number, required: true },
  item: {
    itemId: { type: Number, required: true },
    itemName: { type: String, required: true },
    itemImage: { type: String, required: true },
    itemQuantity: { type: Number, required: true },
    itemPreparationTime: { type: Number, required: true },
    itemPackingType: { type: String, required: true },
    itemPackingDimension: packingSchema,
    itemServingTemperature: { type: String, required: true },
    itemLastingTime: { type: Number, required: true }, //needed for marketplace
    itemPortionSize: { type: String, required: true },
    ingredients: [ingredientSchema],
    options: {
      type: {
        add: [
          {
            ingredientId: { type: Number, required: true },
            ingredientName: { type: String, required: true },
            ingredient: ingredientSchema,
          },
        ],
        no: [
          {
            ingredientId: { type: Number, required: true },
            ingredientName: { type: String, required: true },
            ingredient: ingredientSchema,
          },
        ],
      },
      required: true
    },
    chosenOptions: {
      type: {
        add: [
          {
            ingredientId: { type: Number, required: true },
            ingredientName: { type: String, required: true },
            ingredient: ingredientSchema,
          },
        ],
        no: [
          {
            ingredientId: { type: Number, required: true },
            ingredientName: { type: String, required: true },
            ingredient: ingredientSchema,
          },
        ],
      },
    },
    optionalNotes: { type: String },
    discount: { type: Number, required: true },
    isDisabled: { type: Boolean, required: true },
    itemPrice: { type: Number, required: true },
    itemCalories: { type: Number, required: true },
    timeOfDay: { type: [String], required: true },
    itemProfileTastyTags: { type: [String], required: true },
    typeOfFoods: { type: [String], required: true },
    servingTemperature: { type: Number, required: true },
    itemDietaryRestrictions: { type: [String], required: true },
  },
});

const orderItemSchema = new Schema<OrderItemInterface>({
  restaurantId: { type: Number, required: true },
  orderId: { type: String, required: true },
  categories: [{ type: Object }],
  orderType: { type: String, required: true },
  vipCustomer: { type: Boolean, required: true },
  tableId: { type: String },
  deliveryServiceArriveTime: { type: Date },
  items: [{ type: Object }],
  createdAt: { type: Date, required: true },
  preparingTimestamp: { type: Date },
  readyTimestamp: { type: Date },
  servedTimestamp: { type: Date },
  status: {
    type: String,
    required: true,
    enum: ["pending", "preparing", "ready", "complete"],
  },
  chef: { type: Object },
});
const Orders = model("orders", orderItemSchema);

export default Orders;
