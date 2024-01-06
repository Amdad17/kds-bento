import express, { Request, Response } from 'express';
import { getAllOrders, createOrder } from '../controllers/Order.Controller'

const router = express.Router();

router.get('/orders', getAllOrders);
router.post('/create', createOrder);

export default router;

