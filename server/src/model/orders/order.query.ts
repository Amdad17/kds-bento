import { Order} from '../../interfaces/order.interface';
import {Orders} from './order.model';

export async function createOrder(data: Order) {
  try {
    const newOrder = await Orders.create(data);
    return newOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Error in creating a new order.');
  }
}


export async function findOrdersByRestaurant(restaurantId:any) {
  try {
    const orders = await Orders.find({ restaurantId });
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('Error in finding orders by restaurantId.');
  }
}


export async function updateOrderById(orderId:any, data:any) {
  try {
    const updatedOrder = await Orders.findOneAndUpdate({ orderId }, { $set: data }, { new: true });
    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Error in updating an order by orderId.');
  }
}


export async function deleteOrderById(orderId:any) {
  try {
    const deletedOrder = await Orders.findOneAndDelete({ orderId });
    return deletedOrder;
  } catch (error) {
    console.error(error);
    throw new Error('Error in deleting an order by orderId.');
  }
}


export async function findOrdersByOrderType(orderType:any) {
  try {
    const orders = await Orders.find({ orderType });
    return orders;
  } catch (error) {
    console.error(error);
    throw new Error('Error in finding orders by orderType.');
  }
}
export default Orders;
