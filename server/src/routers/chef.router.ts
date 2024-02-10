import { Router } from "express";
import { chefCheckIn, chefCheckOut, getActiveChefs, postChefEfficiency,  } from "../controllers/chef.controller";

const chefRouter = Router();
chefRouter.post('/check-in', chefCheckIn);
chefRouter.post('/check-out', chefCheckOut);
chefRouter.get('/active', getActiveChefs);
chefRouter.post('/efficiency',postChefEfficiency);


export default  chefRouter;