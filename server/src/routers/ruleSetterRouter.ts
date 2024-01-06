import express, { Request, Response } from 'express';
import {addRestaurantBaseRule,updateRestaurantBaseRule,addRuleOverride,updateRuleOverride} from '../controllers/ruleSetter.Controller';



const ruleSetterRouter = express.Router()

ruleSetterRouter.post('/restaurantBaseRule',addRestaurantBaseRule);
ruleSetterRouter.put('/restaurantBaseRule',updateRestaurantBaseRule);
ruleSetterRouter.post('/ruleOverride',addRuleOverride);
ruleSetterRouter.put('/ruleOverride',updateRuleOverride);

export default ruleSetterRouter;''