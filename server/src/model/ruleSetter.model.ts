import mongoose, { Schema }  from "mongoose";

export interface PermanentRule {
    id: string;
    description: string;
  }
  export interface RestaurantBaseRule {
    restaurantId: string;
    ruleType: 'Vip-inHouse' | 'Delivery' | 'InHouse'
    priority: number;
  }

  export interface RuleOverride {
    ruleId: string;
    conditionType: 'DeliveryTime' | 'InHouseWaitingTime' | 'CourseGap';
    conditionValue: number;
  }
  const restaurantBaseRuleSchema = new mongoose.Schema<RestaurantBaseRule>({
    restaurantId: { type: String, required: true },
    ruleType: { type: String, required: true, enum: ['Vip-inHouse', 'Delivery',' InHouse'] },
    priority: { type: Number, required: true }
  });
  
  const ruleOverrideSchema = new mongoose.Schema<RuleOverride>({
    ruleId: { type: String, required: true },
    conditionType: { type: String, required: true, enum: ['DeliveryTime', 'InHouseWaitingTime', 'CourseGap'] },
    conditionValue: { type: Number, required: true }
  });

export const RestaurantBaseRule = mongoose.model('RestaurantBaseRule', restaurantBaseRuleSchema);
export const RuleOverride = mongoose.model('RuleOverride', ruleOverrideSchema);
