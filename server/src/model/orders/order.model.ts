import { model, Schema } from 'mongoose';
import { IOrder } from '../../interfaces/order.interface';
const orderItemSchema = new Schema<OrderItemInterface>({
    restaurantId: { type: Number, required: true },
    orderId: { type: Number, required: true },
    categories: [{ type: Object }],
    orderTime: { type: Number, required: true },
    orderType: { type: String, required: true },
    vipCustomer: { type: Boolean, required: true },
    tableId: { type: Number },
    deliveryServiceArriveTime: { type: Number },
    items: [{type: Object }],
    createdAt: { type: Date, required: true },
    preparingTimestamp: { type: Date },
    readyTimestamp: { type: Date },
    servedTimestamp: { type: Date }
  })
  const Orders = model('orders', orderItemSchema );

export default Orders;