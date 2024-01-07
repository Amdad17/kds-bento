import { EmployeePerformance } from '../../interfaces/employeePerformance.interface';
import { model, Schema } from 'mongoose';
const employeePerformanceSchema = new Schema<EmployeePerformance>({
  employeeId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password:{type: Number, required: true},
  role: { type: String, required: true },
  orderPreparationStandardTime: { type: Number, required: true },
  orderStartingTime: { type: Number, required: true },
  orderServingTime: { type: Number, required: true },
  orderDeliveryTime:{ type:Number,required:true},
  skillTags: { type: String, required: true },
});
export const EmployeePerformanceModel =model('employeePerformace',employeePerformanceSchema)
