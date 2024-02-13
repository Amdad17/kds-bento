import { NextFunction, Response } from "express";
import { getUserFromToken } from "../services/skeleton.service";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function authMiddleware (req: AuthRequest, res: Response, next: NextFunction) {
  // console.log('auth headers=========');
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) return res.status(401).send({ message: "Unauthorized" });

    const check = await getUserFromToken(authHeaders);
    console.log(" token infos from middleware ------------- 🥳🥳🥳🥳🥳🥳🥳🥳    ", check);
    if (check) {
      req.user = check.user,
      req.token = authHeaders;
      next();
    } else res.status(403).send({ message: 'Forbidden.' });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'Unauthorized' });
  }
}