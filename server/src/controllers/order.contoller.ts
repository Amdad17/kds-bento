import { Request, Response } from 'express';
import Orders from '../model/Order.model';

export async function createOrder(req: Request, res: Response) {
  try {
    const data = req.body;
    const newOrder = await Orders.create(data);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in creating a new order.' });
  }
}

export async function findOrderById(req: Request, res: Response) {
  try {
    const orderId = parseInt(req.params.orderId, 10);
    const order = await Orders.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding an order by ID.' });
  }
}

export async function updateOrderById(req: Request, res: Response) {
  try {
    const orderId = parseInt(req.params.orderId, 10);
    const data = req.body;
    const updatedOrder = await Orders.findOneAndUpdate({ orderId }, { $set: data }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in updating an order record by ID.' });
  }
}

export async function deleteOrderById(req: Request, res: Response) {
  try {
    const orderId = parseInt(req.params.orderId, 10);
    const deletedOrder = await Orders.findOneAndDelete({ orderId });

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json(deletedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in deleting an order record by ID.' });
  }
}

export async function findOrdersByRestaurantId(req: Request, res: Response) {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const orders = await Orders.find({ restaurantId });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding orders by restaurantId.' });
  }
}

export async function findOrdersByOrderType(req: Request, res: Response) {
  try {
    const orderType = req.params.orderType;
    const orders = await Orders.find({ orderType });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding orders by orderType.' });
  }
}
