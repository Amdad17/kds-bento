import express from 'express';
import { changeOrderStatus, createOrder, findOrdersByRestaurantId } from '../controllers/order.contoller';

const orderrouter = express.Router();

orderrouter.post('/create', createOrder);
orderrouter.put('/status', changeOrderStatus);
// orderrouter.put('/chef/:orderId', addChefToOrder);
orderrouter.get('/restaurant', findOrdersByRestaurantId);

export default orderrouter;