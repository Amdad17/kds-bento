import express  from "express";
import { getAllOrdersByWeeklyController } from "../controllers/ordersByweekly.controller";


const ordersBYWeeklyRouter=  express.Router();

ordersBYWeeklyRouter.get('/ordersWeekly',getAllOrdersByWeeklyController);

export default ordersBYWeeklyRouter;