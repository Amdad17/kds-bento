import { Router } from "express";
import { chefCheckIn, chefCheckOut, getActiveChefs } from "../controllers/chef.controller";

const chefRouter = Router();
chefRouter.post('/check-in', chefCheckIn);
chefRouter.post('/check-out', chefCheckOut);
chefRouter.post('/active', getActiveChefs);

export default  chefRouter;