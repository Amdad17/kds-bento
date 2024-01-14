import { Response } from "express";
import { validateChef } from "../utils/validate.helper";
import { AuthRequest } from "../interfaces/authRequest.interface";

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