import { Request, Response } from 'express';
import RestaurantModel from '../model/restaurant';

export const getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await RestaurantModel.find();
    res.json(restaurants);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
export const createRestaurant = async (req: Request, res: Response)=>  {
  try {
    const newRestaurant = req.body;
    const createdRestaurant = await RestaurantModel.create(newRestaurant);
    res.json(createdRestaurant);
  } catch (error:any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id);
    if (!restaurant) {
       res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateRestaurantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
       res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(updatedRestaurant);
  } catch (error:any) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};



