import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { postRestaurantUtilizationToSkeleton } from "../services/skeleton.service";

export async function postRestaurantUtilization(req:AuthRequest,res:Response) {
    try {
        const { user,token} = req;
        if (!user || !token) return res.status(401).send({ message: 'Unauthorized' });
         const { restaurantUtilizationData}=req.body
         await postRestaurantUtilizationToSkeleton(token,restaurantUtilizationData)
         res.status(200).json({ message: 'Order pending, and restaurantUtilization updated.' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error in marking the order as pending and updating restaurantUtilization.' });
        }
    }
    