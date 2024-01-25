import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function orderServed(req: AuthRequest, res: Response) {
    try {
      const { user } = req;
      if (!user) return res.status(401).send({ message: 'Unauthorized' });
      const orderId = req.params.orderId; 
      const orderServed=req.body
  
      // Emit order served event with Socket IO.
      const io = res.locals.io;
      io.to(user.employeeInformation.restaurantId.toString()).emit('order-served', { orderId, ...orderServed });
  
      res.status(200).json({ message: 'Order served successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error in marking the order as served." });
    }
  }
