import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IRules } from '../interfaces/rules.interface';
import {Rules} from '../model/rules/rules.model';

export async function createRules(req: Request, res: Response) {
  try {
    const data: IRules = req.body;
    const newRules = await Rules.createRules(data);
    res.status(201).json(newRules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in creating rules for restaurant.' });
  }
}

export async function findRulesForRestaurant(req: Request, res: Response) {
  try {
    const restaurantId: string = req.params.restaurantId;
    const rules = await Rules.findRulesForRestaurant(restaurantId);
    res.status(200).json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in finding rules for restaurant.' });
  }
}

export async function updateExistingRules(req: Request, res: Response) {
  try {
    const ruleId: string = req.params.ruleId;
    const data: IRules = req.body;
    const updatedRules = await Rules.updateExistingRules(ruleId, data);
    res.status(200).json(updatedRules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in updating existing rules for restaurant.' });
  }
}

export async function deleteRulesForRestaurant(req: Request, res: Response) {
  try {
    const restaurantId: string = req.params.restaurantId;
    const deletedRules = await Rules.deleteRulesForRestaurant(restaurantId);
    res.status(200).json(deletedRules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in deleting rules for restaurant.' });
  }
}

export async function deleteRulesById(req: Request, res: Response) {
  try {
    const ruleId: string = req.params.ruleId;
    const deletedRules = await Rules.deleteRulesById(ruleId);
    res.status(200).json(deletedRules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in deleting rules for restaurant.' });
  }
}
