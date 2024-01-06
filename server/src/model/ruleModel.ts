// import mongoose, { Schema } from 'mongoose';

// export interface PermanentRule {
//   id: string;
//   description: string;
// }

// export interface RestaurantBaseRule {
//   restaurantId: string;
//   ruleType: 'Vip-inHouse' | 'Delivery' | 'InHouse';
//   priority: number;
// }

// export interface RuleOverride {
//   ruleId: string;
//   conditionType: 'DeliveryTime' | 'InHouseWaitingTime' | 'CourseGap';
//   conditionValue: number;
// }

// const PermanentRuleSchema = new Schema<PermanentRule>({
//   id: { type: String, required: true, unique: true },
//   description: { type: String, required: true },
// });

// const RestaurantBaseRuleSchema = new Schema<RestaurantBaseRule>({
//   restaurantId: { type: String, required: true },
//   ruleType: { type: String, required: true, enum: ['Vip-inHouse', 'Delivery', 'InHouse'] },
//   priority: { type: Number, required: true },
// });

// const RuleOverrideSchema = new Schema<RuleOverride>({
//   ruleId: { type: String, required: true },
//   conditionType: { type: String, required: true, enum: ['DeliveryTime', 'InHouseWaitingTime', 'CourseGap'] },
//   conditionValue: { type: Number, required: true },
// });

// export const PermanentRuleModel = mongoose.model('PermanentRulethree', PermanentRuleSchema);
// export const RestaurantBaseRuleModel = mongoose.model('RestaurantBaseRulefour', RestaurantBaseRuleSchema);
// export const RuleOverrideModel = mongoose.model('RuleOverridefour', RuleOverrideSchema);


import mongoose, { Schema} from 'mongoose';

export interface IRule  {
  ruleType: 'permanent' | 'base' | 'override';
  orderType: string; // 'VIP', 'Delivery', 'In-House', etc.
  description: string;
  conditions: {
    riderDistance: number;
    customerWait: number;
    courseWait: number;
  };
}

const RuleSchema: Schema = new Schema({
  ruleType: { type: String, required: true },
  orderType: { type: String, required: true },
  description: { type: String, required: true },
  conditions: {
    riderDistance: Number,
    customerWait: Number,
    courseWait: Number
  }
});

export default mongoose.model<IRule>('Rule', RuleSchema);


