import { Request, Response } from 'express';
import { IRules } from '../interfaces/rules.interface';
import { createRules, findRulesForRestaurant, updateExistingRules } from '../model/rules/rules.query';
;

export async function setRulesRestaurant(req: Request, res: Response) {
  try {
    const data: IRules = req.body;
    const restaurantId: string = req.params.restaurantId;
    const rules = await findRulesForRestaurant(restaurantId)
    if(rules){
      const updatedRules = await updateExistingRules(rules.id, data)
      res.status(200).send({ rules: updatedRules})
    }
    else{
      const newRules = await createRules(data);
      res.status(201).send({ rules: newRules});
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in creating rules for restaurant.' });
  }
}

export async function getRulesForRestaurant(req: Request, res: Response) {
  try {
    const restaurantId: string = req.params.restaurantId;
    const rules = await findRulesForRestaurant(restaurantId);
    res.status(200).json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding rules for restaurant.' });
  }
}

