import mongoose, { Schema } from 'mongoose';

export interface IOrder {
  type: string;
  priority: number;
  deliveryTime: Date;
  inHouseWaitTime: number;
  courseGapTime: number;
  
}

const orderSchema = new mongoose.Schema({
  type: { type: String, required: true },
  priority: { type: Number, required: true, default: 0 },
  deliveryTime: { type: Date },
  inHouseWaitTime: { type: Number },
  courseGapTime: { type: Number },
});

export const order1= mongoose.model<IOrder>('Ordersthree', orderSchema);
