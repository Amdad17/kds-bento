import { Response } from 'express';
import { IRules } from '../interfaces/rules.interface';
import { createRules, findRulesForRestaurant, updateExistingRules } from '../model/rules/rules.query';
import { AuthRequest } from '../interfaces/authRequest.interface';
import { IBaseRule } from '../interfaces/baseRule.interface';
import { IOverrideRule } from '../interfaces/overrideRule.interface';
;

export async function setRulesRestaurant(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    console.log("add")
    if (!user) return res.status(401).send({ message: 'Unauthorized' });
   

    const restaurantId = user.employeeInformation.restaurantId;
    const data: { baseRules: IBaseRule[], overrideRules: IOverrideRule[], efficiency: boolean } = req.body;
    const rules = await findRulesForRestaurant(restaurantId)
    if(rules){
      const updatedRules = await updateExistingRules(rules.id, { ...data, restaurantId })
      res.status(200).send({ rules: updatedRules})
    }
    else{
      const newRules = await createRules({ ...data, restaurantId });
      res.status(201).send({ rules: newRules});
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in creating rules for restaurant.' });
  }
}

export async function getRulesForRestaurant(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    if (!user) return res.status(401).send({ message: 'Unauthorized' });

    const restaurantId = user.employeeInformation.restaurantId;
    const rules = await findRulesForRestaurant(restaurantId);
    res.status(200).json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding rules for restaurant.' });
  }
}

