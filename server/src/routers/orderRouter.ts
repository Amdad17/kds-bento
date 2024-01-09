import express from 'express';
import { createOrder, deleteOrderById, findOrderById, findOrdersByOrderType, findOrdersByRestaurantId,
     updateOrderById } from '../controllers/order.contoller';
import { authMiddleware } from '../middleware/auth.middleware';

const orderrouter = express.Router();

orderrouter.post('/create', createOrder);
orderrouter.get('/id/:orderId', authMiddleware, findOrderById);
orderrouter.put('/id/:orderId', authMiddleware, updateOrderById);
orderrouter.delete('/id/:orderId', authMiddleware, deleteOrderById);
orderrouter.get('/restaurant', authMiddleware, findOrdersByRestaurantId);
orderrouter.get('/type/:orderType', authMiddleware, findOrdersByOrderType);

export default orderrouter;

