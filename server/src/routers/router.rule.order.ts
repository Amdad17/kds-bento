import express from 'express'
import * as OrderController from '../controllers/ruleController1';

const ruleorderrouter = express.Router();

ruleorderrouter.post('/create', async (req, res) => {
  try {
    const newOrder = await OrderController.addOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

ruleorderrouter.get('/prioritize', async (req, res) => {
  try {
    const prioritizedOrders = await OrderController.prioritizeOrders();
    res.status(200).json(prioritizedOrders);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
});

export default ruleorderrouter;