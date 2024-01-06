import { Request, Response } from 'express';
import { Order } from '../model/Order.model';

// Function for fetching all orders
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
    res.status(200)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

// Function for creating an order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body
    const createdOrder = await Order.create(newOrder)
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating order' });
  }
};

