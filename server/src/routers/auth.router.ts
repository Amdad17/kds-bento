import { Router } from "express";
import { getToken } from "../controllers/auth.controller";

const router = Router();
router.get('/token',getToken)
export default  router;