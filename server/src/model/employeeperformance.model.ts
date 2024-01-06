
import mongoose, { Schema } from 'mongoose';

export interface EmployeePerformance {
  employeeId: number;
  name: string;
  email: string;
  password: ""
  role: string;
  orderPreparationStandardTime: number;
  orderStartingTime: number;
  orderServingTime: number;
  orderDeliveryTime: number;
  skillTags: string;
}


const employeePerformanceSchema = new Schema<EmployeePerformance>({
  employeeId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  orderPreparationStandardTime: { type: Number, required: true },
  orderStartingTime: { type: Number, required: true },
  orderServingTime: { type: Number, required: true },
  orderDeliveryTime:{ type:Number,required:true},
  skillTags: { type: String, required: true },
});
export const EmployeePerformanceModel =mongoose.model('employeePerformace',employeePerformanceSchema)
