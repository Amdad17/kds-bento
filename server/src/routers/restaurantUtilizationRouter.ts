import { Router } from "express";
import { postRestaurantUtilization } from "../controllers/restaurant.utilization.controller";


const restaurantUtilizationRouter = Router()


restaurantUtilizationRouter.post('/restaurant-Utilization',postRestaurantUtilization);

export default  restaurantUtilizationRouter;