import express  from "express";
import { getAllOrdersByHourlyController } from "../controllers/ordersByHourly.controller";



const ordersBYHourlyRouter=  express.Router();

ordersBYHourlyRouter.get('/ordersHourly',getAllOrdersByHourlyController);

export default ordersBYHourlyRouter;