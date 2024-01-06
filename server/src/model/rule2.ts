
import mongoose, { Schema, Document } from 'mongoose';
interface PermanentRule {
  id: string;
  description: string;
  type?: 'preparationAndDeliveryPriority'; 
}

interface RestaurantBaseRule {
  restaurantId: string;
  ruleType: 'Vip-inHouse' | 'Delivery' | 'InHouse';
  priority: number;
  hierarchy: string[]; 
}


interface OverrideRule {
  ruleId?: string; 
  type: 'driverDistance' | 'inHouseWaitTime' | 'courseGapPriority';
  condition: {
    distance?: number; // for driver distance
    waitTime?: number; // for in-house wait time
    courseGap?: number; 
  };
}

// Combined Permanent Rule Schema
const permanentRuleSchema = new Schema<PermanentRule>({
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String }, // For backward compatibility
});

// Combined Restaurant Base Rule Schema
const restaurantBaseRuleSchema = new Schema<RestaurantBaseRule>({
  restaurantId: { type: String, required: true },
  ruleType: { type: String, required: true, enum: ['Vip-inHouse', 'Delivery', 'InHouse'] },
  priority: { type: Number, required: true },
  hierarchy: { type: [String] }, // For backward compatibility
});

// Combined Override Rule Schema
const overrideRuleSchema = new Schema<OverrideRule>({
  ruleId: { type: String },
  type: { type: String, enum: ['driverDistance', 'inHouseWaitTime', 'courseGapPriority'], required: true },
  condition: { type: {} },
});

export const PermanentRuleModel = mongoose.model<PermanentRule & Document>('PermanentRule', permanentRuleSchema);
export const RestaurantBaseRuleModel = mongoose.model<RestaurantBaseRule & Document>('RestaurantBaseRule', restaurantBaseRuleSchema);
export const OverrideRuleModel = mongoose.model<OverrideRule & Document>('OverrideRule', overrideRuleSchema);
