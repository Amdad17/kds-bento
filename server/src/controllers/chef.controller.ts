import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { getActiveChefsFromHR } from "../services/skeleton.service";

export async function getActiveChefs (req: AuthRequest, res: Response) {
  try {
    const { token } = req;
    if (!token) return res.status(401).send({ message: 'Unauthorized.' });

    const response = await getActiveChefsFromHR(token);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function chefCheckIn (req: AuthRequest, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });
    const io = res.locals.io;
    io.to(user.employeeInformation.restaurantId.toString()).emit('chef-check-in', { chef: user });
    res.send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function chefCheckOut (req: AuthRequest, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized.' });
    const io = res.locals.io;
    io.to(user.employeeInformation.restaurantId.toString()).emit('chef-check-out', { chef: user });
    res.send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function postChefEfficiency(req: AuthRequest, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const { chefId, orderId, servedOnTime } = req.body;

    // Emit order served event with Socket IO.
    const io = res.locals.io;
    io.to(user.employeeInformation.restaurantId.toString()).emit('chef-efficiency', { chefId, order: servedOnTime });

    res.status(200).json({ message: 'Order served successfully, and chef efficiency updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in marking the order as served and updating chef efficiency.' });
  }
}

