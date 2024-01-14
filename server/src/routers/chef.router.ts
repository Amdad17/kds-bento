import { Router } from "express";
import { chefCheckIn, chefCheckOut } from "../controllers/chef.controller";

const chefRouter = Router();
chefRouter.post('/check-in', chefCheckIn);
chefRouter.post('/check-out', chefCheckOut);

export default  chefRouter;