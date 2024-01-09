import { Router } from "express";
import { getToken, getUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
router.get('/token/:code', getToken);
router.get('/user', authMiddleware, getUser);
export default  router;