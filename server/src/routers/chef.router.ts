import { Router } from "express";
import { chefCheckIn, chefCheckOut } from "../controllers/chef.controller";

const chefRouter = Router();
chefRouter.post('/check-in/:restaurantId', chefCheckIn);
chefRouter.post('/check-out/:restaurantId', chefCheckOut);

export default  chefRouter;