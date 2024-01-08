import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/skeleton.service";

export async function authMiddleware (req: Request, res: Response, next: NextFunction) {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) return res.status(401).send({ message: "Unauthorized" });

    const check = await verifyToken(authHeaders);
    if (check.auth) {
      next();
    } else res.status(403).send({ message: 'Forbidden.' });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: 'Unauthorized' });
  }
}