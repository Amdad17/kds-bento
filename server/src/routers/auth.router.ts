import { Request, Response, Router } from "express";
import { getToken } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.get('/token/:code', getToken)
router.get('/test', authMiddleware, (req: Request, res: Response) => {
  res.send('Authenticated!');
})
export default  router;