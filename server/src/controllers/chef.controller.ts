import { Request, Response } from "express";
import { validateChef } from "../utils/validate.helper";

export async function chefCheckIn (req: Request, res: Response) {
  try {
    const restaurantId = req.params.restaurantId;
    const chef = req.body.chef;

    if (!restaurantId || !validateChef(chef)) return res.status(400).send({ message: 'Invalid data.' });
    const io = res.locals.io;
    io.to(restaurantId).emit('chef-check-in', { chef });
    res.send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}


export async function chefCheckOut (req: Request, res: Response) {
  try {
    const restaurantId = req.params.restaurantId;
    const chef = req.body.chef;

    if (!restaurantId || !validateChef(chef)) return res.status(400).send({ message: 'Invalid data.' });
    const io = res.locals.io;
    io.to(restaurantId).emit('chef-check-out', { chef });
    res.send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}