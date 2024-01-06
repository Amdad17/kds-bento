 import mongoose, { Schema, Document } from 'mongoose';
// interface BaseRules {
// //   orderTypeHierarchy: string;
// vipInHouse: string;
// Delivery: string;
// inHouse: string;
// }

// interface Overrides {
//   deliveryDriverDistance: number;
//   inHouseOrderWaitingTime: number;
//   gapBetweenCourses: number;
// }

// interface Restaurant extends Document {
//   baseRules: BaseRules;
//   overrides: Overrides;
// }

const restaurantSchema: Schema = new Schema({
  permanentRules: {
    preparationTimePriority: { type: Boolean, default: true },
  },
  baseRules: {
    orderTypeHierarchy: { type: String, required: true },
  },
  overrides: {
    deliveryDriverDistance: { type: Number, required: true },
    inHouseOrderWaitingTime: { type: Number, required: true },
    gapBetweenCourses: { type: Number, required: true },
  },
});

export default mongoose.model('Restaurant', restaurantSchema);
