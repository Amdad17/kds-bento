
import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { getAllOrdersByMonthly } from "../services/skeleton.service";



export async function getAllOrdersByMonthlyController(req: AuthRequest,res: Response ) {
    try {
      const token = req.token;
      if (!token) return res.status(401).send({ message: "Unauthorized." });
  
      const orders = await getAllOrdersByMonthly(token);
      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error in finding orders by Hourly." });
    }
  }