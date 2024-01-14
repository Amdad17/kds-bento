import express from 'express';
import { addChefToOrder, changeOrderStatus, createOrder, deleteOrderById, findOrderById, findOrdersByOrderType, findOrdersByRestaurantId,
     updateOrderById } from '../controllers/order.contoller';
import { authMiddleware } from '../middleware/auth.middleware';

const orderrouter = express.Router();

orderrouter.post('/create', createOrder);
orderrouter.get('/id/:orderId', findOrderById);
orderrouter.put('/id/:orderId', updateOrderById);
orderrouter.put('/status', changeOrderStatus);
orderrouter.put('/chef/:orderId', addChefToOrder);
orderrouter.delete('/id/:orderId', deleteOrderById);
orderrouter.get('/restaurant', findOrdersByRestaurantId);
orderrouter.get('/type/:orderType', findOrdersByOrderType);

export default orderrouter;