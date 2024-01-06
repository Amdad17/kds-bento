import { Request,Response } from 'express';
import { order1,IOrder } from '../model/orderModel1';
import { Rule } from '../model/ruleModel1';

export const addOrder = async (orderData: IOrder) => {
    // Create a new Order document and save it to the database
    const order = await order1.create(orderData);
    return order;
  };
  
  export const prioritizeOrders = async () => {
    const rules = await Rule.find();
    const orders = await order1.find();
  
    orders.forEach(order => {
      rules.forEach(rule => {
        if (order.type === rule.type) {
          
          if (rule.type === 'Delivery' && order.deliveryTime && new Date(order.deliveryTime).getTime() - Date.now() < rule.conditionValue * 60000) {
            order.priority += rule.priorityBoost;
          }
          
        }
      });
    });
  
    
    await Promise.all(orders.map(order => order.save()));
  
    return orders.sort((a, b) => b.priority - a.priority);
  };