import express from 'express';
import { addChefToOrder, changeOrderStatus, findOrdersByRestaurantId, incomingOrder } from '../controllers/order.contoller';
import { orderServed } from '../controllers/order.served.controller';

const orderrouter = express.Router();

orderrouter.post('/incoming', incomingOrder);
orderrouter.put('/status', changeOrderStatus);
orderrouter.put('/chef/:orderId', addChefToOrder);
orderrouter.get('/restaurant', findOrdersByRestaurantId);
orderrouter.post('/served/:orderId',orderServed);

export default orderrouter;