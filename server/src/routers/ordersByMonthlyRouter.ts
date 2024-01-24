import express  from "express";
import { getAllOrdersByMonthlyController } from "../controllers/ordersByMonthly.controller";



const ordersBYMonthlyRouter=  express.Router();

ordersBYMonthlyRouter.get('/ordersMonthly',getAllOrdersByMonthlyController);

export default  ordersBYMonthlyRouter;