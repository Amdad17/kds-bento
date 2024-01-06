import { Request, Response } from 'express';
import { RestaurantBaseRule, RuleOverride } from '../model/ruleSetter.model';

export const addRestaurantBaseRule = async (req: Request, res: Response) => {
    try {
        const newRule = req.body;
        const createRestaurantBaseRule = await RestaurantBaseRule.create(newRule)
        res.status(201).json (createRestaurantBaseRule);
    } catch (error:any) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const updateRestaurantBaseRule = async (req: Request, res: Response) => {
    try {
        const updatedRule = await RestaurantBaseRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedRule) return res.status(404).json({ message: 'Rule not found' });
        res.json(updatedRule);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};

export const addRuleOverride = async (req: Request, res: Response) => {
    try {
        const newOverride = req.body;
        const createRuleOverride = await RuleOverride.create( newOverride)
        res.status(202).json(createRuleOverride);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateRuleOverride = async (req: Request, res: Response) => {
    try {
        const updatedOverride = await RuleOverride.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOverride) return res.status(404).json({ message: 'Override not found' });
        res.json(updatedOverride);
    } catch (error:any) {
        res.status(400).json({ message: error.message });
    }
};


