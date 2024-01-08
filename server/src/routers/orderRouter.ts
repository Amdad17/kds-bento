import express, { Request, Response } from 'express';
import { createOrder, deleteOrderById, findOrderById, findOrdersByOrderType, findOrdersByRestaurantId,
     updateOrderById } from '../controllers/order.contoller';

const orderrouter = express.Router();

orderrouter.post('/create', createOrder);
orderrouter.get('/orders/:orderId', findOrderById);
orderrouter.put('/orders/:orderId', updateOrderById);
orderrouter.delete('/orders/:orderId', deleteOrderById);
orderrouter.get('/orders/restaurant/:restaurantId', findOrdersByRestaurantId);
orderrouter.get('/orders/orderType/:orderType', findOrdersByOrderType);

export default orderrouter;

