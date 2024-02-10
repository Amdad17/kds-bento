import { Router } from "express";
import { getRestaurantUtilization, postRestaurantUtilization } from "../controllers/restaurant.utilization.controller";


const restaurantUtilizationRouter = Router()


restaurantUtilizationRouter.post('/restaurant-Utilization',postRestaurantUtilization);
restaurantUtilizationRouter.get('/restaurant-utilization', getRestaurantUtilization);

export default  restaurantUtilizationRouter;