import mongoose, { Schema} from 'mongoose'

export interface IRule  {
  type: string;
  conditionValue: number; 
  priorityBoost: number;
}

const ruleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  conditionValue: { type: Number, required: true },
  priorityBoost: { type: Number, required: true }
});

export const Rule= mongoose.model<IRule>('Rules', ruleSchema);
