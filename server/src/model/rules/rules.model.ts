import { model, Schema } from 'mongoose';
import { IRules } from '../../interfaces/rules.interface';

const ruleSchema = new Schema<IRules>({
  restaurantId: {
    type: Number,
    required: true
  },
  efficiency: {
    type: Boolean,
    required: true,
    default: false
  },
  baseRules: {
    type: [{
      ruleType: {
        type: String,
        enum: ['vip', 'delivery', 'in-house'],
        required: true
      },
      priority: {
        type: Number,
        required: true
      }
    }]
  },
  overrideRules: {
    type: [
      {
        title: {
          type: String,
          required: true
        },
        ruleType: {
          type: String,
          enum: ['rider-arrival-time', 'customer-wait-time', 'course-wait-time'],
          required: true
        },
        maxTime: {
          type: Number,
          required: true
        }
      }
    ]
  }
});


const Rules = model('rules', ruleSchema);

export default Rules;