import express, { Request, Response } from 'express';
import { createOrder } from '../controllers/order.contoller';

const router = express.Router();

// router.get('/orders', findOrders);
router.post('/create', createOrder);

export default router;

